
import { configureStore } from '@reduxjs/toolkit'
// import authReducer from '@/lib/redux/features/auth/authSlice'
import { persistStore, persistReducer } from 'redux-persist'
import taskReducer from './features/tasks/taskSlice'
import storage from 'redux-persist/lib/storage' // defaults to localStorage
import { combineReducers } from 'redux'


const rootReducer = combineReducers({
    // auth: authReducer,
    tasks: taskReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    // whitelist: ['auth', 'task'], // Only persist the auth slice
    whitelist: ['tasks'], // Only persist the auth slice
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store)


// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch