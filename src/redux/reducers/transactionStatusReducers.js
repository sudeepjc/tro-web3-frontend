import { modalActions } from "../constants/action.types";

const initialState = {
    txStatusShow: false,
    txStatus: null,
    txMessage: null,
    txHash: null
};

function transactionStatusReducers(state = initialState, action) {
    switch (action.type) {
        case modalActions.SET_DATA:
            return {
                ...state,
                txStatusShow: action.txStatusShow,
                txStatus: action.txStatus,
                txMessage: action.txMessage,
                txHash: action.txHash
            };

        case modalActions.RESET_DATA:
            return { ...initialState };

        default:
            return state;
    }
}

export default transactionStatusReducers;
