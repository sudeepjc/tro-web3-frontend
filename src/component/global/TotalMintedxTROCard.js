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
				rewardAmount = web3.utils.fromWei(rewardAmount, 'ether');
				setTotalxTROMinted(rewardAmount);
				setUError(null);
				console.log(`Total minted xTRO : ${rewardAmount}`);
			} catch (err) {
				console.log(`Total minted xTRO failed. ${err.message}`);
				setUError(err);
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
		<div className="font-14 mlr-50">
			<span className="color-a8">  Total Minted xTRO </span> <span className="semi-bold color-prim  ml-10"> {formatTotalxTROMinted()}</span>
		</div>

	);
}

export default TotalMintedxTROCard;