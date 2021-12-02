
import React, { Component } from 'react';
import trodlLogo from "../../assets/images/trodl_logo_2.png";
import rightImg from '../../assets/images/banner.png';
import { Redirect } from 'react-router-dom'
import icon1 from '../../assets/images/icon_1.png';
import icon2 from '../../assets/images/icon_2.png';
import icon3 from '../../assets/images/icon_3.png';
import TROicon from "../../assets/images/TROicon.png";

export class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            toLaunchpad: false,

        }
        this.focusHome = React.createRef()
        this.focusFeature = React.createRef()

    }

    render() {
        if (window.innerWidth < 1000) {
            console.log('window.innerwidth');
            window.location.href = "https://trodl.com/";

        }
        const handleOnClick = (event) => {
            //.current is verification that your element has rendered
            if (event) {
                event.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                })
            }
        }
        if (this.state.toLaunchpad) {
            return <Redirect to='/launchpad' />
        }

        // const scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop);
        const heroSection = () => {
            return (
                <div >
                    <div className="row mlr64">
                        <div className="mt-42">
                            <div className="flex-d left">
                                <img src={trodlLogo} className="logo-img" alt='trodl-logo' ></img>
                                <div className="tabs-land cursor-p" onClick={() => {
                                    handleOnClick(this.focusHome.current)
                                }}>
                                    Home
                            </div>
                                <div className="tabs-land cursor-p "
                                    onClick={() => {
                                        handleOnClick(this.focusFeature.current)
                                    }}>
                                    Features
                            </div>
                                <div className="flex-right">
                                    <a href="https://trodl.com" target="_blank" rel="noreferrer" className="deco-none">
                                        <div className="btn-tro"><img src={TROicon} className="troimg-1" alt='trodl-logo'></img> Trodl.com</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" mg-t-75" ref={this.focusHome}>
                        <div className="mg-t-75 ">
                            <div className="head1">
                                Get access to an ocean of opportunities
                            </div>
                            <div className="subhead">
                                Staking TRO earns you quarterly airdrops, assured IDO allocations and access to an ocean of opportunities within trodl ecosystem
                            </div>
                            <div className="mt-40">
                                <button className="launch-btn mr-17" onClick={() => {
                                    setTimeout(() => this.setState(() => ({ toLaunchpad: true })), 5000)


                                }}>
                                    <i className="fas fa-rocket mr-17"  ></i>
                                    Open Launchpad
                                </button>
                                <a href="https://forms.gle/kLYhRVPyyj64M7jE7" target="_blank" rel="noreferrer"><button className="ido-btn" > <i className="fas fa-wallet mr-17"></i>Apply for IDO</button></a>
                            </div>
                        </div>
                        <div className=" ">
                            <img src={rightImg} className="right-img" alt='right-img'>
                            </img>
                        </div>
                    </div>
                </div>
            )
        }
        const features = () => {
            return (
                <div ref={this.focusFeature}>
                    <div className="subhead-2">
                        Features
                    </div>
                    <div className="main-feat mb-55">
                        <div className="main-feat">
                            <div className="icon-feat">
                                <img src={icon1} className="icon-lp" alt='trodl-logo'></img>
                            </div>
                            <div className="card-feat">
                                <div className="head-feat">Staking</div>
                                <div className="sub-feat">Staking is not just about APY anymore!! Stake TRO to earn xTRO. Higher the xTRO, higher the airdrops and IDO allocation. Stake more to earn more.</div>
                            </div>
                        </div>
                        <div className="main-feat  ml-66">
                            <div className="icon-feat">
                                <img src={icon2} className="icon-lp" alt='trodl-logo'></img>

                            </div>
                            <div className="card-feat">
                                <div className="head-feat">IDO Launchpad</div>
                                <div className="sub-feat">Trodl IDO launchapad is your ticket to ocean of opportunities to invest in diversified portfolios and have early access to the best of Crypto Gems</div>
                            </div>
                        </div>
                        <div className="main-feat  ml-66">
                            <div className="icon-feat">
                                <img src={icon3} className="icon-lp" alt='trodl-logo'></img>

                            </div>
                            <div className="card-feat">
                                <div className="main-feat">
                                    <div className="head-feat">Governance</div>
                                    <div className="coming-soon">
                                        coming soon
                                    </div>
                                </div>
                                <div className="sub-feat">The Next Big Thing. Shall be unveiled soon.</div>
                            </div>
                        </div>
                    </div>
                    <button className="launch-btn mr-17 mb-240" onClick={() => { this.setState(() => ({ toLaunchpad: true })) }}><i className="fas fa-rocket mr-17" ></i>Open Launchpad</button>
                </div>
            );
        }
        return (
            <div>
                { window.innerWidth < 1000 ? <div className="pad-160">Staking and Launchpad is accessible from Desktop or Laptop screens only. Not available on mobile devices</div> :
                    <div className="bg-col-land">
                        {heroSection()}
                        {features()}
                        <div className="t-and-c">
                            © Trodl.com 2021-22. All rights reserved.
                    </div>
                    </div>
                }
            </div>
        );
    }
}