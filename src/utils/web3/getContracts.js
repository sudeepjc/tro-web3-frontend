import tokenContractABI from '../abi/contracts/Trodl.json';
import stakeContractABI from '../abi/contracts/TrodlStake.json';

const getTokenContract = async(web3, chainId) => {

    try{
        // console.log(web3);
        const networkId = await web3.eth.net.getId();
        // console.log(networkId);
        const deployedNetwork = tokenContractABI.networks[networkId];
        const tokenContract = new web3.eth.Contract(
            tokenContractABI.abi,
            deployedNetwork && deployedNetwork.address,
        );
        return tokenContract;
    }catch(error) {
        console.log(error);
        throw error;
    }
}

const getStakeContract = async(web3, chainId) => {
    try{
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = stakeContractABI.networks[networkId];
        const stakeContract = new web3.eth.Contract(
            stakeContractABI.abi,
            deployedNetwork && deployedNetwork.address,
        );
        return stakeContract;
    }catch(error) {
        console.log(error);
        throw error;
    }
}

export {getTokenContract, getStakeContract};