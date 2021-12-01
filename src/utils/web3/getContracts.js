// import tokenContractABI from '../abi/contracts/Trodl.json';
// import stakeContractABI from '../abi/contracts/TrodlStake.json';
// import idoContractABI from '../abi/contracts/TrodlIDO.json';
import iERC20ContractABI from '../abi/contracts/IERC20.json';
import config from 'react-global-configuration';
import tokenContractABI from '../abi/contracts/AnyswapV5ERC20.json';
import stakeContractABI from '../abi/contracts/TrodlStakeMainNet.json';
import idoContractABI from '../abi/contracts/TrodlIDOMainNet.json';

const getTokenContract = async (web3) => {
    try {
        const networkId = await web3.eth.net.getId();
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

const getPaymentTokenContract = async (web3) => {
    try {
        const pTokenAddress = config.get('pToken');
        const pTokenContract = new web3.eth.Contract(
            iERC20ContractABI.abi,
            pTokenAddress,
        );
        return pTokenContract;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { getTokenContract, getStakeContract, getIdoContract, getPaymentTokenContract };