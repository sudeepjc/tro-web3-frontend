import React, { useState, useEffect } from 'react';
import useRecursiveTimeout from '../../utils/useRecursiveTimeout';
import { formatValue } from '../../utils/wrappers';
import TROicon from "../../assets/images/TROicon.png";
import { useDispatch } from 'react-redux';
import { setErrorModal } from '../../redux/actions/errorModalActions';
import { setTxSubmitModal } from '../../redux/actions/transactionSubmitActions';
import { setTxStatusModal } from '../../redux/actions/transactionStatusActions'

const XTRORewardCard = ({ trodlStake, accounts, web3, onTransaction }) => {
    const dispatch = useDispatch()

    const [xTROBalance, setXTROBalance] = useState('--');
    const [stakedTRO, setStakedTRO] = useState('--');
    const [xTROError, setxTROError] = useState(null);
    const [sTROError, setsTROError] = useState(null);

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

    async function getUserXTROBalance() {
        if (isValidConnectionForCard()) {
            try {
                let xTROBalance = await trodlStake.methods.getxTROBalance(accounts[0]).call({ from: accounts[0] });
                xTROBalance = web3.utils.fromWei(xTROBalance, 'ether');
                setXTROBalance(xTROBalance);
                setxTROError(null);
                console.log(`xTRO balance for ${accounts[0]} : ${xTROBalance}`);
            } catch (err) {
                console.log(`Fetching xTRO balance for ${accounts[0]} failed. ${err.message}`);
                setxTROError(err);
            }
        }
    }

    useEffect(() => {
        getUserXTROBalance();
    });

    useRecursiveTimeout(() => {
        getUserXTROBalance();
    }, 10000);

    useEffect(() => {
        async function getUserTROStaked() {
            if (isValidConnectionForCard()) {
                try {
                    let stakedTROBalance = await trodlStake.methods.getStakedTROBalance().call({ from: accounts[0] });
                    stakedTROBalance = web3.utils.fromWei(stakedTROBalance, 'ether');
                    setStakedTRO(stakedTROBalance);
                    setsTROError(null);
                    console.log(`Staked TRO balance for ${accounts[0]} : ${stakedTROBalance}`);
                } catch (err) {
                    console.log(`Fetching staked TRO balance for ${accounts[0]} failed. ${err.message}`);
                    setsTROError(err);
                }
            }
        }
        getUserTROStaked();
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
                showErrorModal(true, 'other error', new Error(message));
            }
        }
    }

    const unstakeAll = async () => {
        try {
            if (isValidConnectionForCard()) {
                let tx = await trodlStake.methods.unstakeAll().send({ from: accounts[0] })
                    .on('transactionHash', function (hash) {
                        showTransactionSubmitModal(true, hash);
                    })
                    .on('receipt', function (receipt) {
                        let amount = web3.utils.fromWei(receipt.events.Unstaked.returnValues.amount, 'ether');
                        showTransactionStatusModal(true, 'Success', `${amount} TRO Unstaked Successfully`, receipt.transactionHash);
                        onTransaction();
                    })
                    .on('error', function (err, receipt) {
                        handleError(err, receipt, 'Unstake');
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

    const formatUserXTROBalance = () => {
        return formatValue(xTROError, xTROBalance, 4)
    }

    const formatUserStakedTROBalance = () => {
        return formatValue(sTROError, stakedTRO, 2);
    }

    return (
        <div className="stake-card-1  " >
            <div className="">
                <div className="flex-d mb-24">
                    <div className="">
                        <img src={TROicon} className="idoimg" alt='trodl-logo'></img>
                    </div>
                    <div className="txt-left ml-10">
                        <div className="font-16 semi-bold">Staking rewards</div>
                        {/* <div className="font-14 color-a8">12 th Nov '21</div> */}
                    </div>
                </div>
            </div>
            <div className="txt-left ">
                <div className="flex-d">
                    <div>
                        <div className="font-14 color-cf"> Earned xTRO</div>
                        <div className="font-16 color-a8 ">   {formatUserXTROBalance()}</div>
                    </div>
                    <div className=" ml-25p">
                        <div className="font-14 color-cf">   Staked TRO</div>
                        <div className="font-16 color-a8 ">   {formatUserStakedTROBalance()}</div>
                    </div>
                </div>
                <div className="flex-d mt-30">
                    <button className="  card-btns" onClick={unstakeAll}> Unstake</button>
                </div>
            </div>
        </div >
    );
}

export default XTRORewardCard;