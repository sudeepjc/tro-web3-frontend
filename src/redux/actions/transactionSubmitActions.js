import { modalActions } from '../constants/action.types';



export const setTxSubmitModal =
    (showTrxSubmitModal, txHash) => dispatch => {
        dispatch({
            type: modalActions.SET_DATA,
            showTrxSubmitModal: showTrxSubmitModal,
            txHash: txHash,

        });
    };

export const ResetTxSubmitModal = () => dispatch => {
    dispatch({
        type: modalActions.RESET_DATA,
    });
};