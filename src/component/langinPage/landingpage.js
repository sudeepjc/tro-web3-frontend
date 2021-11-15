
import React, { Component } from 'react';
import trodlLogo from "../../assets/images/trodl_logo_2.png";
import rightImg from '../../assets/images/banner.png';
import { Redirect } from 'react-router-dom'
export class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        this.state = {
            toLaunchpad: false

        }
    }

    render() {
        if (this.state.toLaunchpad) {
            return <Redirect to='/launchpad' />
        }
        const scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop);

        const heroSection = () => {
            return (
                <div>
                    <div className="row mlr64">
                        <div className="mt-42">
                            <div className="flex-d left">
                                <img src={trodlLogo} className="logo-img" alt='trodl-logo'></img>
                                <div className="tabs-land ">
                                    Home
                            </div>
                                <div className="tabs-land ">
                                    Features
                            </div>
                                <div className="flex-right">
                                    <a href="https://trodl.com" target="_blank" rel="noreferrer" className="deco-none"> <div className="btn-tro"
                                    >visit trodl.com</div></a>
                                </div>
                            </div>


                        </div>

                    </div>

                    <div className=" mg-t-75">
                        <div className="mg-t-75 ">
                            <div className="head1">
                                Get access to an ocean of opportunities
                            </div>
                            <div className="subhead">
                                Staking TRO earns you quarterly airdrops, assured IDO allocations and access to an ocean of opportunities within trodl ecosystem
                            </div>
                            <div className="mt-40">
                                <button className="launch-btn mr-17" onClick={() => {
                                    console.log('here')
                                    this.setState(() => ({ toLaunchpad: true }))
                                }}><i className="fas fa-rocket mr-17"  ></i>open launchpad</button>
                                <a href="https://forms.gle/kLYhRVPyyj64M7jE7" target="_blank" rel="noreferrer"><button className="ido-btn" > <i class="fas fa-wallet mr-17"></i>apply for IDO</button></a>
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
                <div>

                    <div className="subhead-2">
                        Features
                </div>
                    <div className="main-feat mb-55">
                        <div className="main-feat">
                            <div className="icon-feat"></div>
                            <div className="card-feat">
                                <div className="head-feat">Staking</div>
                                <div className="sub-feat">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus malesuada velit interdum, sagittis nisl ut, mollis felis. In sit amet aliquet arcu.</div>
                            </div>
                        </div>
                        <div className="main-feat  ml-66">
                            <div className="icon-feat"></div>
                            <div className="card-feat">
                                <div className="head-feat">IDO Launchpad</div>
                                <div className="sub-feat">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus malesuada velit interdum, sagittis nisl ut, mollis felis. In sit amet aliquet arcu.</div>
                            </div>
                        </div>
                        <div className="main-feat  ml-66">
                            <div className="icon-feat"></div>
                            <div className="card-feat">
                                <div className="main-feat">
                                    <div className="head-feat">Governance</div>
                                    <div className="coming-soon">
                                        coming soon
                                </div>
                                </div>
                                <div className="sub-feat">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus malesuada velit interdum, sagittis nisl ut, mollis felis. In sit amet aliquet arcu.</div>
                            </div>
                        </div>
                    </div>
                    <button className="launch-btn mr-17 mb-240" ><i className="fas fa-rocket mr-17" ></i>open launchpad</button>

                </div>

            )


        }

        return (
            <div>
                {heroSection()}
                {features()}
            </div>
        )

    }

}