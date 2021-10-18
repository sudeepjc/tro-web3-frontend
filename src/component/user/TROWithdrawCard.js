import React, { useState, useEffect } from 'react';
import ErrorModal from '../modals/errorModal';
import TransactionModal from '../modals/transactionModal'
const TROWithdrawCard = ({ trodlStake, accounts, web3, }) => {
    const [lockedTRO, setLockedTRO] = useState(0);
    const [unlockedTRO, setUnlockedTRO] = useState(0);
    const [error, setError] = useState(null)
    const [show, setShow] = useState(false)

    const showModal = () => {
        setShow(
            !show
        );
    };
    useEffect(() => {
        async function getData() {

            if (trodlStake && accounts && web3) {
                try {
                    let lockUpPeriod = await trodlStake.methods._lockupPeriod().call({ from: accounts[0] });
                    let userInfo = await trodlStake.methods.getUserRewardInfo(accounts[0]).call({ from: accounts[0] });
                    let value = web3.utils.fromWei(userInfo['unstakedAmount'], 'ether');
                    let block = await web3.eth.getBlock('latest');
                    if (block.timestamp > ((86400 * lockUpPeriod) + userInfo['lastAccountingTimestampSec'])) {
                        setLockedTRO(0);
                        setUnlockedTRO(value);
                    } else {
                        setLockedTRO(value);
                        setUnlockedTRO(0);
                    }
                    // setTROBalance(value);
                    // console.log(userInfo);
                    // console.log(value);
                    // console.log(block.timestamp);

                } catch (error) {
                    console.log(error);
                    setError(error)
                    throw error;
                }
            }
        }
        getData();
    });

    const restakeAll = async () => {
        showModal()

        try {
            let tx = await trodlStake.methods.reStake().send({ from: accounts[0] });
            //Sudeep : Show Some Kind of UI notification
            console.log(tx);
        } catch (error) {
            console.log(error);
            setError(error)

            // throw error;
        }
    }

    const withdrawAll = async () => {
        showModal()

        try {
            let tx = await trodlStake.methods.withdrawAllTRO().send({ from: accounts[0] });
            //Sudeep : Show Some Kind of UI notification
            console.log(tx);
        } catch (error) {
            console.log(error);
            setError(error)

            // throw error;
        }
    }

    return (
        <div className="col-3 card-sec card-height2">
            {error ?
                <TransactionModal onClose={showModal} show={show}>
                    Connect your Wallet.
</TransactionModal> : null}
            <div className="mtb18 mt-36">
                Locked TRO balance
            </div>
            <div className="col-theme mtb18 ">
                {lockedTRO}
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
                {unlockedTRO}
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