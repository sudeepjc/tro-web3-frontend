import React from "react";
import PropTypes from "prop-types";
import { dataService } from "../../services/DataService";
import bscImg from '../../assets/images/bsc-icon-logo-1-1@2x.png';
import { useSelector, useDispatch } from 'react-redux';
import { ResetErrorModal } from "../../redux/actions/errorModalActions";

const ErrorModal = (props) => {
    const state1 = useSelector(state1 => state1.errorModalReducers);
    console.log(state1, 'state redux1')
    const dispatch = useDispatch()

    const onClose = () => {
        dispatch(ResetErrorModal())
    };


    // render() {
    console.log(props, 'Prop')
    dataService.setModalData(true)
    if (!state1.showErrorModal) {
        return null;
    }
    return (
        <div className="modal2" id="modal">
            {/* <div className="modal-top">
                    <div className="toggle-button" onClick={this.onClose}>
                        x
                    </div>
                </div> */}

            <div className="content">

                {/* {this.props.children} */}
                {state1.errorType == 'connect wallet' ?
                    <div>
                        <div className="mg-t-107 ">

                            <i class="fas fa-wallet wallet-fa "></i>
                        </div>
                        <div className="mt-30 f-20">
                            Wallet not connected. Please connect your wallet.

                            </div>
                        <div className="mt-50">
                            <button class="bscScan-btn" onClick={() => { onClose() }}>
                                Okay
                    </button>
                        </div>
                    </div>


                    : state1.errorType == 'switch metamask' ? <div>
                        <div className="align-c">
                            <div className="mg-t-107 ">

                                <img src={bscImg} className="bsc-img" alt='bsc-img'>
                                </img>
                            </div>
                            <div className="mt-30 f-20 ">
                                Please switch metamask to Binance Smart Chain (BSC)

                            </div>
                            <div className="mt-50">
                                <button class="bscScan-btn"
                                    onClick={() => { onClose() }}>
                                    Okay
                    </button>
                            </div>
                        </div>

                    </div> : state1.errorType == 'other errror' ?
                        <div className="align-c">
                            <div className="mg-t-107 ">
                                <i class="fas fa-exclamation-circle exc-fa"></i>
                                {/* <i class="fas fa-wallet wallet-fa "></i> */}
                            </div>
                            <div className="mt-30 f-20">
                                {state1.errorMessage}

                            </div>
                            <div className="mt-50">
                                <button class="bscScan-btn" onClick={() => { onClose() }}>
                                    Okay
               </button>
                            </div>
                        </div>

                        : null

                }


            </div>
            <div className="actions">
            </div>
        </div>
    );
    // }
}

ErrorModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};
export default ErrorModal