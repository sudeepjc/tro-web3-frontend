import React, { Component, useRef } from 'react';
import trodlLogo from "../../assets/images/trodl_logo_2.png"
import walletImg from "../../assets/images/wallet-solid.svg"
import rightImg from '../../assets/images/Group 2@2x.png'
import secOne from '../../assets/images/university-solid.svg'
import secTwo from '../../assets/images/spinner-solid.svg'
import secThree from '../../assets/images/hand-holding-usd-solid.svg'

export class Staking extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }

    render() {

        if (window.innerWidth < 1000) {
            console.log(window.innerWidth)
            window.location.href = "https://trodl.com/"
        }
        const scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop)

        const heroSection = () => {
            return (
                <div>
                    <div className="row">
                        <div className="col-6 left">
                            <img src={trodlLogo} className="logo-img"></img>

                        </div>
                        <div className="col-6 right">
                            <button className="connect-btn">
                                <img src={walletImg} className="wallet-img"></img>

                        Connect Wallet
                    </button>
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
                                <a href="https://forms.gle/kLYhRVPyyj64M7jE7" target="_blank"><button className="ido-btn" >APPLY FOR IDO</button></a>


                            </div>
                        </div>

                        <div className="col-4 right">
                            <img src={rightImg} className="right-img ">
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
                    <div className="row mar-left-75 font16 mt-50">
                        <div className="col-3 card-sec card-height1">
                            <div className="mt-30">
                                <img src={secOne} className="sec-imgs "></img>

                            </div>
                            <div className="mtb18">
                                Total Staked TRO

                        </div>
                            <div className="col-theme">
                                21,000,000.00
                        </div>
                        </div>
                        <div className="col-3 card-sec card-height1" >
                            <div className="mt-30">
                                <img src={secTwo} className=" sec-imgs"></img>

                            </div>
                            <div className="mtb18">
                                Total Minted xTRO

                        </div>
                            <div className="col-theme">
                                21,000,000.00
                        </div>

                        </div>
                        <div className="col-3 card-sec card-height1">
                            <div className="mt-30">
                                <img src={secThree} className=" sec-imgs"></img>

                            </div>
                            <div className="mtb18">
                                $TRO Price

                        </div>
                            <div className="col-theme">
                                21,000,000.00
                        </div>
                        </div>

                    </div>



                    <div className="row mar-left-75 mt-50 font16">
                        <div className="col-3 card-sec card-height2">

                            <div className="mtb18 mt-50">
                                Available TRO Balance

                        </div>
                            <div className="col-theme">
                                21,000,000.00
                        </div>
                            <div className="borderDark"> </div>
                            <div className="mt-60">
                                <input className="input-cls" type="number"></input>
                            </div>
                            <div>
                                <button className=" mt-30 card-btns">
                                    Approve
                            </button>
                            </div>
                        </div>
                        <div className="col-3 card-sec card-height2" >

                            <div className="mtb18 mt-50">
                                Earned xTRO

                        </div>
                            <div className="col-theme">
                                21,000,000.00
                        </div>
                            <div className="borderDark"> </div>

                            <div className="mtb18 mt-30">
                                Staked TRO

                        </div>
                            <div className="col-theme">
                                21,000,000.00
                        </div>
                            <div className="mt-30">
                                <button className="  card-btns">
                                    Unstake
                            </button>
                            </div>

                        </div>
                        <div className="col-3 card-sec card-height2">

                            <div className="mtb18 mt-36">
                                Locked TRO balance

                        </div>
                            <div className="col-theme mtb18 ">
                                21,000,000.00
                        </div>
                            <div >
                                <button className="card-btns padimp">
                                    Re-Stake
                            </button>
                            </div>
                            <div className="mtb18 mt-30">
                                Unlocked TRO balance

                        </div>
                            <div className="col-theme mtb18">
                                21,000,000.00
                        </div>
                            <div className="mt-30">
                                <button className="card-btns padimp">
                                    Withdrawal
                            </button>
                            </div>
                        </div>

                    </div>
                </div>
            )
        }
        return (
            <div className="staking-body">
                {heroSection()}
                {dashboardSection()}
                <div className="t-and-c">
                    © Trodl.com 2021-22. All rights reserved.
                </div>
            </div>
        )
    }
}
