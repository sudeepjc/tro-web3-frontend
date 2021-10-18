import React, { useState, useEffect } from 'react';
import { convertThousands } from '../../utils/wrappers';
import ErrorModal from '../modals/errorModal';

const TROBalanceCard = ({ trodlToken, trodlStake, accounts, web3 }) => {
    const [inputamount, setInputAmount] = useState(0);
    const [TRObalance, setTROBalance] = useState(0);
    const [buttonState, setButtonState] = useState('Approve');
    const [show, setShow] = useState(false)
    const [error, setError] = useState(null)


    const showModal = () => {
        setShow(
            !show
        );
    };
    useEffect(() => {
        async function getData() {
            if (trodlToken && accounts && web3) {
                try {
                    let value = await trodlToken.methods.balanceOf(accounts[0]).call({ from: accounts[0] });
                    value = web3.utils.fromWei(value, 'ether');
                    setTROBalance(value);
                    console.log(value);
                } catch (error) {
                    console.log(error);
                    setError(error)
                    throw error;
                }
            }
        }
        getData();
    });

    useEffect(() => {

        async function getData() {
            if (trodlToken && accounts && web3) {
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
                } catch (error) {
                    setError(error)
                    console.log(error);
                    throw error;
                }
            }
        }
        getData();
    });

    const approveTROForStaking = async () => {
        try {
            let amount = web3.utils.toWei(inputamount, 'ether');
            let tx = await trodlToken.methods.approve(trodlStake._address, amount).send({ from: accounts[0] });
            //Sudeep : Show Some Kind of UI notification
            console.log(tx);
        } catch (error) {
            setError(error)

            console.log(error);

            // throw error;
        }
    }

    const stakeTRO = async () => {
        try {
            let amount = web3.utils.toWei(inputamount, 'ether');
            let tx = await trodlStake.methods.stake(amount).send({ from: accounts[0] });
            //Sudeep : Show Some Kind of UI notification
            console.log(tx);
        } catch (error) {
            setError(error)

            console.log(error);
            throw error;
        }
    }

    const approveAndStake = async () => {
        showModal();

        if (buttonState === 'Approve') {
            approveTROForStaking();
        } else if (buttonState === 'Stake') {
            stakeTRO();
        }
    }

    const onValueChange = (event) => {
        setInputAmount(event.target.value);
    }

    return (

        <div className="col-3 card-sec card-height2">
            {error ?
                <ErrorModal onClose={showModal} show={show}>
                    Connect your Wallet.
</ErrorModal> : null}
            <div className="mtb18 mt-50">
                Available TRO Balance
            </div>
            <div className="col-theme">
                {convertThousands(TRObalance)}
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