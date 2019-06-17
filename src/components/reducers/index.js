import * as actionTypes from '../actions/types'

import {combineReducers} from 'redux'

const initialCasesState = {
    cases:[], 
}

const casesReducer = (state = initialCasesState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_CASES:
        return {
            cases: [...state.cases, ...action.payload.cases]
        }
        default:
            return state
    }
}

const initialUserState = {
    currentUser:null,
}

const userReducer = (state=initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
        return {
            currentUser:action.payload.currentUser
        }
        default:
            return state
    }
}

const combinedReducer = combineReducers({
    cases: casesReducer,
    user: userReducer
})

export default combinedReducer