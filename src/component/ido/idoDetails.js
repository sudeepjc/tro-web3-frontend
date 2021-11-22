import React, { useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import { poolsStatic } from './poolsStatic';
import { useDispatch } from 'react-redux';
import { setErrorModal } from '../../redux/actions/errorModalActions';
import { setTxSubmitModal } from '../../redux/actions/transactionSubmitActions';
import { setTxStatusModal } from '../../redux/actions/transactionStatusActions';

const IdoDetails = ({ poolId, paymentToken, trodlIdo, accounts, web3 }) => {
    const dispatch = useDispatch();

    const [invested, setInvested] = useState('');
    const [poolInfo, setPoolInfo] = useState(null);
    const [poolState, setPoolState] = useState(null);
    const [isIntervalPool, setIsIntervalPool] = useState(false);
    const [isLinearPool, setIsLinearPool] = useState(false);
    const [redraw, setRedraw] = useState(false);

    const showErrorModal = (show, type, error) => {
        dispatch(setErrorModal(show, type, error.message))
    };

    const showTransactionSubmitModal = (show, hash) => {
        dispatch(setTxSubmitModal(show, hash))
        setTimeout(() => { dispatch(setTxSubmitModal(false, null)) }, 5000);
    };

    const showTransactionStatusModal = (show, status, msg, hash) => {
        dispatch(setTxStatusModal(show, status, msg, hash))
        setTimeout(() => { dispatch(setTxStatusModal(false, null, null, null)) }, 5000);
    };

    const isValidConnectionForCard = () => {
        if ((trodlIdo && (trodlIdo._address !== null))
            && (paymentToken && (paymentToken._address !== null))
            && (accounts && accounts.length > 0) && web3) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        async function getPoolInfo() {
            if (isValidConnectionForCard()) {
                try {
                    let poolInfo = await trodlIdo.methods.poolProps(poolId).call({ from: accounts[0] });
                    setPoolInfo(poolInfo);
                    console.log(`PoolInfo for PoolID: ${poolId}`);
                    console.log(poolInfo);
                } catch (err) {
                    console.log(`Failed to get PoolInfo for PoolID: ${poolId} : ${err.message}`);
                }
            }
        }
        getPoolInfo();
    }, [trodlIdo, accounts, web3, redraw]);

    useEffect(() => {
        async function getPoolState() {
            if (isValidConnectionForCard()) {
                try {
                    let poolState = await trodlIdo.methods.poolState(poolId).call({ from: accounts[0] });
                    setPoolState(poolState);
                    console.log(`PoolState for PoolID: ${poolId}`);
                    console.log(poolState);
                } catch (err) {
                    console.log(`Failed to get PoolState for PoolID ${poolId} : ${err.message}`);
                }
            }
        }
        getPoolState();
    }, [trodlIdo, accounts, web3, redraw]);

    useEffect(() => {
        const formatInvested = async () => {
            if (isValidConnectionForCard()) {
                try {
                    let poolInfo = await trodlIdo.methods.poolProps(poolId).call({ from: accounts[0] });
                    let investedStr = '--';
                    let type = poolInfo['type_'];
                    if (type === '0') {

                        let accountState = await trodlIdo.methods.poolAccount(poolId, accounts[0]).call({ from: accounts[0] });
                        let invested = accountState["state"].paymentSum;
                        invested = await web3.utils.fromWei(invested, 'ether');
                        investedStr = invested + ' BUSD';
                    } else if (type === '1') {
                        setIsIntervalPool(true);
                        let accIntervalData = await trodlIdo.methods.intervalPoolAccount(poolId, accounts[0]).call({ from: accounts[0] });
                        let invested = accIntervalData['complex'].issuanceAmount;
                        invested = await web3.utils.fromWei(invested, 'ether');
                        investedStr = invested + ' ' + getTicker();
                    } else if (type === '2') {
                        setIsLinearPool(true);
                        let accLinearData = await trodlIdo.methods.linearPoolAccount(poolId, accounts[0]).call({ from: accounts[0] });
                        let invested = accLinearData['complex'].issuanceAmount;
                        invested = await web3.utils.fromWei(invested, 'ether');
                        investedStr = invested + ' ' + getTicker();
                    }
                    setInvested(investedStr);
                } catch (err) {
                    console.log(`Failed to get Invested Amount for PoolID ${poolId} : ${err.message}`);
                }
            } else {
                setInvested('--');
            }
        }
        formatInvested();
    }, [trodlIdo, accounts, web3, invested, isIntervalPool, isLinearPool, redraw]);

    const handleError = (err, receipt, eventName) => {
        console.log('Handling Error:');
        console.log(err);
        console.log(receipt);
        console.log(eventName);
        if (receipt) {
            showTransactionStatusModal(true, 'Failure', `${eventName} Failed`, receipt.transactionHash);
        } else {
            if (err.code === 4001) {
                //Ignore User Tx Reject
            } else if (err.code && (err.code !== 0)) {
                let message = `${err.code} : ${err.message}`;
                showErrorModal(true, 'other error', new Error(message));
            }
        }
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

    const getAboutProject = () => {
        let result = poolsStatic.filter(pool => pool.poolId === poolId);
        return result[0].aboutProject;
    }

    const getProjectWebsite = () => {
        let result = poolsStatic.filter(pool => pool.poolId === poolId);
        return result[0].projectWebsite;
    }

    const getProjectWhitepaper = () => {
        let result = poolsStatic.filter(pool => pool.poolId === poolId);
        return result[0].projectWhitepaper;
    }

    const getProjectContract = () => {
        let result = poolsStatic.filter(pool => pool.poolId === poolId);
        return result[0].projectContract;
    }

    const getProjectTwitter = () => {
        let result = poolsStatic.filter(pool => pool.poolId === poolId);
        return result[0].projectTwitter;
    }

    const getProjectTelegram = () => {
        let result = poolsStatic.filter(pool => pool.poolId === poolId);
        return result[0].projectTelegram;
    }

    const getChain = () => {
        let result = poolsStatic.filter(pool => pool.poolId === poolId);
        return result[0].chain;
    }

    const getTotalSupply = () => {
        let result = poolsStatic.filter(pool => pool.poolId === poolId);
        return result[0].totalSupply;
    }
    const getTokenType = () => {
        let result = poolsStatic.filter(pool => pool.poolId === poolId);
        return result[0].type;
    }
    const getTotalRaise = () => {
        let result = poolsStatic.filter(pool => pool.poolId === poolId);
        return result[0].totalRaise;
    }

    const getHardCap = () => {
        let result = poolsStatic.filter(pool => pool.poolId === poolId);
        return result[0].hardCap;
    }

    const getSeedPrice = () => {
        let result = poolsStatic.filter(pool => pool.poolId === poolId);
        return result[0].seedPrice;
    }

    const getPrivateRoundPrice = () => {
        let result = poolsStatic.filter(pool => pool.poolId === poolId);
        return result[0].privatePrice;
    }

    const getIDORoundPrice = () => {
        let result = poolsStatic.filter(pool => pool.poolId === poolId);
        return result[0].idoPrice;
    }

    const getLaunchDate = () => {
        let result = poolsStatic.filter(pool => pool.poolId === poolId);
        return result[0].launchDate;
    }

    const formatProgress = () => {
        if (poolState) {
            let available = new BigNumber(poolState.available);
            let issuance = new BigNumber(poolState.issuance);
            let progress = 0;
            if (issuance.isEqualTo(BigNumber(0))) {
                progress = 0;
            } else {
                progress = issuance.minus(available).dividedBy(issuance).multipliedBy(100).toFixed(2);
            }
            let pCssClass = `progress-bar w-${progress}`;

            return (<div className={pCssClass} role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" >{progress}%</div>);
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
                return <div className="live-tag ml-24">Live</div>;
            } else {
                return <div className="ended-tag ml-24">Ended</div>;
            }
        }
    }

    const formatReadableTime = (currentTime, poolStartTime, poolEndTime) => {
        if (currentTime < poolStartTime) {
            let secondsLeft = poolStartTime - currentTime;
            if (secondsLeft > 86400) {
                return (parseInt(secondsLeft / 86400) + " days ");
            } else if (secondsLeft > 3600) {
                return (parseInt(secondsLeft / 3600) + " hours ");
            } else if (secondsLeft > 60) {
                return (parseInt(secondsLeft / 60) + " minutes ");
            } else {
                return (secondsLeft + " seconds ");
            }
        } else if ((currentTime > poolStartTime) && (currentTime < poolEndTime)) {
            let secondsLeft = poolEndTime - currentTime;
            if (secondsLeft > 86400) {
                return (parseInt(secondsLeft / 86400) + " days ");
            } else if (secondsLeft > 3600) {
                return (parseInt(secondsLeft / 3600) + " hours ");
            } else if (secondsLeft > 60) {
                return (parseInt(secondsLeft / 60) + " minutes ");
            } else {
                return (secondsLeft + " seconds ");
            }
        } else {
            let secondsPast = currentTime - poolEndTime;
            if (secondsPast > 86400) {
                return (parseInt(secondsPast / 86400) + " days ago ");
            } else if (secondsPast > 3600) {
                return (parseInt(secondsPast / 3600) + " hours ago ");
            } else if (secondsPast > 60) {
                return (parseInt(secondsPast / 60) + " minutes ago ");
            } else {
                return (secondsPast + " seconds ago");
            }
        }
    }

    const formatStatusDetailed = () => {
        if (poolInfo) {
            let readableTimeTitle = "";
            let currentTime = Math.floor(Date.now() / 1000);
            let poolStartTime = parseInt(poolInfo.props.startsAt);
            let poolEndTime = parseInt(poolInfo.props.endsAt);
            let readableTime = formatReadableTime(currentTime, poolStartTime, poolEndTime);

            if (currentTime < poolStartTime) {
                readableTimeTitle = "Starts In";
            } else if ((currentTime > poolStartTime) && (currentTime < poolEndTime)) {
                readableTimeTitle = "Ends In";
            } else {
                readableTimeTitle = "Ended";
            }
            return (
                <div>
                    <span className="sub-head-ido mar-10">{readableTimeTitle}</span> <span className="intext-2 font-14" >{readableTime} </span>
                </div>
            );
        }
    }

    const formatTokenAddress = () => {
        if (poolInfo) {
            return (
                <div>
                    <span className="sub-head-ido mar-10"> Address</span> <span className="intext-1 font-14">{poolInfo.props.issuanceToken}</span>
                </div>
            );
        }
    }

    const formatSold = () => {
        if (poolState) {
            let available = new BigNumber(poolState.available);
            let issuance = new BigNumber(poolState.issuance);
            return web3.utils.fromWei(issuance.minus(available).toFixed(0), "ether");
        } else {
            return "--";
        }
    }

    const formatIssuance = () => {
        if (poolState) {
            let issuance = new BigNumber(poolState.issuance);
            return web3.utils.fromWei(issuance.toFixed(0), "ether");
        } else {
            return "--";
        }
    }

    const formatRate = () => {
        if (poolInfo) {
            let rate = new BigNumber(poolInfo.props.rate);
            return web3.utils.fromWei(rate.toFixed(0), "ether");
        } else {
            return "--";
        }
    }

    const getIntervalSchedule = () => {
        let result = poolsStatic.filter(pool => pool.poolId === poolId);
        let intervalSchedule = result[0].intervalSchedule;

        return (
            <div className="mt-20">
                <div className="flex-d">
                    {intervalSchedule.map((item, index) => (
                        <div className="align-c font-12 " style={{ width: item.width }} key={index}>
                            {item.date}
                        </div>
                    ))}
                </div>
                <div className="container mt-5p">
                    <div className="progress h-26">
                        {intervalSchedule.map((item, index) => (
                            <div className="progress-bar progress-bar-success" role="progressbar" style={{ width: item.width }} key={index}>
                                {item.width}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const getLinearSchedule = () => {
        let result = poolsStatic.filter(pool => pool.poolId === poolId);
        let intervalSchedule = result[0].linearSchedule;

        return (
            <div className="mt-20 flex-d">
                <div className="">
                    <div className="sub-head-ido mar-10"> Immediate Unlock</div> <div className="intext-1 font-14">{intervalSchedule.immPart}</div>


                </div>
                <div className="flex-right">
                    <div className="sub-head-ido mar-10  font-14"> Release proptionally during {intervalSchedule.unlockingEnds}</div> <div className="intext-1 font-14">{intervalSchedule.remainingPart} </div>

                </div>
            </div>
        );
    }

    const approveBUSD = async () => {
        try {
            if (isValidConnectionForCard()) {
                let balance = await paymentToken.methods.balanceOf(accounts[0]).call({ from: accounts[0] });

                if (balance <= 0) {
                    console.log('Insufficient BUSD balance');
                    showErrorModal(true, 'other error', new Error('BUSD required to pre-approve'));
                    return;
                } else {
                    let tx = await paymentToken.methods.approve(trodlIdo._address, balance).send({ from: accounts[0] })
                        .on('transactionHash', function (hash) {
                            showTransactionSubmitModal(true, hash);
                        })
                        .on('receipt', function (receipt) {
                            let amt = web3.utils.fromWei(receipt.events.Approval.returnValues.value, 'ether');
                            showTransactionStatusModal(true, 'Success', `${amt} BUSD Approved Successfully`, receipt.transactionHash);
                        })
                        .on('error', function (err, receipt) {
                            handleError(err, receipt, 'Approve');
                        });

                    console.log(tx);
                }
            } else {
                console.log('Validation failed: Connect to Binance Smart Chain');
                showErrorModal(true, 'switch', new Error('Connect to Binance Smart Chain'));
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    const swap = async () => {
        try {
            if (isValidConnectionForCard()) {
                let allowance = await paymentToken.methods.allowance(accounts[0], trodlIdo._address).call({ from: accounts[0] });
                if (allowance <= 0) {
                    console.log('Zero BUSD allowance');
                    showErrorModal(true, 'other error', new Error('BUSD approval required for swap'));
                    return;
                }

                let accountState = await trodlIdo.methods.poolAccount(poolId, accounts[0]).call({ from: accounts[0] });
                let limitIndex = accountState["state"].limitIndex;
                let userLimit = poolState["paymentLimits"][limitIndex];

                if (userLimit <= 0) {
                    console.log(`User ${accounts[0]} is not whitelisted for sale`);
                    showErrorModal(true, 'other error', new Error('User is not whitelisted'));
                    return;
                }

                let amount = (allowance > userLimit) ? userLimit : allowance;

                let tx = await trodlIdo.methods.swap(poolId, amount).send({ from: accounts[0] })
                    .on('transactionHash', function (hash) {
                        showTransactionSubmitModal(true, hash);
                    })
                    .on('receipt', function (receipt) {
                        setRedraw(!redraw);
                        let amt = web3.utils.fromWei(receipt.events.Swap.returnValues.issuanceAmount, 'ether');
                        showTransactionStatusModal(true, 'Success', `${amt} ${getTicker()} Issued Successfully`, receipt.transactionHash);
                    })
                    .on('error', function (err, receipt) {
                        handleError(err, receipt, 'Swap');
                    });
                console.log(tx);
            } else {
                console.log('Validation failed: Connect to Binance Smart Chain');
                showErrorModal(true, 'switch', new Error('Connect to Binance Smart Chain'));
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    const claim = async () => {
        try {
            if (isValidConnectionForCard()) {
                let poolType = poolInfo["type_"];
                if (poolType == "1") {
                    let intervalPoolData = await trodlIdo.methods.intervalPoolAccount(poolId, accounts[0]).call({ from: accounts[0] });
                    let unlockedIndex = parseInt(intervalPoolData["unlockedIntervalsCount"]);

                    let tx = await trodlIdo.methods.unlockInterval(poolId, (unlockedIndex)).send({ from: accounts[0] })
                        .on('transactionHash', function (hash) {
                            showTransactionSubmitModal(true, hash);
                        })
                        .on('receipt', function (receipt) {
                            setRedraw(!redraw);
                            let amt = web3.utils.fromWei(receipt.events.IntervalPoolUnlocking.returnValues.amount, 'ether');
                            showTransactionStatusModal(true, 'Success', `${amt} ${getTicker()} Claimed Successfully`, receipt.transactionHash);
                        })
                        .on('error', function (err, receipt) {
                            handleError(err, receipt, 'Claim');
                        });
                    console.log(tx);

                } else if (poolType == "2") {

                    let linearPoolData = await trodlIdo.methods.linearPoolAccount(poolId, accounts[0]).call({ from: accounts[0] });
                    let issuanceAmount = new BigNumber(linearPoolData["complex"].issuanceAmount);
                    let withdrawnIssuanceAmount = new BigNumber(linearPoolData["complex"].withdrawnIssuanceAmount);

                    if (!issuanceAmount.isEqualTo(0)) {
                        if (withdrawnIssuanceAmount.isEqualTo(issuanceAmount)) {
                            console.log(`User ${accounts[0]} has withdrawn all tokens`);
                            showErrorModal(true, 'other error', new Error('All Withdrwals complete'));
                            return;
                        }
                    } else {
                        console.log(`User ${accounts[0]} is not issued tokens`);
                        showErrorModal(true, 'other error', new Error('User does not have issued tokens'));
                        return;
                    }

                    let tx = await trodlIdo.methods.unlockLinear(poolId).send({ from: accounts[0] })
                        .on('transactionHash', function (hash) {
                            showTransactionSubmitModal(true, hash);
                        })
                        .on('receipt', function (receipt) {
                            let amt = web3.utils.fromWei(receipt.events.LinearPoolUnlocking.returnValues.amount, 'ether');
                            showTransactionStatusModal(true, 'Success', `${amt} ${getTicker()} Claimed Successfully`, receipt.transactionHash);
                        })
                        .on('error', function (err, receipt) {
                            handleError(err, receipt, 'Claim');
                        });
                    console.log(tx);
                } else {
                    console.log("Invalid PoolType !");
                }
            } else {
                console.log('Validation failed: Connect to Binance Smart Chain');
                showErrorModal(true, 'switch', new Error('Connect to Binance Smart Chain'));
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="flex-d">
            <div className="detail-box-1">
                <div className="flex-d mb-24">
                    <div className="img_ido_div">
                        <img src={getTokenLogo()} className="idoimg" alt='trodl-logo'></img>
                    </div>
                    <div className="groupd ml-10">
                        <div className=" intext-1">{getTokenName()}</div>
                        <div className="  coinname">{'$' + getTicker()}</div>
                    </div>
                    {formatStatus()}
                    <div className="pa-btn cursor-p  flex-right" onClick={approveBUSD}>Pre-Approve</div>
                    <div className="swap-btn cursor-p" onClick={swap} >Swap</div>
                </div>
                <div className="flex-d font-14">
                    <div className="mr-52">
                        <span className="sub-head-ido mar-10 "> Access</span>   <span className="intext-1 font-14">{getAccess()} </span>
                    </div>
                    <div className="mr-52">
                        <span className="sub-head-ido mar-10"> Launch date</span> <span className="intext-1 font-14">{getLaunchDate()} </span>
                    </div >
                    <div className="">
                        {formatStatusDetailed()}
                    </div>
                </div>
                <div className="flex-d">
                    <div className=" offering-box mt-10 txt-left off-w  mtb-12 mr-8">
                        <div className="sub-head-ido mar-10 font-14"> Total offering </div> <div className="intext-1 font-14">{formatIssuance()} {getTicker()} </div>
                    </div >
                    <div className=" offering-box mt-10 txt-left off-w  mtb-12 mr-8">
                        <div className="sub-head-ido mar-10"> Rate</div> <div className="intext-1 font-14">{formatRate()} {getTicker()} = 1 BUSD</div>
                    </div >
                    <div className=" offering-box mt-10 off-w txt-left  mr-8">
                        <div className="sub-head-ido mar-10  font-14"> Invested</div> <div className="intext-1 font-14">{invested} </div>
                    </div>
                </div>

                {(isIntervalPool) ?
                    <div className="vesting-sch mt-10 txt-left font-14  ">
                        <div className="intext-1 align-c semi-bold font-14 mt-14">Vesting Schedule</div>
                        <div className="mtb-12">
                        </div>
                        {getIntervalSchedule()}
                        <div className="mtb-12">
                            <div className="claim-btn cursor-p" onClick={claim} >Claim</div>
                        </div>
                    </div> : <div></div>
                }
                {(isLinearPool) ?
                    <div className="vesting-sch mt-10 txt-left font-14  ">
                        <div className="intext-1 align-c semi-bold font-14 mt-14">Vesting Schedule</div>
                        <div className="mtb-12">
                        </div>
                        {getLinearSchedule()}
                        <div className="mtb-12">
                            <div className="claim-btn cursor-p" onClick={claim} >Claim</div>
                        </div>
                    </div> : <div></div>
                }
                <hr></hr>

                <div className="font-16 txt-left mt-30 semi-bold">
                    About project
                </div>
                <div className="font-14 txt-left mt-10">
                    {getAboutProject()}
                </div>
                <div className="flex-d mt-20">
                    <a rel="noreferrer" href={getProjectWebsite()} target="_blank" >
                        <div className="ido-sub-btns cursor-p"> <i className="fas fa-globe fa-ido-icn"></i>Website</div>
                    </a>
                    <a rel="noreferrer" href={getProjectWhitepaper()} target="_blank" >
                        <div className="ido-sub-btns cursor-p"> <i className="far fa-file-alt fa-ido-icn" ></i>Whitepaper</div>
                    </a>
                    <a rel="noreferrer" href={getProjectContract()} target="_blank" >
                        <div className="ido-sub-btns cursor-p"> <i className="fas fa-file-signature fa-ido-icn"></i>Token contract</div>
                    </a>
                    <a rel="noreferrer" href={getProjectTwitter()} target="_blank" >
                        <div className="ido-sub-btns cursor-p"> <i className="fab fa-twitter fa-ido-icn"></i>Twitter</div>
                    </a>
                    <a rel="noreferrer" href={getProjectTelegram()} target="_blank" >
                        <div className="ido-sub-btns cursor-p"> <i className="fas fa-paper-plane fa-ido-icn"></i>Telegram</div>
                    </a>
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
                            <span className="sub-head-ido mar-10 "> Total Raise</span> <span className="intext-1 font-14">{getTotalRaise()} </span>
                        </div>
                        <div className="mtb-12">
                            <span className="sub-head-ido mar-10"> Hard cap</span> <span className="intext-1 font-14">{getHardCap()} </span>
                        </div >
                    </div>
                    <hr></hr>
                    <div className="p-16-lr">
                        <div className="intext-2 semi-bold font-14">ICO Price</div>
                        <div className="mt-10 txt-left font-14">
                            <div className="mtb-12">
                                <span className="sub-head-ido mar-10 ">Seed Rounde</span> <span className="intext-1 font-14">{getSeedPrice()}</span>
                            </div>
                            <div className="mtb-12">
                                <span className="sub-head-ido mar-10"> Private round price</span> <span className="intext-1 font-14">{getPrivateRoundPrice()} </span>
                            </div >
                            <div className="mtb-12">
                                <span className="sub-head-ido mar-10"> IDO round</span> <span className="intext-1 font-14">{getIDORoundPrice()} </span>
                            </div >
                        </div>
                    </div>
                    <hr></hr>
                    <div className="p-16-lr">
                        <div className="intext-1 semi-bold font-14">Swap Progress</div>
                        <div className="progress-ido progress mt-10">
                            {formatProgress()}
                        </div>
                        <div className="intext-1 font-12 txt-left mt-8"> {formatSold()} / {formatIssuance()} </div>
                    </div>
                </div>
                <div className="detail-box-3">
                    <div className="font-16 txt-left  semi-bold p-16-lr">
                        Offerings
                    </div>
                    <hr className="widebr1"></hr>
                    <div className="p-16-lr marg-a-off font-14 mt-10 txt-left">
                        <div className="mtb-12">
                            <span className="sub-head-ido mar-10 "> Ticker</span> <span className="intext-1 font-14">{getTicker()} </span>
                        </div>
                        <div className="mtb-12">
                            <span className="sub-head-ido mar-10">  Blockchain</span> <span className="intext-1 font-14">{getChain()} </span>
                        </div >
                        <div className="mtb-12">
                            {formatTokenAddress()}
                        </div>
                        <div className="mtb-12">
                            <span className="sub-head-ido mar-10 "> Total supply</span> <span className="intext-1 font-14">{getTotalSupply()} </span>
                        </div>
                        <div className="mtb-12">
                            <span className="sub-head-ido mar-10 "> Type</span> <span className="intext-1 font-14">{getTokenType()} </span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default IdoDetails