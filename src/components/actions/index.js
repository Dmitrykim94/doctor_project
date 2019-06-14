import * as actionTypes from './types'

export const createCases = (cases) => {
    return {
        type:actionTypes.CREATE_CASES,
        payload: {
            cases:cases
        }
    }
}

export const setUser = user => {
    return {
        type:actionTypes.SET_USER,
        payload: {
            currentUser:user
        }
    }
}

export const clearUser = () => {
    return {
        type:actionTypes.CLEAR_USER
    }
}