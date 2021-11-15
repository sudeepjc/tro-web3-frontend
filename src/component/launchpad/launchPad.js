
import React, { Component } from 'react';
import trodlLogo from "../../assets/images/trodl_logo_2.png";
import icon1 from '../../assets/images/icon_1.png';
import icon2 from '../../assets/images/icon_2.png';
import icon3 from '../../assets/images/icon_3.png';
import IDOComponent from '../ido/idoComponent';
import { Staking } from '../staking/Staking';

export class LaunchPad extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTab: 'staking'

        }
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
                                <button className="meta-btn mr-17  mt-10" ><i className="fas fa-wallet mr-17" ></i>connect metamask</button>

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
                    <div class="lp-mgrs">

                        {this.state.currentTab == 'staking' ? <Staking></Staking> : null}
                        {this.state.currentTab == 'ido' ? <IDOComponent></IDOComponent> : null}

                    </div>
                </div>
            </div>
        )

    }

}