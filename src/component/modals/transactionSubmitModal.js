import React from "react";
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

    console.log(props, 'props')
    dataService.setModalData(true)
    if (!state.showTrxSubmitModal) {
        return null;
    }
    return (
        <div className="modal2" id="modal">
            <div className="content">
                <div className="toggle-button" onClick={() => { onClose() }}>
                    <i className="far fa-times-circle"></i>
                </div>
                <div className="mg-t-107">
                    <i className="fas fa-hourglass-half glasshr"></i>
                </div>
                <div className="mt-40">
                    Transaction submitted.
                </div>
                { state.txHash ?
                    <div className="mt-40">
                        <a rel="noreferrer" href={`${config.get('link')}/tx/${state.txHash}`} target="_blank" >
                            <button className="bscScan-btn">
                                View on bscscan.com <i className="fas fa-external-link-alt  m-link"></i>
                            </button>
                        </a>
                    </div> : null
                }
                <div className="actions"> </div>
            </div>
        </div>
    );
}

export default TransactionSubmitModal