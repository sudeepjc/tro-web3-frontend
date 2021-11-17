import { modalActions } from "../constants/action.types";

const initialState = {
    showErrorModal: false,
    errorType: null,
    errorMessage: null
};

function errorModalReducers(state = initialState, action) {
    switch (action.type) {
        case modalActions.SET_DATA:
            return {
                ...state,
                showErrorModal: action.showErrorModal,
                errorType: action.errorType,
                errorMessage: action.errorMessage
            };

        case modalActions.RESET_DATA:
            return { ...initialState };

        default:
            return state;
    }
}

export default errorModalReducers;
