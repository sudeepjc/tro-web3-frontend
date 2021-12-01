import { modalActions } from "../constants/action.types";

const initialState = {
    showTrxSubmitModal: false,
    txHash: null,
};

function transactionSubmitReducers(state = initialState, action) {
    switch (action.type) {
        case modalActions.SET_DATA:
            return {
                ...state,
                showTrxSubmitModal: action.showTrxSubmitModal,
                txHash: action.txHash,
            };

        case modalActions.RESET_DATA:
            return { ...initialState };

        default:
            return state;
    }
}

export default transactionSubmitReducers;
