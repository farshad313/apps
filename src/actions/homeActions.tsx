import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {  homeActionTypes, HomeList, HomeSuccessAction } from '../reducers/homeReducer';
import { store } from "../store";

export const FetchPostListSuccess = (payload: HomeList): HomeSuccessAction<HomeList> => {
    var temp=[{content: 'Hello'}]
    return {
        type: homeActionTypes.FETCH_HOME_LIST_REQUEST,
        payload: temp
    }
}
