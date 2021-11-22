import React, { useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import { poolsStatic } from './poolsStatic';

const IdoCard = ({ poolId, trodlIdo, accounts, selection, onDetailView }) => {
    const [poolInfo, setPoolInfo] = useState(null);
    const [poolState, setPoolState] = useState(null);

    useEffect(() => {
        async function getPoolState() {
            if (isValidConnectionForCard()) {
                try {
                    let pState = await trodlIdo.methods.poolState(poolId).call({ from: accounts[0] });
                    setPoolState(pState);
                    console.log(`PoolState for PoolID: ${poolId}`);
                    console.log(pState);
                } catch (err) {
                    console.log(`Failed to get PoolState at index ${poolId} : ${err.message}`);
                }
            }
        }

        getPoolState();

    }, [trodlIdo, accounts]);

    useEffect(() => {
        async function getPoolInfo() {
            if (isValidConnectionForCard()) {
                try {
                    let poolInfo = await trodlIdo.methods.poolProps(poolId).call({ from: accounts[0] });
                    setPoolInfo(poolInfo);
                    console.log(`PoolInfo for PoolID: ${poolId}`);
                    console.log(poolInfo);
                } catch (err) {
                    console.log(`Failed to get PoolInfo at index ${poolId} : ${err.message}`);
                }
            }
        }

        getPoolInfo();



    }, [trodlIdo, accounts]);



    const isValidConnectionForCard = () => {
        if ((trodlIdo && (trodlIdo._address !== null))
            && (accounts && accounts.length > 0)) {
            return true;
        }
        return false;
    }

    const getTokenLogo = () => {
        let result = poolsStatic.filter(pool => pool.poolId === poolId);
        return result[0].logo;
    }

    const getTokenName = () => {
        let result = poolsStatic.filter(pool => pool.poolId === poolId);
        return result[0].tokenName;
    }

    const getTicker = () => {
        let result = poolsStatic.filter(pool => pool.poolId === poolId);
        return result[0].ticker;
    }

    const getAccess = () => {
        let result = poolsStatic.filter(pool => pool.poolId === poolId);
        return result[0].access;
    }

    const formatProgress = () => {
        if (poolState) {
            let available = new BigNumber(poolState.available);
            let issuance = new BigNumber(poolState.issuance);
            if (issuance.isEqualTo(BigNumber(0))) {
                return '--'
            } else {
                let progress = issuance.minus(available).dividedBy(issuance).multipliedBy(100);
                return (progress.toFixed(2) + " %");
            }
        }
    }

    const formatStatus = () => {
        if (poolInfo) {
            let currentTime = Math.floor(Date.now() / 1000);
            let poolEndTime = parseInt(poolInfo.props.endsAt);
            let poolStartTime = parseInt(poolInfo.props.startsAt);
            if (currentTime < poolStartTime) {
                return <div className="upcoming-tag">Upcoming</div>;
            } else if ((currentTime > poolStartTime) && (currentTime < poolEndTime)) {
                return <div className="live-tag">Live</div>;
            } else {
                return <div className="ended-tag">Ended</div>;
            }
        }
    }

    const formatReadableTime = (currentTime, poolStartTime, poolEndTime) => {
        if (currentTime < poolStartTime) {
            let secondsLeft = poolStartTime - currentTime;
            if (secondsLeft > 86400) {
                return (parseInt(secondsLeft / 86400) + " days");
            } else if (secondsLeft > 3600) {
                return (parseInt(secondsLeft / 3600) + " hours");
            } else if (secondsLeft > 60) {
                return (parseInt(secondsLeft / 60) + " minutes");
            } else {
                return (secondsLeft + " seconds");
            }
        } else if ((currentTime > poolStartTime) && (currentTime < poolEndTime)) {
            let secondsLeft = poolEndTime - currentTime;
            if (secondsLeft > 86400) {
                return (parseInt(secondsLeft / 86400) + " days");
            } else if (secondsLeft > 3600) {
                return (parseInt(secondsLeft / 3600) + " hours");
            } else if (secondsLeft > 60) {
                return (parseInt(secondsLeft / 60) + " minutes");
            } else {
                return (secondsLeft + " seconds");
            }
        } else {
            let secondsPast = currentTime - poolEndTime;
            if (secondsPast > 86400) {
                return (parseInt(secondsPast / 86400) + " days ago");
            } else if (secondsPast > 3600) {
                return (parseInt(secondsPast / 3600) + " hours ago");
            } else if (secondsPast > 60) {
                return (parseInt(secondsPast / 60) + " minutes ago");
            } else {
                return (secondsPast + " seconds ago");
            }
        }
    }

    // const formatStatusDetailed = () => {
    //     if(poolInfo) {
    //         let readableTimeTitle = "";
    //         let currentTime = Math.floor(Date.now() / 1000);
    //         let poolStartTime = parseInt(poolInfo.props.startsAt);
    //         let poolEndTime = parseInt(poolInfo.props.endsAt);
    //         let readableTime = formatReadableTime(currentTime,poolStartTime, poolEndTime);

    //         if(currentTime < poolStartTime ) {
    //             readableTimeTitle = "Starts In";
    //         } else if ( (currentTime > poolStartTime) && (currentTime < poolEndTime)) {
    //             readableTimeTitle = "Ends In";
    //         } else {
    //             readableTimeTitle = "Ended";
    //         }
    //         return (
    //             <div>
    //                 <div className="sub-head-ido">{readableTimeTitle}</div>
    //                 <div className="intext-2">{readableTime}</div>
    //             </div>
    //         );
    //     }
    // }

    const formatStatusTitle = () => {
        if (poolInfo) {
            let readableTimeTitle = "";
            let currentTime = Math.floor(Date.now() / 1000);
            let poolStartTime = parseInt(poolInfo.props.startsAt);
            let poolEndTime = parseInt(poolInfo.props.endsAt);

            if (currentTime < poolStartTime) {
                readableTimeTitle = "Starts In";
            } else if ((currentTime > poolStartTime) && (currentTime < poolEndTime)) {
                readableTimeTitle = "Ends In";
            } else {
                readableTimeTitle = "Ended";
            }
            return readableTimeTitle;
        }
    }

    const formatStatusTime = () => {
        if (poolInfo) {
            let currentTime = Math.floor(Date.now() / 1000);
            let poolStartTime = parseInt(poolInfo.props.startsAt);
            let poolEndTime = parseInt(poolInfo.props.endsAt);
            return formatReadableTime(currentTime, poolStartTime, poolEndTime);
        }
    }


    const formatPoolStatus = () => {
        if (poolInfo) {
            let currentTime = Math.floor(Date.now() / 1000);
            let poolEndTime = parseInt(poolInfo.props.endsAt);
            let poolStartTime = parseInt(poolInfo.props.startsAt);
            if (currentTime < poolStartTime) {
                return "Upcoming";
            } else if ((currentTime > poolStartTime) && (currentTime < poolEndTime)) {
                return "Live";
            } else {
                return "Ended";
            }
        } else {
            return "NA";
        }
    }

    const shouldCardDisplay = () => {
        let status;
        if (selection.toLowerCase() == 'all') {
            status = true;
        } else if (selection.toLowerCase() == formatPoolStatus().toLowerCase()) {
            status = true;
        } else {
            status = false;
        }
        return status;
    }

    return (
        (shouldCardDisplay()) ?
            <div onClick={() => onDetailView(true, poolId)} className=" col-ido ido_card cursor-p">
                <div className="mlr-20">
                    <div className="flex-d ">
                        <div className="img_ido_div">
                            <img src={getTokenLogo()} className="idoimg" alt='trodl-logo'></img>
                        </div>
                        <div className=" groupd">
                            <div className=" coinsymb">{getTokenName()}</div>
                            <div className="coinname">{'$' + getTicker()}</div>
                        </div>
                        <div className="flex-right">
                            {formatStatus()}
                        </div>
                        {/* <div> */}

                        {/* <div className="sub-head-ido">Network</div>
                        <div className="intext-1">Binance</div> */}
                        {/* </div>  */}
                    </div>
                    <div className="flex-d mt-20">

                        <div className="">
                            <div className="sub-head-ido">Access</div>
                            <div className="intext-1">{getAccess()}</div>
                        </div>
                    </div>
                    <div className="flex-d mt-20">
                        <div className="width50">
                            {/* {formatStatusDetailed()} */}
                            <div className="sub-head-ido">{formatStatusTitle()}</div>
                            <div className="intext-2">{formatStatusTime()}</div>
                        </div>
                        <div>
                            <div className="sub-head-ido">Progress</div>
                            <div className="intext-1">{formatProgress()}</div>
                        </div>
                    </div>
                </div>
            </div>
            : <div></div>
    )
}

export default IdoCard;