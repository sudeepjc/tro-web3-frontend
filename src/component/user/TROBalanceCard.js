import React, { useState, useEffect } from 'react';
import ErrorModal from '../modals/errorModal';
import { formatValue } from '../../utils/wrappers';

const TROBalanceCard = ({ trodlToken, trodlStake, accounts, web3, onTransaction }) => {
	const [TRObalance, setTROBalance] = useState('--');
    const [inputamount, setInputAmount] = useState(0);
    const [buttonState, setButtonState] = useState('Approve');
    const [uError, setUError] = useState(null);
    
    //ERROR Modal
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);

    //TX Modal
    // const [txShow, setTXShow] = useState(false);
    // const [status, setStatus] = useState('');
    // const [content, setContent] = useState('');

	const isValidConnectionForCard = () => {
        if( (trodlToken && (trodlToken._address !== null)) && (trodlStake && (trodlStake._address !== null)) && (accounts && accounts.length > 0) && (web3 !== undefined)){
            return true;
        } else {
            return false;
        }
    }

    const showErrorModal = () => {
        setShow(!show);
    };
    
    useEffect(()=>{
        async function getUserTROBalance(){
            if (isValidConnectionForCard()) {
                try{
                    let balance = await trodlToken.methods.balanceOf(accounts[0]).call({from: accounts[0]});
                    balance = web3.utils.fromWei(balance,'ether');
                    setTROBalance(balance);
                    setUError(null);
                    //DEBUG_LOG
                } catch (err) {
                    console.log(err);
                    setUError(err);
                    //PROD_LOG
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
                    if (allowance > 0) {
                        if (allowance >= inputamount) {
                            setButtonState('Stake');
                        } else {
                            setButtonState('Approve');
                        }
                    }
                    //DEBUG_LOG
                } catch (err) {
                    console.log(err);
                    //PROD_LOG
                }
            }
        }
        getAllowance();
    });

    const approveTROForStaking = async () => {
        try{
            if(isValidConnectionForCard()){
                let amount = web3.utils.toWei(inputamount,'ether');
                let tx = await trodlToken.methods.approve(trodlStake._address, amount).send({from: accounts[0]});
                //Sudeep : Show Some Kind of UI notification
                console.log(tx);
                setButtonState('Stake');
                //DEBUG_LOG
            }else{
                //PROD_LOG
                setError( new Error('Connect to Binance Smart Chain'));
                showErrorModal();
            }
        } catch (err) {
            console.log(err);
            //PROD_LOG
            //throw err;
            setError(err);
            showErrorModal();
        }
    }

    const stakeTRO = async () => {
        try{
            if(isValidConnectionForCard()){
                let amount = web3.utils.toWei(inputamount,'ether');
                let tx = await trodlStake.methods.stake(amount).send({from: accounts[0]});
                setButtonState('Approve');
                onTransaction();
                //Sudeep : Show Some Kind of UI notification
                console.log(tx);
                //DEBUG_LOG
            }else{
                //PROD_LOG
                setError( new Error('Connect to Binance Smart Chain'));
                showErrorModal();
            }
        } catch (err) {
            console.log(err);
            //PROD_LOG
            setError(err);
            showErrorModal();
            //throw err;
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
        return formatValue(uError, TRObalance, 2 );
    }

    return (
        <div className="col-3 card-sec card-height2">
            {error ?
                <ErrorModal onClose={showErrorModal} show={show}>
                    {`${error.message}`}
				</ErrorModal> : null
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
        </div>
    );
}

export default TROBalanceCard;