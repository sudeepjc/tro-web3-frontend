import React from "react";
// import PropTypes from "prop-types";
import { dataService } from "../../services/DataService";
import bscImg from '../../assets/images/bsc-icon-logo-1-1@2x.png';
import { useSelector, useDispatch } from 'react-redux';
import { ResetErrorModal } from "../../redux/actions/errorModalActions";
import { MAINNET_PARAMS } from '../../utils/web3/networkParams';

const ErrorModal = (props) => {
    const state1 = useSelector(state1 => state1.errorModalReducers);
    console.log(state1, 'state redux1')
    const dispatch = useDispatch()

    const onClose = () => {
        dispatch(ResetErrorModal())
    };

    const tryConnectWallet = async () => {
        try {
                await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const switchToBSC = async() => {

        await tryConnectWallet();
        
        const { ethereum } = window
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{chainId: MAINNET_PARAMS.chainId}],
            });
            onClose();
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [MAINNET_PARAMS],
                    });
                } catch (addError) {
                    console.log(addError);
                    throw addError;
                }
            } else {
                console.log(switchError);
                throw switchError;
            }
        }
    }

    console.log(props, 'Prop')
    dataService.setModalData(true)
    if (!state1.showErrorModal) {
        return null;
    }
    return (
        <div className="modal2" id="modal">
            <div className="content">
                { state1.errorType == 'connect wallet' ?
                    <div>
                        <div className="mg-t-107 ">
                            <i className="fas fa-wallet wallet-fa "></i>
                        </div>
                        <div className="mt-30 f-20">
                            Wallet not connected. Please connect your wallet.
                        </div>
                        <div className="mt-50">
                            <button className="bscScan-btn" onClick={() => { onClose() }}>
                                Okay
                            </button>
                        </div>
                    </div>
                    : state1.errorType == 'switch' ? <div>
                        <div className="align-c">
                            <div className="mg-t-107 ">
                                <img src={bscImg} className="bsc-img" alt='bsc-img'>
                                </img>
                            </div>
                            <div className="mt-30 f-20 ">
                                Please switch to Binance Smart Chain (BSC)
                            </div>
                            <div className="mt-50">
                                <button className="bscScan-btn"
                                    onClick={() => { switchToBSC() }}>
                                    Switch to BSC
                                </button>
                            </div>
                        </div>
                    </div> : state1.errorType == 'other error' ?
                        <div className="align-c">
                            <div className="mg-t-107 ">
                                <i className="fas fa-exclamation-circle exc-fa"></i>
                            </div>
                            <div className="mt-30 f-20">
                                {state1.errorMessage}
                            </div>
                            <div className="mt-50">
                                <button className="bscScan-btn" onClick={() => { onClose() }}>
                                    Okay
                                </button>
                            </div>
                        </div>
                        : null
                }
            </div>
            <div className="actions"></div>
        </div>
    );
}

// ErrorModal.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     show: PropTypes.bool.isRequired
// };
export default ErrorModal