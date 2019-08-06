import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case SIGN_IN:
            //Spread syntax, creates a new object and copies everything that the state has
            //only updating isSignedIn to true
            return { ...state, isSignedIn: true };
        case SIGN_OUT:
            return { ...state, isSignedIn: false };
        default:
            return state;
    }
};