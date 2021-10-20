import React, { useState, useEffect } from 'react';
import { formatValue } from '../../utils/wrappers';
import useRecursiveTimeout from '../../utils/useRecursiveTimeout';

import secTwo from '../../assets/images/spinner-solid.svg';

const TotalMintedxTROCard = ({ trodlStake, accounts, web3 }) => {
    const [totalxTROMinted, setTotalxTROMinted] = useState('--');
	const [uError, setUError] = useState(null);
	
	const isValidConnectionForCard = () => {
		if ((trodlStake && (trodlStake._address !== null))
            && (accounts && accounts.length > 0)
            && (web3 !== undefined)) {
			return true;
		}
		return false;
	}
	async function getTotalxTROMinted() {
		if (isValidConnectionForCard()) {
			try {
				let rewardAmount = await trodlStake.methods.getTotalxTRO().call({ from: accounts[0] });
				rewardAmount = web3.utils.fromWei(rewardAmount,'ether');
				setTotalxTROMinted(rewardAmount);
				setUError(null);
				// DEBUG_LOG
			} catch (err) {
				console.log(err);
				setUError(err);
				//PROD_LOG
			}
		}
	}

	useEffect(() => {
		getTotalxTROMinted();
	});

	useRecursiveTimeout(async () => {
		getTotalxTROMinted();
	}, 10000);

	const formatTotalxTROMinted = () => {
		return formatValue(uError, totalxTROMinted, 4);
    }
    
    return (
        <div className="col-3 card-sec card-height1" >
            <div className="mt-30">
                <img src={secTwo} className="sec-imgs" alt='sec-two'></img>
            </div>
            <div className="mtb18">
                Total Minted xTRO
            </div>
            <div className="col-theme">
                {formatTotalxTROMinted()}
            </div>
        </div>
    );
}

export default TotalMintedxTROCard;