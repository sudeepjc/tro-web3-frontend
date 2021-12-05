import React from "react";
import { dataService } from "../../services/DataService";
import config from 'react-global-configuration';
import { useSelector } from 'react-redux';

const TransactionModal = () => {
    const state = useSelector(state => state.transactionStatusReducers);
    console.log(state, 'new status')
    
    dataService.setModalData(true)
    if (!state.txStatusShow) {
        return null;
    }
    return (
        <div className="modal3" id="modal">
            <div className="container1" >
                <div className={state.txStatus === "Success" ? 'col-green one' : state.txStatus === "Failure" ? 'col-red one' : ''}>
                </div>
                <div className="row ">
                    <div className="col-1">
                        {state.txStatus === "Success" ?
                            <i className="fas fa-check-circle success-fa"></i> : state.txStatus === "Failure" ? <i className="fas fa-times-circle fail-fa"></i> : null}
                    </div>
                    <div className=" col-auto txt-left word-break mrgs-tr">
                        <div>
                            <div className="stake-status">
                                <div> {state.txMessage} </div>
                                <a rel="noreferrer" href={`${config.get('link')}/tx/${state.txHash}`} target="_blank" ><i className="fas fa-external-link-alt  m-link"></i> </a>
                            </div>
                        </div >
                    </div>
                </div>
            </div>
            <div className="actions"> </div>
        </div>
    );
}

export default TransactionModal