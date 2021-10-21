import React, { Component } from 'react';
import config from 'react-global-configuration';
import MetaMaskWallet from '../wallet/metamask';
import getWeb3 from '../../utils/web3/getWeb3';
import { getTokenContract, getStakeContract } from '../../utils/web3/getContracts';
import TotalStakedTROCard from '../global/TotalStakedTROCard';
import TotalMintedxTROCard from '../global/TotalMintedxTROCard';
import TROPriceCard from '../global/TROPriceCard';
import TROBalanceCard from '../user/TROBalanceCard';
import XTRORewardCard from '../user/XTRORewardCard';
import TROWithdrawCard from '../user/TROWithdrawCard';
import ErrorModal from '../modals/errorModal';

import trodlLogo from "../../assets/images/trodl_logo_2.png";
import rightImg from '../../assets/images/Group 2@2x.png';

export class Staking extends Component {


    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        this.state = {
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

    showErrorModal = e => {
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

    onAccountChange = (newAccounts) => {
        this.setState({ accounts: newAccounts });
    }

    onTransaction = () => {
        this.setState({ chainRender: true });
    }

    render() {
        if (window.innerWidth < 1000) {
            console.log(window.innerWidth);
            window.location.href = "https://trodl.com/";
        }
        const scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop);

        const heroSection = () => {
            return (
                <div>
                    <div className="row">
                        <div className="col-6 left">
                            <img src={trodlLogo} className="logo-img" alt='trodl-logo'></img>
                        </div>
                        <div className="col-6 right">
                            <MetaMaskWallet onConnection={this.onConnect} onAccountChange={this.onAccountChange} />
                        </div>
                    </div>

                    <div className="row mg-t-75">
                        <div className="col-8 mg-t-75 left">
                            <div className="head1">
                                Get access to an ocean of opportunities
                            </div>
                            <div className="subhead">
                                Staking TRO earns you quarterly airdrops, assured IDO allocations and access to an ocean of opportunities within trodl ecosystem
                            </div>
                            <div className="mt-40">
                                <button className="stake-btn" onClick={scrollToMyRef}> STAKE TRO</button>
                                <a href="https://forms.gle/kLYhRVPyyj64M7jE7" target="_blank" rel="noreferrer"><button className="ido-btn" >APPLY FOR IDO</button></a>
                            </div>
                        </div>
                        <div className="col-4 right">
                            <img src={rightImg} className="right-img" alt='right-img'>
                            </img>
                        </div>
                    </div>
                </div>
            )
        }
        const dashboardSection = () => {
            return (
                <div className="secDivider">
                    <div ref={this.myRef} className="head2">
                        User Dashboard
                    </div>
                    <div className="row  font16 mt-50">
                        <TotalStakedTROCard trodlStake={this.state.trodlStake} accounts={this.state.accounts} web3={this.state.web3} />
                        <TotalMintedxTROCard trodlStake={this.state.trodlStake} accounts={this.state.accounts} web3={this.state.web3} />
                        <TROPriceCard />
                    </div>
                    <div className="row  mt-50 font16">
                        <TROBalanceCard trodlToken={this.state.trodlToken} trodlStake={this.state.trodlStake} accounts={this.state.accounts} web3={this.state.web3} onTransaction={this.onTransaction} />
                        <XTRORewardCard trodlStake={this.state.trodlStake} accounts={this.state.accounts} web3={this.state.web3} onTransaction={this.onTransaction} />
                        <TROWithdrawCard trodlStake={this.state.trodlStake} accounts={this.state.accounts} web3={this.state.web3} onTransaction={this.onTransaction} />
                    </div>
                </div>
            )
        }
        return (
            <div className="staking-body">
                {this.state.error ?
                    <ErrorModal onClose={this.showErrorModal} show={this.state.show} type={this.state.type}>
                        {`${this.state.error.message}`}
                    </ErrorModal> : null
                }
                {heroSection()}
                {dashboardSection()}
                <div className="t-and-c">
                    © Trodl.com 2021-22. All rights reserved.
                </div>
            </div>
        )
    }
}
