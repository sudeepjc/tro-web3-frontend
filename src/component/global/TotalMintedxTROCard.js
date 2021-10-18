import React, { useState, useEffect } from 'react';

import secTwo from '../../assets/images/spinner-solid.svg';
import { convertThousands } from '../../utils/wrappers';

const TotalMintedxTROCard = ({ trodlStake, accounts, web3 }) => {
    const [totalxTROMinted, setTotalxTROMinted] = useState(0);

    useEffect(() => {
        async function getData() {
            if (trodlStake && accounts) {
                try {
                    let value = await trodlStake.methods.getTotalxTRO().call({ from: accounts[0] });
                    value = web3.utils.fromWei(value, 'ether');
                    setTotalxTROMinted(value);
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
        <div className="col-3 card-sec card-height1" >
            <div className="mt-30">
                <img src={secTwo} className="sec-imgs" alt='sec-two'></img>
            </div>
            <div className="mtb18">
                Total Minted xTRO
            </div>
            <div className="col-theme">

                {convertThousands(totalxTROMinted)}
            </div>
        </div>
    );
}

export default TotalMintedxTROCard;