import React, { useState, useEffect } from 'react';
import config from 'react-global-configuration';
import ErrorModal from '../modals/errorModal';
import TransactionModal from '../modals/transactionModal';
import TransactionSubmitModal from '../modals/transactionSubmitModal';
import { formatValue } from '../../utils/wrappers';
import metaMaskLogo from "../../assets/images/metamask.png";
import { useSelector, useDispatch } from 'react-redux';
import { setErrorModal } from '../../redux/actions/errorModalActions';
import { setTxSubmitModal } from '../../redux/actions/transactionSubmitActions';
import { setTxStatusModal } from '../../redux/actions/transactionStatusActions'
const TROBalanceCard = ({ trodlToken, trodlStake, accounts, web3, onTransaction, showError }) => {
    const dispatch = useDispatch()

    const state = useSelector(state => state.transactionStatusReducers);

    const [TRObalance, setTROBalance] = useState('--');
    const [inputamount, setInputAmount] = useState(0);
    const [buttonState, setButtonState] = useState('Approve');
    const [uError, setUError] = useState(null);

    //ERROR Modal
    // const [show, setShow] = useState(false);
    // const [error, setError] = useState(null);
    // const [type, setType] = useState(null);

    //TX Submit Modal
    // const [txSubmitShow, setTXSubmitShow] = useState(false);
    const [txHash, setTXHash] = useState('');

    //TX Status Modal
    const [txStatusShow, setTXStatusShow] = useState(false);
    const [txStatus, setTXStatus] = useState('');
    const [txMessage, setTXMessage] = useState('');

    const showErrorModal = (show1, type1, error1) => {

        // setShow(true);
        dispatch(setErrorModal(show1, type1, error1.message))
        showError()
    };

    const showTransactionSubmitModal = (show, txn) => {
        // setTXSubmitShow(!txSubmitShow);
        dispatch(setTxSubmitModal(show, txn))
        setTimeout(() => { dispatch(setTxSubmitModal(false, null)) }, 5000);
    };

    const showTransactionStatusModal = (show, status, msg, hash) => {
        console.log(show, status, msg, hash, 'inside hash')

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
            setTXStatus('Failure');

            setTXMessage(`${eventName} Failed`);
            setTXHash(receipt.transactionHash);
            showTransactionStatusModal(true, 'Failure', `${eventName} Failed`, txHash);

        } else {
            if (err.code === 4001) {
                //Ignore User Tx Reject
            } else if (err.code && (err.code !== 0)) {
                let message = `${err.code} : ${err.message}`;
                // setError(new Error(message));
                // setType('other errror')
                showErrorModal(true, 'other errror', new Error(message));
            }
        }
    }

    const approveTROForStaking = async () => {
        try {
            if (isValidConnectionForCard()) {
                if (inputamount <= 0) {
                    console.log('Input Validation failed: Value should be greater than ZERO');
                    // setError(new Error('Value should be greater than ZERO'));
                    // setType('other errror')

                    showErrorModal(true, new Error('Value should be greater than ZERO'), 'other errror');
                } else {
                    let amount = web3.utils.toWei(inputamount, 'ether');
                    let tx = await trodlToken.methods.approve(trodlStake._address, amount).send({ from: accounts[0] })
                        .on('transactionHash', function (hash) {
                            setTXHash(hash);
                            showTransactionSubmitModal(true, hash);
                        })
                        .on('receipt', function (receipt) {
                            setTXStatus('Success');

                            let amt = web3.utils.fromWei(receipt.events.Approval.returnValues.value, 'ether');
                            setTXMessage(`${amt} TRO Approved Successfully`);
                            setButtonState('Stake');
                            showTransactionStatusModal(true, 'Success', `${amt} TRO Approved Successfully`, txHash);

                            onTransaction();
                        })
                        .on('error', function (err, receipt) {
                            handleError(err, receipt, 'Approve');
                        });
                    console.log(tx);
                }
            } else {
                console.log('Validation failed: Connect to Binance Smart Chain');
                // setError(new Error('Connect to Binance Smart Chain'));
                // setType('connect wallet')
                showErrorModal(true, 'connect wallet', new Error('Connect to Binance Smart Chain'));

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
                    // setError(new Error('Value should be greater than ZERO'));
                    // setType('other errror')

                    showErrorModal(true, 'other errror', new Error('Value should be greater than ZERO'));
                } else {
                    let amount = web3.utils.toWei(inputamount, 'ether');
                    let tx = await trodlStake.methods.stake(amount).send({ from: accounts[0] })
                        .on('transactionHash', function (hash) {
                            setTXHash(hash);
                            showTransactionSubmitModal(true, hash);
                        })
                        .on('receipt', function (receipt) {
                            setTXStatus('Success');

                            let amt = web3.utils.fromWei(receipt.events.Staked.returnValues.amount, 'ether');
                            setTXMessage(`${amt} TRO Staked Successfully`);
                            setButtonState('Approve');
                            showTransactionStatusModal(true, 'Success', `${amt} TRO Staked Successfully`, txHash);

                            onTransaction();
                        })
                        .on('error', function (err, receipt) {
                            handleError(err, receipt, 'Stake');
                        });
                    console.log(tx);
                }
            } else {
                console.log('Validation failed: Connect to Binance Smart Chain');
                // setError(new Error('Connect to Binance Smart Chain'));
                // setType('connect wallet')
                showErrorModal(true, 'connect wallet', new Error('Connect to Binance Smart Chain'));
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

    // const processTransactionMessage = () => {
    //     return (
    //         <div>
    //             <div>
    //                 {/* <span> {`${txStatus}: `} </span> */}
    //                 <span> {txMessage} </span>
    //                 <a rel="noreferrer" href={`${config.get('link')}/tx/${txHash}`} target="_blank" ><i class="fas fa-external-link-alt  m-link"></i> </a>

    //             </div>
    //         </div >
    //     );
    // }

    return (
        <div className="stake-card-1 ">
            {/* {error ?
                <ErrorModal onClose={showErrorModal} show={show} type={type}>
                    {`${error.message}`}
                </ErrorModal> : null
            } */}

            {/* {txHash ?
                <TransactionSubmitModal onClose={showTransactionSubmitModal} show={txSubmitShow}>
                    <a rel="noreferrer" href={`${config.get('link')}/tx/${txHash}`} target="_blank" >
                        <button class="bscScan-btn">
                            View on bscscan.com <i class="fas fa-external-link-alt  m-link"></i>
                        </button>
                    </a>
                    {/* <a rel="noreferrer" href={`https://testnet.bscscan.com/tx/${txHash}`} target="_blank" >View Transaction on BSC</a> */}
            {/* </TransactionSubmitModal > : null } */}

            {/* 
            {
                txStatus !== '' ?
                    <TransactionModal onClose={showTransactionStatusModal} show={txStatusShow} type={txStatus}>
                        {processTransactionMessage()}
                    </TransactionModal> : null
            } */}
            <div className="">
                <div className="flex-d mb-24">
                    <div className="">
                        <img src={metaMaskLogo} className="idoimg" alt='trodl-logo'></img>

                    </div>
                    <div className="txt-left ml-10">
                        <div className="font-16 semi-bold">Metamask details</div>
                        <div className="font-14 color-a8">12 th Nov '21</div>

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