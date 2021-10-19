import React, { useState, useEffect } from 'react';
import ErrorModal from '../modals/errorModal';
// import TransactionModal from '../modals/transactionModal';
import {formatValue} from '../../utils/wrappers';

const TROWithdrawCard = ({ trodlStake, accounts, web3 }) => {
    const [lockedTRO, setLockedTRO] = useState('--');
    const [unlockedTRO, setUnlockedTRO] = useState('--');
    const [uError, setUError] = useState(null);
    const [error, setError] = useState(null)
    const [show, setShow] = useState(false)

    const showModal = () => {
        setShow( !show );
    };
    
    const isValidConnectionForCard = () => {
        if( (trodlStake && (trodlStake._address !== null)) && (accounts && accounts.length > 0) && (web3 !== undefined)){
            return true;
        }else {
            return false;
        }
    }
    
    useEffect(() => {
        async function getUnstakeBalance() {
            if (isValidConnectionForCard()) {
                try {
                    let lockUpPeriod = await trodlStake.methods._lockupPeriod().call({from: accounts[0]});
                    let userInfo = await trodlStake.methods.getUserRewardInfo(accounts[0]).call({from: accounts[0]});
                    let unStakeBalance = web3.utils.fromWei(userInfo['unstakedAmount'],'ether');
                    let block = await web3.eth.getBlock('latest');
                    if (block.timestamp > ((86400 * lockUpPeriod) + userInfo['lastAccountingTimestampSec'])){
                        setLockedTRO('0');
                        setUnlockedTRO(unStakeBalance);
                    } else {
                        setLockedTRO(unStakeBalance);
                        setUnlockedTRO('0');
                    }
                    setUError(null);
                    //DEBUG_LOG
                } catch (err) {
                    console.log(err);
                    //PROD_LOG
                    setUError(err);
                }
            }
        }
        getUnstakeBalance();
    });

    const restakeAll = async () => {
        try{
            if (isValidConnectionForCard()) {
                let tx = await trodlStake.methods.reStake().send({from: accounts[0]});
                //Sudeep : Show Some Kind of UI notification
                console.log(tx);
                //DEBUG_LOG
            } else {
                //PROD_LOG
                setError( new Error('Connect to Binance Smart Chain'));
                showModal();
            }
        } catch (err) {
            console.log(err);
            //PROD_LOG
            setError(err);
            showModal();
            //throw err;
        }
    }

    const withdrawAll = async () => {

        try{
            if (isValidConnectionForCard()) {
                let tx = await trodlStake.methods.withdrawAllTRO().send({from: accounts[0]});
                //Sudeep : Show Some Kind of UI notification
                console.log(tx);
                //DEBUG_LOG
            } else {
                //PROD_LOG
                setError( new Error('Connect to Binance Smart Chain'));
                showModal();
            }
        } catch (err) {
            console.log(err);
            //PROD_LOG
            setError(err);
            showModal();
		}
    }

    const formatUserLockedTROBalance = () => {
        return formatValue(uError, lockedTRO, 2);
    }

    const formatUserUnlockedTROBalance = () => {
        return formatValue(uError, unlockedTRO, 2 );
    }

    return (
        <div className="col-3 card-sec card-height2">
            {error ?
                <ErrorModal onClose={showModal} show={show}>
                    {`${error.message}`}
                </ErrorModal> : null
            }
            <div className="mtb18 mt-36">
                Locked TRO balance
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
                Unlocked TRO balance
            </div>
            <div className="col-theme mtb18">
                {formatUserUnlockedTROBalance()}
            </div>
            <div className="mt-30">
                <button className="card-btns padimp" onClick={withdrawAll}>
                    Withdraw
                </button>
            </div>
        </div>
    );
}

export default TROWithdrawCard;