import { modalActions } from '../constants/action.types';



export const setErrorModal =
    (showErrorModal, errorType, errorMessage) => dispatch => {
        dispatch({
            type: modalActions.SET_DATA,
            showErrorModal: showErrorModal,
            errorType: errorType,
            errorMessage: errorMessage

        });
    };

export const ResetErrorModal = () => dispatch => {
    dispatch({
        type: modalActions.RESET_DATA,
    });
};