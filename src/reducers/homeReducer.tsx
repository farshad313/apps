export const homeActionTypes = {
    FETCH_HOME_LIST_REQUEST: 'FETCH_HOME_LIST-REQUEST'
}

export type HomeList = {
    content?: string,
}

export interface HomeErrorAction {
    type: string,
    payload: {
        message: string
    }
}
export interface HomeSuccessAction<T> {
    type: string,
    payload: T
}

export type PostAction = PostSuccessAction<HomeList>

const LEN = 1000;
const arr = [];
for (let i=0; i < LEN; i++) {
  arr.push({
    content:i 
  });
}

const defaultState: HomeList = arr
const reducer = (state: HomeList = defaultState, action: HomeAction): HomeList => {
    switch (action.type) {
        case homeActionTypes.FETCH_HOME_LIST_REQUEST:
            state = [...defaultState]
            return state;
        default:
            return state;
    }
}
export default reducer;