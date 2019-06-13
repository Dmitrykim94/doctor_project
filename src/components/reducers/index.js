import * as actionTypes from '../actions/types'

import {combineReducers} from 'redux'

const initialCasesState = {
    cases:[], 
    // loading to add
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

const combinedReducer = combineReducers({
    cases: casesReducer
})

export default combinedReducer