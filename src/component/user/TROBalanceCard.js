import React, { useState, useEffect } from 'react';
import { formatValue } from '../../utils/wrappers';
import metaMaskLogo from "../../assets/images/metamask.png";
import { useDispatch } from 'react-redux';
import { setErrorModal } from '../../redux/actions/errorModalActions';
import { setTxSubmitModal } from '../../redux/actions/transactionSubmitActions';
import { setTxStatusModal } from '../../redux/actions/transactionStatusActions';

const TROBalanceCard = ({ trodlToken, trodlStake, accounts, web3, onTransaction }) => {
    const dispatch = useDispatch();

    const [TRObalance, setTROBalance] = useState('--');
    const [inputamount, setInputAmount] = useState(0);
    const [buttonState, setButtonState] = useState('Approve');
    const [uError, setUError] = useState(null);

    const showErrorModal = (show, type, error) => {
        dispatch(setErrorModal(show, type, error.message));
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
        if ((trodlToken && (trodlToken._address !== null)) && (trodlStake && (trodlStake._address !== null)) && (accounts && accounts.length > 0) && (web3 !== undefined)) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        async function getUserTROBalance() {
            if (isValidConnectionForCard()) {
                try {
                    let balance = await trodlToken.methods.balanceOf(accounts[0]).call({ from: accounts[0] });
                    balance = web3.utils.fromWei(balance, 'ether');
                    setTROBalance(balance);
                    setUError(null);
                    console.log(`TRO balance for ${accounts[0]} : ${balance}`);
                } catch (err) {
                    console.log(`Fetching TRO balance for ${accounts[0]} failed. ${err.message}`);
                    setUError(err);
                }
            }
        }
        getUserTROBalance();
    });

    useEffect(() => {
        async function getAllowance() {
            if (isValidConnectionForCard()) {
                try {
                    let allowance = await trodlToken.methods.allowance(accounts[0], trodlStake._address).call({ from: accounts[0] });
                    allowance = web3.utils.fromWei(allowance, 'ether');
                    if (parseFloat(allowance) >= inputamount) {
                        setButtonState('Stake');
                    } else {
                        setButtonState('Approve');
                    }
                    console.log(`TRO allowance for ${accounts[0]} : ${allowance}`);
                } catch (err) {
                    console.log(`Fetching TRO allowance for ${accounts[0]} failed. ${err.message}`);
                }
            }
        }
        getAllowance();
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
            } else if (err.code && (err.code !== 0)) {
                let message = `${err.code} : ${err.message}`;
                showErrorModal(true, 'other error', new Error(message));
            }
        }
    }

    const approveTROForStaking = async () => {
        try {
            if (isValidConnectionForCard()) {
                if (inputamount <= 0) {
                    console.log('Input Validation failed: Value should be greater than ZERO');
                    showErrorModal(true, 'other error', new Error('Value should be greater than ZERO') );
                } else {
                    let amount = web3.utils.toWei(inputamount, 'ether');
                    let tx = await trodlToken.methods.approve(trodlStake._address, amount).send({ from: accounts[0] })
                        .on('transactionHash', function (hash) {
                            showTransactionSubmitModal(true, hash);
                        })
                        .on('receipt', function (receipt) {
                            let amt = web3.utils.fromWei(receipt.events.Approval.returnValues.value, 'ether');
                            setButtonState('Stake');
                            showTransactionStatusModal(true, 'Success', `${amt} TRO Approved Successfully`, receipt.transactionHash);
                            onTransaction();
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

    const stakeTRO = async () => {
        try {
            if (isValidConnectionForCard()) {
                if (inputamount <= 0) {
                    console.log('Input Validation failed: Value should be greater than ZERO');
                    showErrorModal(true, 'other error', new Error('Value should be greater than ZERO'));
                } else {
                    let amount = web3.utils.toWei(inputamount, 'ether');
                    let tx = await trodlStake.methods.stake(amount).send({ from: accounts[0] })
                        .on('transactionHash', function (hash) {
                            showTransactionSubmitModal(true, hash);
                        })
                        .on('receipt', function (receipt) {
                            let amt = web3.utils.fromWei(receipt.events.Staked.returnValues.amount, 'ether');
                            setButtonState('Approve');
                            showTransactionStatusModal(true, 'Success', `${amt} TRO Staked Successfully`, receipt.transactionHash);
                            onTransaction();
                        })
                        .on('error', function (err, receipt) {
                            handleError(err, receipt, 'Stake');
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

    const approveAndStake = async () => {
        if (buttonState === 'Approve') {
            approveTROForStaking();
        } else if (buttonState === 'Stake') {
            stakeTRO();
        }
    }

    const onValueChange = (event) => {
        setInputAmount(event.target.value);
    }

    const formatUserTROBalance = () => {
        return formatValue(uError, TRObalance, 2);
    }

    return (
        <div className="stake-card-1 ">
            <div className="">
                <div className="flex-d mb-24">
                    <div className="">
                        <img src={metaMaskLogo} className="idoimg" alt='trodl-logo'></img>
                    </div>
                    <div className="txt-left ml-10">
                        <div className="font-16 semi-bold">Metamask details</div>
                        {/* <div className="font-14 color-a8">12 th Nov '21</div> */}
                    </div>
                </div>
            </div>
            <div className="txt-left ">
                <div className="font-14 color-cf"> Available TRO Balance</div>
                <div className="font-16 color-a8 "> {formatUserTROBalance()}</div>
                <div className="flex-d mt-30">
                    <input className="input-cls color-cf font-14" type="number" placeholder="Amount to be staked" onChange={onValueChange}></input>
                    <button className=" ml-10 card-btns" onClick={approveAndStake}>
                        {buttonState}
                    </button>
                </div>
            </div>
        </div >
    );
}

export default TROBalanceCard;