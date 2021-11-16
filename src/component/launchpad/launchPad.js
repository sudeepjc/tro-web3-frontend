
import React, { Component } from 'react';
import trodlLogo from "../../assets/images/trodl_logo_2.png";
import icon1 from '../../assets/images/icon_1.png';
import icon2 from '../../assets/images/icon_2.png';
import icon3 from '../../assets/images/icon_3.png';
import IDOComponent from '../ido/idoComponent';
import MetaMaskWallet from '../wallet/metamask';
import config from 'react-global-configuration';
import getWeb3 from '../../utils/web3/getWeb3';
import { getTokenContract, getStakeContract } from '../../utils/web3/getContracts';
import Staking from '../staking/Staking';

export class LaunchPad extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTab: 'staking',
            chainId: '',
            accounts: [],
            web3: undefined,
            trodlToken: undefined,
            trodlStake: undefined,
            show: false,
            error: null,
            chainRender: false,
            type: null
        }

    }
    showErrorModal = () => {
        this.setState({
            show: !this.state.show
        });
    };
    onConnect = async (chainId) => {
        try {
            console.log(`Connected to chain : ${config.get('link')}`);
            const web3 = await getWeb3();
            const tokenContract = await getTokenContract(web3, chainId);
            const stakeContract = await getStakeContract(web3, chainId);
            this.setState({ chainId: chainId, web3: web3, trodlToken: tokenContract, trodlStake: stakeContract });
            console.log("On Connection:");
            console.log(web3);
            console.log(tokenContract);
            console.log(stakeContract);
            console.log(chainId);
        } catch (err) {
            console.log(`Connection failed. ${err.message}`);
            this.setState({ error: err });
            this.setState({ type: 'other errror' })
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
        const scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop);

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
                                {/* <button className="meta-btn mr-17  mt-10" ><i className="fas fa-wallet mr-17" ></i>connect metamask</button> */}

                            </div>


                        </div>

                    </div>


                </div>
            )
        }

        return (
            <div>
                <div class="launpad-route fle">
                    <div className="mtb-auto">
                        <div className="menu-icon" onClick={() => {
                            this.setState({
                                currentTab: 'staking'
                            });
                        }}>  <img src={icon1} className="icon-lp" alt='trodl-logo'></img></div>
                        <div className="menu-icon" onClick={() => {
                            this.setState({
                                currentTab: 'ido'
                            })
                        }}> <img src={icon2} className="icon-lp" alt='trodl-logo'></img></div>
                        <div className="menu-icon">  <img src={icon3} className="icon-lp" alt='trodl-logo'></img></div>
                    </div>



                </div>
                <div>
                    {header()}
                    <div className={this.state.currentTab == 'staking' ? 'lp-mrgs-stage' : "lp-mgrs"}>

                        {this.state.currentTab == 'staking' ? <Staking trodlStake={this.state.trodlStake} accounts={this.state.accounts} web3={this.state.web3} trodlToken={this.state.trodlToken} onTransaction={this.onTransaction} type={this.state.type} error={this.state.error ? this.state.error : ''} showErrorModal={this.showErrorModal} show={this.state.show} type={this.state.type}></Staking> : null}
                        {this.state.currentTab == 'ido' ? <IDOComponent></IDOComponent> : null}

                    </div>
                </div>
            </div>
        )

    }

}