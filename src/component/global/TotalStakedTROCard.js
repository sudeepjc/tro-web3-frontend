import React, { useState, useEffect } from 'react';

import secOne from '../../assets/images/university-solid.svg';
import { convertThousands } from '../../utils/wrappers';

const TotalStakedTROCard = ({ trodlStake, accounts, web3 }) => {
    const [totalTROStaked, setTotalTROStaked] = useState(0);

    useEffect(() => {

        async function getData() {

            if (trodlStake && accounts) {
                try {
                    let value = await trodlStake.methods.getTotalTROStaked().call({ from: accounts[0] });
                    value = web3.utils.fromWei(value, 'ether');
                    setTotalTROStaked(value);
                    console.log(value);

                } catch (error) {
                    console.log(error);
                    throw error;
                }
            }
        }
        getData();
    });

    return (
        <div className="col-3 card-sec card-height1">
            <div className="mt-30">
                <img src={secOne} className="sec-imgs" alt='sec-one'></img>
            </div>
            <div className="mtb18">
                Total Staked TRO
            </div>
            <div className="col-theme">
                {convertThousands(totalTROStaked)}
            </div>
        </div>
    );
}

export default TotalStakedTROCard;