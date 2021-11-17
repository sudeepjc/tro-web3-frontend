import { modalActions } from '../constants/action.types';



export const setTxStatusModal =
    (txStatusShow, txStatus, txMessage, txHash) => dispatch => {
        dispatch({
            type: modalActions.SET_DATA,
            txStatusShow: txStatusShow,
            txStatus: txStatus,
            txMessage: txMessage,
            txHash: txHash,

        });
    };

export const ResetTxStatustModal = () => dispatch => {
    dispatch({
        type: modalActions.RESET_DATA,
    });
};