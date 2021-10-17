import React,{useState, useEffect} from 'react';

const XTRORewardCard = ({trodlStake, accounts, web3}) => {
    const [xTROBalance, setXTROBalance] = useState(0);
    const [stakedTRO, setStakedTRO] = useState(0);

    useEffect(()=>{
        async function getData(){
            if (trodlStake && accounts && web3) {
                try{
                    let value = await trodlStake.methods.getxTROBalance(accounts[0]).call({from: accounts[0]});
                    value = web3.utils.fromWei(value,'ether');
                    setXTROBalance(value);
                    console.log(value);
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            }
        }
        getData();
    });

    useEffect(()=>{
        async function getData(){
            if (trodlStake && accounts && web3) {
                try{
                    let value = await trodlStake.methods.getStakedTROBalance().call({from: accounts[0]});
                    value = web3.utils.fromWei(value,'ether');
                    setStakedTRO(value);
                    console.log(value);
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            }
        }
        getData();
    });

    const unstakeAll = async () => {
        try{
            let tx = await trodlStake.methods.unstakeAll().send({from: accounts[0]});
            //Sudeep : Show Some Kind of UI notification
            console.log(tx);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    return(
        <div className="col-3 card-sec card-height2" >
            <div className="mtb18 mt-50">
                Earned xTRO
            </div>
            <div className="col-theme">
                {xTROBalance}
            </div>
            <div className="borderDark"> </div>
            <div className="mtb18 mt-30">
                Staked TRO
            </div>
            <div className="col-theme">
                {stakedTRO}
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