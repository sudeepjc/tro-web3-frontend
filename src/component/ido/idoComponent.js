
import React, { Component, useEffect, useState } from 'react';
import dummylOGO from "../../assets/images/bsc-icon-logo-1-1@2x.png";
import IdoDetails from '../ido/idoDetails'
const IdoComponent = () => {

    const idoData = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const [dropBool, showDropdown] = useState(false);
    const [detailsBool, showDetails] = useState(false);

    useEffect(() => {

    });
    return (
        <div className="mt-44">
            {detailsBool ?
                <IdoDetails></IdoDetails> :
                <div>
                    <div className="ido_head">
                        Trodl IDO launchpad
            </div>
                    <div className="ido_sub">
                        Build and Grow Your Portfolio by Accessing High-Potential, Vetted Projects!
            </div>
                    <div className="flex-d mt-32">
                        <div className="banner-ido">
                            banner1
                </div>
                        <div className="banner-ido">
                            banner2
                </div>
                        <div className="banner-ido">
                            banner3
                </div>

                    </div>
                    <div className="flex-d mt-35 ml-12">
                        <i className="fa fa-search search-icn" aria-hidden="true"></i>
                        <input className="ido-search" placeholder="Search by pool name here... " />
                        <div className="ido-rigth">
                            <div className="stat">
                                Status
                </div>
                            <div className={dropBool ? 'dropdown show' : 'dropdown'} >
                                <button class="btn btn-secondary dropdown-toggle status-dd" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => {
                                    dropBool ? showDropdown(false) : showDropdown(true)
                                }}>
                                    Ongoing <i class="fas fa-circle dd-circle"></i>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" onClick={() => { showDropdown(false) }}>Action</a>
                                    <a class="dropdown-item" onClick={() => { showDropdown(false) }} >Another action</a>
                                    <a class="dropdown-item" onClick={() => { showDropdown(false) }} >Something else here</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="mr-20"></hr>

                    <div className="row ml-3">
                        {idoData.map((item, index) => (
                            <div key={index} onClick={() => showDetails(true)} className=" col-ido ido_card">
                                <div className="mlr-20">
                                    <div className="flex-d mb-24">
                                        <div className="img_ido_div">
                                            <img src={dummylOGO} className="idoimg" alt='trodl-logo'></img>

                                        </div>
                                        <div className="groupd">
                                            <div className="coinname">PolkaPets</div>
                                            <div className="coinsymb">$PETS</div>

                                        </div>
                                        <div className="live-tag">Live</div>


                                    </div>
                                    <div className="flex-d">
                                        <div className="width50">
                                            <div className="sub-head-ido">Access</div>
                                            <div className="intext-1">SHERPAS</div>
                                        </div>

                                        <div>
                                            <div className="sub-head-ido">Network</div>
                                            <div className="intext-1">Binance</div>
                                        </div>

                                    </div>
                                    <div className="flex-d">
                                        <div className="width50">
                                            <div className="sub-head-ido">Ends in</div>
                                            <div className="intext-2">2 days</div>
                                        </div>
                                        <div>
                                            <div className="sub-head-ido">Progess</div>
                                            <div className="intext-1">93.2% applied</div>
                                        </div>


                                    </div>


                                </div>

                            </div>))

                        }
                    </div>
                </div>
            }
        </div>
    )
}
export default IdoComponent;
