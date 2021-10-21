import React, { useState, useEffect } from 'react';
import config from 'react-global-configuration';
import ErrorModal from '../modals/errorModal';
import TransactionModal from '../modals/transactionModal';
import TransactionSubmitModal from '../modals/transactionSubmitModal';
import { formatValue } from '../../utils/wrappers';

const TROBalanceCard = ({ trodlToken, trodlStake, accounts, web3, onTransaction }) => {
    const [TRObalance, setTROBalance] = useState('--');
    const [inputamount, setInputAmount] = useState(0);
    const [buttonState, setButtonState] = useState('Approve');
    const [uError, setUError] = useState(null);

    //ERROR Modal
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    const [type, setType] = useState(null);

    //TX Submit Modal
    const [txSubmitShow, setTXSubmitShow] = useState(false);
    const [txHash, setTXHash] = useState('');

    //TX Status Modal
    const [txStatusShow, setTXStatusShow] = useState(false);
    const [txStatus, setTXStatus] = useState('');
    const [txMessage, setTXMessage] = useState('');

    const showErrorModal = () => {
        setShow(!show);
    };

    const showTransactionSubmitModal = () => {
        setTXSubmitShow(!txSubmitShow);
        setTimeout(() => { setTXSubmitShow(false); }, 5000);

    };

    const showTransactionStatusModal = () => {
        setTXStatusShow(!txStatusShow);
        setTimeout(() => { setTXStatusShow(false) }, 5000);

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
            showTransactionStatusModal();

        } else {
            if (err.code === 4001) {
                //Ignore User Tx Reject
            } else if (err.code && (err.code !== 0)) {
                let message = `${err.code} : ${err.message}`;
                setError(new Error(message));
                setType('other errror')
                showErrorModal();
            }
        }
    }

    const approveTROForStaking = async () => {
        try {
            if (isValidConnectionForCard()) {
                if (inputamount <= 0) {
                    console.log('Input Validation failed: Value should be greater than ZERO');
                    setError(new Error('Value should be greater than ZERO'));
                    setType('other errror')

                    showErrorModal();
                } else {
                    let amount = web3.utils.toWei(inputamount, 'ether');
                    let tx = await trodlToken.methods.approve(trodlStake._address, amount).send({ from: accounts[0] })
                        .on('transactionHash', function (hash) {
                            setTXHash(hash);
                            showTransactionSubmitModal();
                        })
                        .on('receipt', function (receipt) {
                            setTXStatus('Success');

                            let amt = web3.utils.fromWei(receipt.events.Approval.returnValues.value, 'ether');
                            setTXMessage(`${amt} TRO Approved Successfully`);
                            setButtonState('Stake');
                            showTransactionStatusModal();

                            onTransaction();
                        })
                        .on('error', function (err, receipt) {
                            handleError(err, receipt, 'Approve');
                        });
                    console.log(tx);
                }
            } else {
                console.log('Validation failed: Connect to Binance Smart Chain');
                setError(new Error('Connect to Binance Smart Chain'));
                setType('connect wallet')
                showErrorModal();
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
                    setError(new Error('Value should be greater than ZERO'));
                    setType('other errror')

                    showErrorModal();
                } else {
                    let amount = web3.utils.toWei(inputamount, 'ether');
                    let tx = await trodlStake.methods.stake(amount).send({ from: accounts[0] })
                        .on('transactionHash', function (hash) {
                            setTXHash(hash);
                            showTransactionSubmitModal();
                        })
                        .on('receipt', function (receipt) {
                            setTXStatus('Success');

                            let amt = web3.utils.fromWei(receipt.events.Staked.returnValues.amount, 'ether');
                            setTXMessage(`${amt} TRO Staked Successfully`);
                            setButtonState('Approve');
                            showTransactionStatusModal();

                            onTransaction();
                        })
                        .on('error', function (err, receipt) {
                            handleError(err, receipt, 'Stake');
                        });
                    console.log(tx);
                }
            } else {
                console.log('Validation failed: Connect to Binance Smart Chain');
                setError(new Error('Connect to Binance Smart Chain'));
                setType('connect wallet')
                showErrorModal();
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

    const processTransactionMessage = () => {
        return (
            <div>
                <div>
                    {/* <span> {`${txStatus}: `} </span> */}
                    <span> {txMessage} </span>
                    <a rel="noreferrer" href={`${config.get('link')}/tx/${txHash}`} target="_blank" ><i class="fas fa-external-link-alt  m-link"></i> </a>

                </div>
            </div >
        );
    }

    return (
        <div className="col-3 card-sec card-height2">
            {error ?
                <ErrorModal onClose={showErrorModal} show={show} type={type}>
                    {`${error.message}`}
                </ErrorModal> : null
            }
            {txHash ?
                <TransactionSubmitModal onClose={showTransactionSubmitModal} show={txSubmitShow}>
                    <a rel="noreferrer" href={`${config.get('link')}/tx/${txHash}`} target="_blank" >
                        <button class="bscScan-btn">
                            View on bscscan.com <i class="fas fa-external-link-alt  m-link"></i>
                        </button>
                    </a>
                    {/* <a rel="noreferrer" href={`https://testnet.bscscan.com/tx/${txHash}`} target="_blank" >View Transaction on BSC</a> */}
                </TransactionSubmitModal > : null
            }
            {
                txStatus !== '' ?
                    <TransactionModal onClose={showTransactionStatusModal} show={txStatusShow} type={txStatus}>
                        {processTransactionMessage()}
                    </TransactionModal> : null
            }
            <div className="mtb18 mt-50">
                Available TRO Balance
            </div>
            <div className="col-theme">
                {formatUserTROBalance()}
            </div>
            <div className="borderDark"> </div>
            <div className="mt-60">
                <input className="input-cls" type="number" onChange={onValueChange}></input>
            </div>
            <div>
                <button className=" mt-30 card-btns" onClick={approveAndStake}>
                    {buttonState}
                </button>
            </div>
        </div >
    );
}

export default TROBalanceCard;