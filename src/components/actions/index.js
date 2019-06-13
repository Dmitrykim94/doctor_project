import * as actionTypes from './types'

export const createCases = (cases) => {
    return {
        type:actionTypes.CREATE_CASES,
        payload: {
            cases:cases
        }
    }
}