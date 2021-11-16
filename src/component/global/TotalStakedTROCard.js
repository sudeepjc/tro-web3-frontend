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
		} else {
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
		<div className="font-14 mr-50 ">
			<span className="color-a8"> Total Staked TRO </span> <span className="semi-bold color-prim  ml-10">{formatTotalTROStaked()}</span>
		</div>




	);
}

export default TotalStakedTROCard;