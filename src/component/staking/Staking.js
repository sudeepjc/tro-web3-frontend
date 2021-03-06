import React from 'react';
import TotalStakedTROCard from '../global/TotalStakedTROCard';
import TotalMintedxTROCard from '../global/TotalMintedxTROCard';
import CirculatingSupplyCard from '../global/CirculatingSupplyCard';
import TROPriceCard from '../global/TROPriceCard';
import TROBalanceCard from '../user/TROBalanceCard';
import XTRORewardCard from '../user/XTRORewardCard';
import TROWithdrawCard from '../user/TROWithdrawCard';
import { useDispatch } from 'react-redux';
import { setErrorModal } from '../../redux/actions/errorModalActions';

const Staking = (props) => {
    const dispatch = useDispatch()

    if (props.error) {
        dispatch(setErrorModal(props.show, props.type, props.error.message))
    }

    const heroSection = () => {
        return (
            <div className="mt-40 ">
                <div className="txt-left">
                    <div className="font-25 bold">
                        Stake TRO</div>
                    <div className="color-a8 font-16">
                        Staking TRO earns you quarterly airdrops, assured IDO allocations and access to an ocean of opportunities within trodl ecosystem</div>
                </div>
            </div>
        )
    }

    const dashboardSection = () => {
        return (
            <div className="">

                <div className="  font16 mt-25 flex-d">
                    <TotalStakedTROCard trodlStake={props.trodlStake} accounts={props.accounts} web3={props.web3} />
                    <TotalMintedxTROCard trodlStake={props.trodlStake} accounts={props.accounts} web3={props.web3} />
                    <CirculatingSupplyCard />
                    <TROPriceCard />
                </div>
                <hr className="stake-hr op-2"></hr>
                <div className="flex-d  mt-50 font16">
                    <TROBalanceCard trodlToken={props.trodlToken} trodlStake={props.trodlStake} accounts={props.accounts} web3={props.web3} onTransaction={props.onTransaction} />
                    <XTRORewardCard trodlStake={props.trodlStake} accounts={props.accounts} web3={props.web3} onTransaction={props.onTransaction} />
                    <TROWithdrawCard trodlStake={props.trodlStake} accounts={props.accounts} web3={props.web3} onTransaction={props.onTransaction} />
                </div>
            </div>
        )
    }

    return (
        <div >
            <div className="">
                {heroSection()}
                {dashboardSection()}
            </div>
        </div>
    )
}

export default Staking