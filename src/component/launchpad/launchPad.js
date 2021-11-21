import React, { Component } from 'react';
import trodlLogo from "../../assets/images/trodl_logo_2.png";
import icon1 from '../../assets/images/icon_1.png';
import icon2 from '../../assets/images/icon_2.png';
import icon3 from '../../assets/images/icon_3.png';
import IDOComponent from '../ido/idoComponent';
import MetaMaskWallet from '../wallet/metamask';
import config from 'react-global-configuration';
import getWeb3 from '../../utils/web3/getWeb3';
import { getTokenContract, getStakeContract, getIdoContract, getPaymentTokenContract } from '../../utils/web3/getContracts';
import Staking from '../staking/Staking';
import ErrorModal from '../modals/errorModal';
import { Store } from '../../redux/store';
import TransactionSubmitModal from '../modals/transactionSubmitModal';
import TransactionModal from '../modals/transactionModal';

export class LaunchPad extends Component {

    constructor(props) {
        super(props);
        console.log(props, 'props st')

        this.state = {
            currentTab: 'staking',
            chainId: '',
            accounts: [],
            web3: undefined,
            trodlToken: undefined,
            trodlStake: undefined,
            trodlIdo: undefined,
            paymentToken: undefined,
            show: false,
            error: null,
            chainRender: false,
            type: null,
            storeData: null,
        }
    }

    showErrorModal = () => {
        this.setState({ show: !this.state.show });
    };

    selectTab = (tab) => {
        this.setState({ currentTab: tab });
    }

    onConnect = async (chainId) => {
        try {
            console.log(`Connected to chain : ${config.get('link')}`);
            const web3 = await getWeb3();
            const tokenContract = await getTokenContract(web3);
            const stakeContract = await getStakeContract(web3);
            const idoContract = await getIdoContract(web3);
            const paymentTokenContract = await getPaymentTokenContract(web3);
            this.setState({ chainId: chainId, web3: web3, trodlToken: tokenContract, trodlStake: stakeContract, trodlIdo: idoContract, paymentToken: paymentTokenContract });
            console.log("On Connection:");
            console.log(web3);
            console.log(tokenContract);
            console.log(stakeContract);
            console.log(idoContract);
            console.log(paymentTokenContract);
            console.log(chainId);
        } catch (err) {
            console.log(`Connection failed. ${err.message}`);
            this.setState({ error: err });
            this.setState({ type: 'other error' })
            this.showErrorModal(err.message);
        }
    }

    onTransaction = () => {
        this.setState({ chainRender: true });
    }

    onAccountChange = (newAccounts) => {
        this.setState({ accounts: newAccounts });
    }
    
    render() {
        const state = Store.getState();
        console.log(state, 'statecalles');

        const header = () => {
            return (
                <div className="bg-lp">
                    <div className="row mlr64 ">
                        <div className="mt-10">
                            <div className="flex-d left">
                                <img src={trodlLogo} className="logo-img" alt='trodl-logo'></img>

                                <div className="flex-right mt-10">
                                    <a href="https://trodl.com" target="_blank" rel="noreferrer" className="deco-none"> <div className="btn-tro-2"
                                    >visit trodl.com</div></a>
                                </div>
                                <MetaMaskWallet onConnection={this.onConnect} onAccountChange={this.onAccountChange} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div className="launpad-route fle">
                    <div className="mtb-auto">
                        <div className="menu-icon cursor-p" style={{ backgroundColor: this.state.currentTab == 'staking' ? '#06111E' : '' }} onClick={() => {
                            this.selectTab('staking'); }}>
                            <img src={icon1} className="icon-lp" alt='trodl-logo'></img>
                        </div>
                        <div className="menu-icon cursor-p" style={{ backgroundColor: this.state.currentTab == 'ido' ? '#06111E' : '' }} onClick={() => {
                            this.selectTab('ido') }}> 
                            <img src={icon2} className="icon-lp" alt='trodl-logo'></img>
                        </div>
                        <div className="menu-icon cursor-p">  <img src={icon3} className="icon-lp" alt='trodl-logo'></img></div>
                    </div>
                </div>
                <div>
                    {header()}
                    <div className={this.state.currentTab == 'staking' ? 'lp-mrgs-stage p-100' : "lp-mgrs p-100"}>
                        <ErrorModal ></ErrorModal>
                        <TransactionSubmitModal></TransactionSubmitModal>
                        <TransactionModal></TransactionModal>
                        {this.state.currentTab == 'staking' ? <Staking trodlStake={this.state.trodlStake} accounts={this.state.accounts} web3={this.state.web3} trodlToken={this.state.trodlToken} onTransaction={this.onTransaction} type={this.state.type} error={this.state.error ? this.state.error : ''} show={this.state.show} ></Staking> : null}
                        {this.state.currentTab == 'ido' ? <IDOComponent paymentToken={this.state.paymentToken} trodlIdo={this.state.trodlIdo} accounts={this.state.accounts} web3={this.state.web3} type={this.state.type} error={this.state.error ? this.state.error : ''} show={this.state.show} ></IDOComponent> : null}
                    </div>
                </div>
            </div>
        )
    }
}