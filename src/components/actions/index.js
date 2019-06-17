import * as actionTypes from './types'

export const createCases = (cases) => {
    return {
        type:actionTypes.CREATE_CASES,
        payload: {
            cases:cases
        }
    }
}

export const allDoctors = (doctors) => {
    return {
        type:actionTypes.ALL_DOCTORS,
        payload:{
            doctors:doctors
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

export const trueUser = (user) => {
    return {
        type:actionTypes.TRUE_USER,
        payload: {
            trueUser:user
        }
    }
}