import React, { useState, useEffect } from 'react';
import ErrorModal from '../modals/errorModal';
import useRecursiveTimeout from '../../utils/useRecursiveTimeout';
import { formatValue } from '../../utils/wrappers';

const XTRORewardCard = ({ trodlStake, accounts, web3, onTransaction }) => {
    const [xTROBalance, setXTROBalance] = useState('--');
    const [stakedTRO, setStakedTRO] = useState('--');
    const [xTROError, setxTROError] = useState(null);
    const [sTROError, setsTROError] = useState(null);
    const [show, setShow] = useState(false)
    const [error, setError] = useState(null)

    const isValidConnectionForCard = () => {
        if( (trodlStake && (trodlStake._address !== null)) && (accounts && accounts.length > 0) && (web3 !== undefined)){
            return true;
        }else {
            return false;
        }
    }
    
    const showErrorModal = () => {
        setShow( !show );
    };
    
    async function getUserXTROBalance() {
        if (isValidConnectionForCard()) {
            try{
                let xTROBalance = await trodlStake.methods.getxTROBalance(accounts[0]).call({from: accounts[0]});
                xTROBalance = web3.utils.fromWei(xTROBalance,'ether');
                setXTROBalance(xTROBalance);
                setxTROError(null);
                // DEBUG_LOG
            } catch (err) {
                console.log(err);
                //PROD_LOG
                setxTROError(err);
            }
        }
    }

    useEffect(()=>{
        getUserXTROBalance();
    });

    useRecursiveTimeout(() => {
        getUserXTROBalance();
    }, 10000);

    useEffect(()=>{
        async function getUserTROStaked(){
            if (isValidConnectionForCard()) {
                try{
                    let stakedTROBalance = await trodlStake.methods.getStakedTROBalance().call({from: accounts[0]});
                    stakedTROBalance = web3.utils.fromWei(stakedTROBalance,'ether');
                    setStakedTRO(stakedTROBalance);
                    setsTROError(null);
                    //DEBUG_LOG
                } catch (err) {
                    console.log(err);
                    //PROD_LOG
                    setsTROError(err);
                }
            }
        }
        getUserTROStaked();
    });

    const unstakeAll = async () => {
        try {
        	if (isValidConnectionForCard()) {
                let tx = await trodlStake.methods.unstakeAll().send({ from: accounts[0] });
                //Sudeep : Show Some Kind of UI notification
                console.log(tx);
                onTransaction();
                //DEBUG_LOG
        	} else {
                //PROD_LOG
                setError( new Error('Connect to Binance Smart Chain'));
                showErrorModal();
            }
        } catch (err) {
            console.log(err);
            //PROD_LOG
            // throw err;
            setError(err);
            showErrorModal();
		}
    }

    const formatUserXTROBalance = () => {
        return formatValue(xTROError, xTROBalance, 4)
    }

    const formatUserStakedTROBalance = () => {
        return formatValue(sTROError, stakedTRO, 2);
    }

    return (
        <div className="col-3 card-sec card-height2" >
            {error ?
                <ErrorModal onClose={showErrorModal} show={show} >
                    {`${error.message}`}
				</ErrorModal> : null
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
        </div>
    );
}

export default XTRORewardCard;