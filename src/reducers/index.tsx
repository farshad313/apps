import { combineReducers } from 'redux'
import homeReducer, { HomeList } from './homeReducer'
import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux'

export type AppState = {
    home: HomeList
}

const rootReducer = combineReducers<AppState>({
    home: homeReducer
})
export const useSelector:
    TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useReduxSelector
export default rootReducer