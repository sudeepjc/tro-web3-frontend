import React, { useState, useEffect } from 'react';
import config from 'react-global-configuration';
import ErrorModal from '../modals/errorModal';
import TransactionModal from '../modals/transactionModal';
import TransactionSubmitModal from '../modals/transactionSubmitModal';
import { formatValue } from '../../utils/wrappers';

const TROWithdrawCard = ({ trodlStake, accounts, web3, onTransaction }) => {
    const [lockedTRO, setLockedTRO] = useState('--');
    const [unlockedTRO, setUnlockedTRO] = useState('--');
    const [uError, setUError] = useState(null);
    // Error Modal
    const [error, setError] = useState(null)
    const [show, setShow] = useState(false)
    const [type, setType] = useState(null);

    //TX Submit Modal
    const [txSubmitShow, setTXSubmitShow] = useState(false);
    const [txHash, setTXHash] = useState('');

    //TX Status Modal
    const [txStatusShow, setTXStatusShow] = useState(false);
    const [txStatus, setTXStatus] = useState('');
    const [txMessage, setTXMessage] = useState('');

    const [style, setStyle] = useState({ display: 'none' });
    const [style2, setStyle2] = useState({ display: 'none' });

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

    useEffect(() => {
        async function getUnstakeBalance() {
            if (isValidConnectionForCard()) {
                try {
                    let lockUpPeriod = await trodlStake.methods._lockupPeriod().call({ from: accounts[0] });
                    let userInfo = await trodlStake.methods.getUserRewardInfo(accounts[0]).call({ from: accounts[0] });
                    let unStakeBalance = web3.utils.fromWei(userInfo['unstakedAmount'], 'ether');
                    let block = await web3.eth.getBlock('latest');
                    if (block.timestamp > ((86400 * lockUpPeriod) + userInfo['lastAccountingTimestampSec'])) {
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

    const restakeAll = async () => {
        try {
            if (isValidConnectionForCard()) {
                let tx = await trodlStake.methods.reStake().send({ from: accounts[0] })
                    .on('transactionHash', function (hash) {
                        setTXHash(hash);
                        showTransactionSubmitModal();
                    })
                    .on('receipt', function (receipt) {
                        setTXStatus('Success');
                        let amount = web3.utils.fromWei(receipt.events.ReStake.returnValues.amount, 'ether');
                        setTXMessage(`${amount} TRO Re-Staked Successfully`);
                        showTransactionStatusModal();
                        setTimeout(() => { setTXStatusShow(false) }, 5000);
                        onTransaction();
                    })
                    .on('error', function (err, receipt) {
                        handleError(err, receipt, 'Re-Stake');
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

    const withdrawAll = async () => {
        try {
            if (isValidConnectionForCard()) {
                let tx = await trodlStake.methods.withdrawAllTRO().send({ from: accounts[0] })
                    .on('transactionHash', function (hash) {
                        setTXHash(hash);
                        showTransactionSubmitModal();
                    })
                    .on('receipt', function (receipt) {
                        setTXStatus('Success');
                        let amount = web3.utils.fromWei(receipt.events.Withdraw.returnValues.amount, 'ether');
                        setTXMessage(`${amount} TRO Withdrawn Successfully`);
                        showTransactionStatusModal();
                        onTransaction();
                    })
                    .on('error', function (err, receipt) {
                        handleError(err, receipt, 'Withdraw');
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

    const formatUserLockedTROBalance = () => {
        return formatValue(uError, lockedTRO, 2);
    }

    const formatUserUnlockedTROBalance = () => {
        return formatValue(uError, unlockedTRO, 2);
    }

    const processTransactionMessage = () => {
        return (
            <div>
                <div>
                    {/* <span> {`${txStatus}: `} </span> */}
                    <span> {txMessage} </span>
                    <a rel="noreferrer" href={`${config.get('link')}/tx/${txHash}`} target="_blank" ><i class="fas fa-external-link-alt  m-link"></i> </a>

                </div>
            </div>
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
                            View on bscscan.com <i class="fas fa-external-link-alt m-link  m-link"></i>
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
            <div className="mtb18 mt-36">
                Locked TRO balance <i class="fas fa-exclamation-circle exc-fa-2"
                    onMouseEnter={e => {
                        setStyle({ display: 'block' });
                    }}
                    onMouseLeave={e => {
                        setStyle({ display: 'none' })
                    }}></i>
            </div>
            <div className="locked-msg" style={style}>
                Unstaked TRO balances are locked for 14 days. During lock in period you can only re-invest the amount and can’t withdraw.
            </div>

            <div className="col-theme mtb18 ">
                {formatUserLockedTROBalance()}
            </div>
            <div >
                <button className="card-btns padimp" onClick={restakeAll}>
                    Re-Stake
                </button>
            </div>
            <div className="mtb18 mt-30">
                Unlocked TRO balance<i class="fas fa-exclamation-circle exc-fa-2"
                    onMouseEnter={e => {
                        setStyle2({ display: 'block' });
                    }}
                    onMouseLeave={e => {
                        setStyle2({ display: 'none' })
                    }}></i>
            </div>
            <div className="unlocked-msg" style={style2}>
                Unlocked TRO balances have completed 14 days of lock in period and are available for withdrawal.
            </div>
            <div className="col-theme mtb18">
                {formatUserUnlockedTROBalance()}
            </div>
            <div className="mt-30">
                <button className="card-btns padimp" onClick={withdrawAll}>
                    Withdraw
                </button>
            </div>
        </div >
    );
}

export default TROWithdrawCard;