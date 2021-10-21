import React from "react";
import PropTypes from "prop-types";
import { dataService } from "../../services/DataService";
import MetaMaskWallet from "../wallet/metamask";
import bscImg from '../../assets/images/bsc-icon-logo-1-1@2x.png';

export default class ErrorModal extends React.Component {


    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };


    render() {
        console.log(this.props, 'Prop')
        dataService.setModalData(true)
        if (!this.props.show) {
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
                    {this.props.type == 'connect wallet' ?
                        <div>
                            <div className="mg-t-107 ">

                                <i class="fas fa-wallet wallet-fa "></i>
                            </div>
                            <div className="mt-30 f-20">
                                Wallet not connected. Please connect your wallet.

                            </div>
                            <div className="mt-50">
                                <button class="bscScan-btn" onClick={this.onClose}>
                                    Okay
                    </button>
                            </div>
                        </div>


                        : this.props.type == 'switch metamask' ? <div>
                            <div className="align-c">
                                <div className="mg-t-107 ">

                                    <img src={bscImg} className="bsc-img" alt='bsc-img'>
                                    </img>
                                </div>
                                <div className="mt-30 f-20 ">
                                    Please switch metamask to Binance Smart Chain (BSC)

                            </div>
                                <div className="mt-50">
                                    <button class="bscScan-btn" onClick={this.onClose}>
                                        Okay
                    </button>
                                </div>
                            </div>

                        </div> : this.props.type == 'other errror' ?
                            <div className="align-c">
                                <div className="mg-t-107 ">
                                    <i class="fas fa-exclamation-circle exc-fa"></i>
                                    {/* <i class="fas fa-wallet wallet-fa "></i> */}
                                </div>
                                <div className="mt-30 f-20">
                                    {this.props.children}

                                </div>
                                <div className="mt-50">
                                    <button class="bscScan-btn" onClick={this.onClose}>
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
    }
}

ErrorModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};