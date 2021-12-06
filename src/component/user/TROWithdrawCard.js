import React, { useState, useEffect } from 'react';
import { formatValue } from '../../utils/wrappers';
import stakeIcon from "../../assets/images/staking_status.png";
import { useDispatch } from 'react-redux';
import { setErrorModal } from '../../redux/actions/errorModalActions';
import { setTxSubmitModal } from '../../redux/actions/transactionSubmitActions';
import { setTxStatusModal } from '../../redux/actions/transactionStatusActions'

const TROWithdrawCard = ({ trodlStake, accounts, web3, onTransaction }) => {
    const dispatch = useDispatch()

    const [lockedTRO, setLockedTRO] = useState('--');
    const [unlockedTRO, setUnlockedTRO] = useState('--');
    const [uError, setUError] = useState(null);

    const [style, setStyle] = useState({ display: 'none' });
    const [style2, setStyle2] = useState({ display: 'none' });

    const showErrorModal = (show, type, error) => {
        dispatch(setErrorModal(show, type, error))
    };

    const showTransactionSubmitModal = (show, txn) => {
        dispatch(setTxSubmitModal(show, txn))
        setTimeout(() => { dispatch(setTxSubmitModal(false, null)) }, 5000);
    };

    const showTransactionStatusModal = (show, status, msg, hash) => {
        dispatch(setTxStatusModal(show, status, msg, hash))
        setTimeout(() => { dispatch(setTxStatusModal(false, null, null, null)) }, 5000);
    };

    const isValidConnectionForCard = () => {
        if ((trodlStake && (trodlStake._address !== null)) && (accounts && accounts.length > 0) && (web3 !== undefined)) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        async function getUnstakeBalance() {
            if (isValidConnectionForCard()) {
                try {
                    let lockUpPeriod = await trodlStake.methods._lockupPeriod().call({ from: accounts[0] });
                    let userInfo = await trodlStake.methods.getUserRewardInfo(accounts[0]).call({ from: accounts[0] });
                    let unStakeBalance = web3.utils.fromWei(userInfo['unstakedAmount'], 'ether');
                    let block = await web3.eth.getBlock('latest');

                    // console.log("************************************");
                    // console.log(`TimeStamp: ${parseInt (block.timestamp)}`);
                    // console.log(`LockupPeriod: ${parseInt (lockUpPeriod)}`);
                    // console.log(`lastAccountingTimestamp: ${parseInt (userInfo['lastAccountingTimestampSec'])}`);
                    // console.log(`${parseInt (block.timestamp) > ((86400 * parseInt(lockUpPeriod)) + parseInt(userInfo['lastAccountingTimestampSec']))}`)
                    // console.log(`${parseInt (block.timestamp) > ( parseInt(userInfo['lastAccountingTimestampSec']))}`)
                    // console.log("************************************");
                    if (parseInt(block.timestamp) > ((86400 * parseInt(lockUpPeriod)) + parseInt(userInfo['lastAccountingTimestampSec']))) {
                        setLockedTRO('0');
                        setUnlockedTRO(unStakeBalance);
                    } else {
                        setLockedTRO(unStakeBalance);
                        setUnlockedTRO('0');
                    }
                    setUError(null);
                    console.log(userInfo);
                    console.log(block);
                } catch (err) {
                    console.log(`Fetching Unstaked TRO failed. ${err.message}`);
                    setUError(err);
                }
            }
        }
        getUnstakeBalance();
    });

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
            } else {
                let message = `${err.code} : ${err.message}`;
                showErrorModal(true, 'other errror', new Error(message));
            }
        }
    }

    const restakeAll = async () => {
        try {
            if (isValidConnectionForCard()) {
                let tx = await trodlStake.methods.reStake().send({ from: accounts[0] })
                    .on('transactionHash', function (hash) {
                        showTransactionSubmitModal(true, hash);
                    })
                    .on('receipt', function (receipt) {
                        let amount = web3.utils.fromWei(receipt.events.ReStake.returnValues.amount, 'ether');
                        showTransactionStatusModal(true, 'Success', `${amount} TRO Re-Staked Successfully`, receipt.transactionHash);
                        onTransaction();
                    })
                    .on('error', function (err, receipt) {
                        handleError(err, receipt, 'Re-Stake');
                    });
                console.log(tx);
            } else {
                console.log('Validation failed: Connect to Binance Smart Chain');
                showErrorModal(true, 'connect wallet', new Error(''));
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    const withdrawAll = async () => {
        try {
            if (isValidConnectionForCard()) {
                let tx = await trodlStake.methods.withdrawAllTRO().send({ from: accounts[0] })
                    .on('transactionHash', function (hash) {
                        showTransactionSubmitModal(true, hash);
                    })
                    .on('receipt', function (receipt) {
                        let amount = web3.utils.fromWei(receipt.events.Withdraw.returnValues.amount, 'ether');
                        showTransactionStatusModal(true, 'Success', `${amount} TRO Withdrawn Successfully`, receipt.transactionHash);
                        onTransaction();
                    })
                    .on('error', function (err, receipt) {
                        handleError(err, receipt, 'Withdraw');
                    });
                console.log(tx);
            } else {
                console.log('Validation failed: Connect to Binance Smart Chain');
                showErrorModal(true, 'connect wallet', new Error(''));
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    const formatUserLockedTROBalance = () => {
        return formatValue(uError, lockedTRO, 2);
    }

    const formatUserUnlockedTROBalance = () => {
        return formatValue(uError, unlockedTRO, 2);
    }

    return (
        <div className="stake-card-2  ">
            <div className="">
                <div className="flex-d mb-24">
                    <div className="">
                        <img src={stakeIcon} className="idoimg" alt='trodl-logo'></img>
                    </div>
                    <div className="txt-left ml-10">
                        <div className="font-16 semi-bold">Staking status</div>
                        <div className="font-14 color-a8 mt-20">      </div>
                    </div>
                </div>
            </div>
            <div className="txt-left ">
                <div className="flex-d">
                    <div className="w-50">
                        <div className="font-14 color-cf">
                            Locked TRO balance
                        </div>
                        <div className="locked-msg" style={style}>
                            Unstaked TRO balances are locked for 14 days. During lock in period you can only re-invest the amount and can’t withdraw.
                        </div>
                        <div className="font-16 color-a8  w-90">   {formatUserLockedTROBalance()} <i className="fas fa-exclamation-circle exc-fa-2"
                            onMouseEnter={e => {
                                setStyle({ display: 'block' });
                            }}
                            onMouseLeave={e => {
                                setStyle({ display: 'none' })
                            }}></i></div>


                    </div>

                    <div className="border-divide"></div>
                    <div className=" ml-8p">
                        <div className="font-14 color-cf">
                            Unlocked TRO balance
                        </div>
                        <div className="unlocked-msg" style={style2}>
                            Unlocked TRO balances have completed 14 days of lock in period and are available for withdrawal.
                        </div>
                        <div className="font-16 color-a8 w-90">   {formatUserUnlockedTROBalance()} <i className="fas fa-exclamation-circle exc-fa-2"
                            onMouseEnter={e => {
                                setStyle2({ display: 'block' });
                            }}
                            onMouseLeave={e => {
                                setStyle2({ display: 'none' })
                            }}></i></div>


                    </div>



                </div>

                <div className="flex-d  mt-63">
                    <div className="mt-30 marg-c" >
                        <button className="  card-btns" onClick={restakeAll}>
                            Re-Stake</button>
                    </div>

                    <div className="flex-right mt-30 marg-c flex-d">
                        <button className="  card-btns" onClick={withdrawAll}>
                            Withdraw</button>
                    </div>
                </div>

            </div>
        </div >
    );
}

export default TROWithdrawCard;