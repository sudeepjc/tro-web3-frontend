import React from "react";
import PropTypes from "prop-types";
import { dataService } from "../../services/DataService";
import { useSelector, useDispatch } from 'react-redux';
import config from 'react-global-configuration';
import { ResetTxSubmitModal } from "../../redux/actions/transactionSubmitActions";

const TransactionSubmitModal = (props) => {
    const dispatch = useDispatch()


    const state = useSelector(state => state.transactionSubmitReducers);
    console.log(state, 'txnsubmit state')
    const onClose = () => {
        dispatch(ResetTxSubmitModal())
    };

    // render() {
    console.log(props, 'props')
    dataService.setModalData(true)
    if (!state.showTrxSubmitModal) {
        return null;
    }
    return (
        <div className="modal2" id="modal">
            {/* <div className="modal-top"> */}
            <div className="content">
                <div className="toggle-button"
                    onClick={() => { onClose() }}
                >
                    <i class="far fa-times-circle"></i>

                </div>
                <div class="mg-t-107">
                    <i class="fas fa-hourglass-half glasshr"></i>

                </div>
                <div class="mt-40">
                    Transaction submitted.
                </div>
                {/* </div> */}
                {state.txHash ?
                    <div className="mt-40">

                        <a rel="noreferrer" href={`${config.get('link')}/tx/${state.txHash}`} target="_blank" >
                            <button class="bscScan-btn">
                                View on bscscan.com <i class="fas fa-external-link-alt  m-link"></i>
                            </button>
                        </a>
                        {/* <a rel="noreferrer" href={`https://testnet.bscscan.com/tx/${state.txHash}`} target="_blank" >View Transaction on BSC</a> */}
                    </div> : null}
                <div className="actions">
                </div>
            </div>
        </div>
    );
    // }
}

TransactionSubmitModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};
export default TransactionSubmitModal