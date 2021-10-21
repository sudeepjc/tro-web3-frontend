import React, { useState, useEffect } from 'react';
import { formatValue } from '../../utils/wrappers';

import secOne from '../../assets/images/university-solid.svg';

const TotalStakedTROCard = ({ trodlStake, accounts, web3 }) => {
    const [totalTROStaked, setTotalTROStaked] = useState('--');
	const [uError, setUError] = useState(null);
	
	const isValidConnectionForCard = () => {
		if ((trodlStake && (trodlStake._address !== null))
            && (accounts && accounts.length > 0)
            && (web3 !== undefined)) {
			return true;
		}else {
			return false;
		}
	};

    useEffect(() => {
		async function fetchTotalTROStaked() {
			if (isValidConnectionForCard()) {
				try {
					let value = await trodlStake.methods.getTotalTROStaked().call({ from: accounts[0] });
					value = web3.utils.fromWei(value, 'ether');
					setTotalTROStaked(value);
					setUError(null);
					console.log(`Total staked TRO : ${value}`);
				} catch (err) {
					console.log(`Total staked TRO failed. ${err.message}`);
					setUError(err);
				}
			}
		}
		fetchTotalTROStaked();
	});
	
	const formatTotalTROStaked = () => {
		return formatValue(uError, totalTROStaked, 2);
    }

    return (
        <div className="col-3 card-sec card-height1">
            <div className="mt-30">
                <img src={secOne} className="sec-imgs" alt='sec-one'></img>
            </div>
            <div className="mtb18">
                Total Staked TRO
            </div>
            <div className="col-theme">
                {formatTotalTROStaked()}
            </div>
        </div>
    );
}

export default TotalStakedTROCard;