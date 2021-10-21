import React, { useState, useEffect } from 'react';
import config from 'react-global-configuration';
import ErrorModal from '../modals/errorModal';
import TransactionModal from '../modals/transactionModal';
import TransactionSubmitModal from '../modals/transactionSubmitModal';
import useRecursiveTimeout from '../../utils/useRecursiveTimeout';
import { formatValue } from '../../utils/wrappers';

const XTRORewardCard = ({ trodlStake, accounts, web3, onTransaction }) => {
    const [xTROBalance, setXTROBalance] = useState('--');
    const [stakedTRO, setStakedTRO] = useState('--');
    const [xTROError, setxTROError] = useState(null);
    const [sTROError, setsTROError] = useState(null);
    // Error Modal
    const [show, setShow] = useState(false)
    const [error, setError] = useState(null)
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
            setTXStatus('Failure');
            setTXMessage(`${eventName} Failed`);
            setTXHash(receipt.transactionHash);
            showTransactionStatusModal();
        } else {
            if (err.code === 4001) {
                //Ignore User Tx Reject
            } else {
                let message = `${err.code} : ${err.message}`;
                setError(new Error(message));
                setType('other errror')

                showErrorModal();
            }
        }
    }

    const unstakeAll = async () => {
        try {
            if (isValidConnectionForCard()) {
                let tx = await trodlStake.methods.unstakeAll().send({ from: accounts[0] })
                    .on('transactionHash', function (hash) {
                        setTXHash(hash);
                        showTransactionSubmitModal();
                    })
                    .on('receipt', function (receipt) {
                        setTXStatus('Success');
                        let amount = web3.utils.fromWei(receipt.events.Unstaked.returnValues.amount, 'ether');
                        setTXMessage(`UnStaked ${amount} TRO from Trodl Stake`);
                        showTransactionStatusModal();
                        onTransaction();
                    })
                    .on('error', function (err, receipt) {
                        handleError(err, receipt, 'Unstake');
                    });
                console.log(tx);
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

    const formatUserXTROBalance = () => {
        return formatValue(xTROError, xTROBalance, 4)
    }

    const formatUserStakedTROBalance = () => {
        return formatValue(sTROError, stakedTRO, 2);
    }

    const processTransactionMessage = () => {
        return (
            <div>
                <div>
                    {/* <span> {`${txStatus}: `} </span> */}
                    <span> {txMessage} {txStatus == 'Success' ? 'Successfully' : null} </span>
                    <a rel="noreferrer" href={`${config.get('link')}/tx/${txHash}`} target="_blank" ><i class="fas fa-external-link-alt  m-link"></i> </a>

                </div>
            </div >
        );
    }

    return (
        <div className="col-3 card-sec card-height2" >
            {error ?
                <ErrorModal onClose={showErrorModal} show={show} type={type} >
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
                Earned xTRO
            </div>
            <div className="col-theme">
                {formatUserXTROBalance()}
            </div>
            <div className="borderDark"> </div>
            <div className="mtb18 mt-30">
                Staked TRO
            </div>
            <div className="col-theme">
                {formatUserStakedTROBalance()}
            </div>
            <div className="mt-30">
                <button className="  card-btns" onClick={unstakeAll}>
                    Unstake
                </button>
            </div>
        </div >
    );
}

export default XTRORewardCard;