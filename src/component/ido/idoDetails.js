import dummylOGO from "../../assets/images/bsc-icon-logo-1-1@2x.png";

const scheduleArr = [{ width: '40%', date: '2 days' }, { width: '20%', date: '12hrs' }, { width: '30%', date: '1 day' }, { width: '10%', date: '10hrs' }]
const IdoDetails = (props) => {


    return (


        <div className="flex-d">
            <div className="detail-box-1">

                <div className="flex-d mb-24">
                    <div className="img_ido_div">
                        <img src={dummylOGO} className="idoimg" alt='trodl-logo'></img>

                    </div>
                    <div className="groupd">
                        <div className="coinname">PolkaPets</div>
                        <div className="coinsymb ">$PETS</div>

                    </div>
                    <div className="live-tag ml-24">Live</div>
                    <div className="pa-btn cursor-p  flex-right">Pre-Approve</div>
                    <div className="swap-btn cursor-p  " >Swap</div>


                </div>
                <div className="flex-d font-14">
                    <div className="mr-52">
                        <span className="sub-head-ido mar-10 "> Access</span>   <span className="intext-1 font-14">SHERPAS </span>

                    </div>
                    <div className="mr-52">
                        <span className="sub-head-ido mar-10">  Launch date</span>       <span className="intext-1 font-14">11-11-2021 </span>

                    </div >
                    <div className="">
                        <span className="sub-head-ido mar-10">        Ends in</span>      <span className="intext-2 font-14" >2 days </span>

                    </div>

                </div>
                <div className="flex-d">

                    <div className=" offering-box mt-10 txt-left off-w  mtb-12 mr-8">
                        <div className="sub-head-ido mar-10 font-14"> Total offering amt.</div>       <div className="intext-1 font-14">1,142,857.143 FACTR </div>

                    </div >
                    <div className=" offering-box mt-10 txt-left off-w  mtb-12 mr-8">
                        <div className="sub-head-ido mar-10"> Rate</div>       <div className="intext-1 font-14">14.28571 FACTR = 1 BUSD</div>

                    </div >
                    <div className=" offering-box mt-10 off-w txt-left  mr-8">
                        <div className="sub-head-ido mar-10  font-14"> Invested</div>       <div className="intext-1 font-14">1,142,857.143 FACTR </div>

                    </div>
                </div>


                <div className="vesting-sch mt-10 txt-left font-14  ">
                    <div className="intext-1 align-c semi-bold font-14 mt-14">Vesting Schedule</div>

                    <div className="mtb-12">

                    </div>
                    <div className="mt-20">
                        <div className="flex-d">
                            {scheduleArr.map((item, index) => (
                                <div className="align-c font-12 " style={{ width: item.width }}>
                                    {item.date}
                                </div>
                            ))}
                        </div>
                        <div className="container mt-5p">

                            <div className="progress h-26">

                                {scheduleArr.map((item, index) => (
                                    <div className="progress-bar progress-bar-success" role="progressbar" style={{ width: item.width }}>
                                        {item.width}
                                    </div>
                                ))}



                            </div>
                        </div>
                    </div>
                    <div className="mtb-12">
                        <div className="claim-btn cursor-p " >Claim</div>

                    </div>
                </div>
                {/* <div className="pi-btn ">Project Info</div> */}
                <hr></hr>

                <div className="font-16 txt-left mt-30 semi-bold">
                    About project
            </div>
                <div className="font-14 txt-left mt-10">
                    PolkaPets is a unique NFT concept that encourages participation in the Polkadot ecosystem through partnerships with some of the biggest projects around. Each partner has their very own PolkaPet which they can use to educate and engage owners through special utilities and perks.
            </div>
                <div className="flex-d mt-20">
                    <div className="ido-sub-btns cursor-p "> <i class="fas fa-globe fa-ido-icn"></i>Visit website</div>
                    <div className="ido-sub-btns cursor-p "> <i class="far fa-file-alt fa-ido-icn" ></i>whitepapere</div>
                    <div className="ido-sub-btns cursor-p "><i class="fas fa-file-signature fa-ido-icn"></i>Token contract</div>
                    <div className="ido-sub-btns cursor-p "> <i class="fab fa-twitter fa-ido-icn"></i>Twitter</div>
                    <div className="ido-sub-btns cursor-p "> <i class="fas fa-paper-plane fa-ido-icn"></i>Telegram</div>
                </div>
            </div>

            <div className="box-2">
                <div className="detail-box-2">

                    <div className="font-16 txt-left  semi-bold p-16-lr">
                        Pool & Financial
            </div>
                    <hr className="widebr1"></hr>
                    <div className="mt-10 txt-left font-14 p-16-lr">
                        <div className="mtb-12">
                            <span className="sub-head-ido mar-10 "> Total Raise</span>   <span className="intext-1 font-14">$80,000 </span>

                        </div>
                        <div className="mtb-12">
                            <span className="sub-head-ido mar-10">  Hard cap</span>       <span className="intext-1 font-14">$2,900,000 USD </span>

                        </div >
                    </div>
                    <hr></hr>
                    <div className="p-16-lr">
                        <div className="intext-2 semi-bold font-14">ICO Price</div>
                        <div className="mt-10 txt-left font-14">

                            <div className="mtb-12">
                                <span className="sub-head-ido mar-10 ">Seed Rounde</span>   <span className="intext-1 font-14">$0.04 </span>

                            </div>
                            <div className="mtb-12">
                                <span className="sub-head-ido mar-10">  Private round price</span>       <span className="intext-1 font-14">$0.064 </span>

                            </div >
                            <div className="mtb-12">
                                <span className="sub-head-ido mar-10">  IDO round</span>       <span className="intext-1 font-14">$0.07 </span>

                            </div >
                        </div>
                    </div>
                    <hr></hr>
                    <div className="p-16-lr">


                        <div className="intext-1 semi-bold font-14">Swap Progress</div>
                        <div class="progress-ido progress mt-10">
                            <div class="progress-bar w-75 " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" >75%</div>
                        </div>
                        <div className="intext-1 font-12 txt-left mt-8">   1,142,857.143 / 1,142,857.143 </div>

                    </div>
                </div>
                <div className="detail-box-3">
                    <div className="font-16 txt-left  semi-bold p-16-lr">
                        Offerings
            </div>

                    <hr className="widebr1"></hr>
                    <div className="p-16-lr marg-a-off font-14 mt-10 txt-left">
                        <div className="mtb-12">
                            <span className="sub-head-ido mar-10 "> Ticker</span>   <span className="intext-1 font-14">zenditFACTR </span>

                        </div>
                        <div className="mtb-12">
                            <span className="sub-head-ido mar-10">  Blockchain</span>       <span className="intext-1 font-14">Binance smart chain </span>

                        </div >
                        <div className="mtb-12">
                            <span className="sub-head-ido mar-10"> Address</span>      <span className="intext-1 font-14">0xa8c9d927a23d1057..  <i class="far fa-copy"></i> </span>

                        </div>
                        <div className="mtb-12">
                            <span className="sub-head-ido mar-10 "> Total supply</span>   <span className="intext-1 font-14">1,428,571.43 zenditFACTR </span>

                        </div>
                        <div className="mtb-12">
                            <span className="sub-head-ido mar-10 "> Type</span>   <span className="intext-1 font-14">BEP-20 </span>

                        </div>

                    </div>


                </div>

            </div>
        </div >

    )



}
export default IdoDetails