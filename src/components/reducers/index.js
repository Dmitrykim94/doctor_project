import * as actionTypes from '../actions/types'

import {combineReducers} from 'redux'

const initialCasesState = {
    cases:[], 
    doctors: [],
    // loading to add
}

const casesReducer = (state = initialCasesState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_CASES:
            return {
                ...state,
                cases: [...state.cases, ...action.payload.cases]
        }
        case actionTypes.ALL_DOCTORS:
            return {
                ...state,
                doctors: [...state.doctors, action.payload.doctors]
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
            ...state,
            currentUser:action.payload.currentUser
        }
        case actionTypes.TRUE_USER:
            return{
                ...state,
                trueUser: action.payload.trueUser
            }

        case actionTypes.CLEAR_USER:
            return {
                ...state,
                currentUser: null
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