import { create, all } from 'mathjs';

const config = { };
const math = create(all, config);

const getRewardPerSecond = (currentReward, amount, apy) => {
	const currentRewardAmount = math.bignumber(currentReward);
	const stakedAmount = math.bignumber(amount);
	const apyValue = math.bignumber(apy);
	const tmpA = math.multiply(stakedAmount, apyValue);
	const rewardPerSecond = math.divide(tmpA, math.bignumber('8640000'));
	const rewardForRequest = math.add(currentRewardAmount, rewardPerSecond);
	console.log(rewardForRequest.toString());
	console.log(rewardForRequest.toString().split('.')[0]);
	return (rewardForRequest.toString().split('.')[0]);
};
export default getRewardPerSecond;
