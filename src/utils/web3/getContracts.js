import tokenContractABI from '../abi/contracts/Trodl.json';
import stakeContractABI from '../abi/contracts/TrodlStake.json';
import idoContractABI from '../abi/contracts/TrodlIDO.json';
// import stakeContractABI from '../abi/contracts/TrodlStakeMainNet.json';
// import tokenContractABI from '../abi/contracts/AnyswapV5ERC20.json';

const getTokenContract = async (web3) => {

    try {
        // console.log(web3);
        const networkId = await web3.eth.net.getId();
        // console.log(networkId);
        const deployedNetwork = tokenContractABI.networks[networkId];
        const tokenContract = new web3.eth.Contract(
            tokenContractABI.abi,
            deployedNetwork && deployedNetwork.address,
        );
        return tokenContract;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getStakeContract = async (web3) => {
    try {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = stakeContractABI.networks[networkId];
        const stakeContract = new web3.eth.Contract(
            stakeContractABI.abi,
            deployedNetwork && deployedNetwork.address,
        );
        return stakeContract;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getIdoContract = async (web3) => {
    try {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = idoContractABI.networks[networkId];
        const stakeContract = new web3.eth.Contract(
            idoContractABI.abi,
            deployedNetwork && deployedNetwork.address,
        );
        return stakeContract;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { getTokenContract, getStakeContract, getIdoContract };