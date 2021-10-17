import React,{useState, useEffect} from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import { shortAddress } from '../../utils/web3/addressUtils';

import walletImg from "../../assets/images/wallet-solid.svg";

function MetaMaskWallet({onConnection, onAccountChange}) {
    const [isInstalled, setIsInstalled] = useState(false);
    const [isInstalling, setIsInstalling] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [accounts, setAccounts] = useState([]);
    let onboarding;

    useEffect(()=>{
        if (isMetaMaskInstalled()) {
            setIsInstalled(true);
        }

        return function cleanup () {
            if(isMetaMaskInstalled()){
                window.ethereum.removeListener('accountsChanged', handleNewAccounts);
                window.ethereum.removeListener('chainChanged', handleNewAccounts);
                window.ethereum.removeListener('networkChanged', handleNewAccounts);
            }
        }
    },[]);

    const isMetaMaskInstalled = () => {
        const { ethereum } = window
        return Boolean(ethereum && ethereum.isMetaMask)
    }

    const isMetaMaskConnected = () => {
        return accounts && (accounts.length > 0);
    }

    const installMetamask = () => {
        const currentUrl = new URL(window.location.href);
        // console.log(currentUrl);
        const forwarderOrigin = currentUrl.hostname === 'localhost'? 'http://localhost:3000': undefined;
        // console.log(forwarderOrigin);

        try {
            onboarding = new MetaMaskOnboarding({ forwarderOrigin });
            setIsInstalling(true);
            onboarding.startOnboarding();
        } catch (error) {
            throw error;
        }
    }

    const connectToMetamask =  async() => {
        try {
            const { ethereum } = window;
            if(!isMetaMaskConnected()){
                ethereum.on('accountsChanged', handleNewAccounts);
                ethereum.on('chainChanged', handleNewChain);
                // ethereum.on('connect', handleOnConnection);
            }

            const newAccounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });
            handleNewAccounts(newAccounts);

            const chainId = await ethereum.request({
                method: 'eth_chainId',
            });
            handleNewChain(chainId);
            setIsConnected(true);
            

        } catch (error) {
            throw error;
        } finally {
            if (onboarding) {
                console.log('onboarding stopped');
                onboarding.stopOnboarding();
            }
        }
    }
    
    const connectWallet = async () => {
        if(! isInstalled) {
            installMetamask();
        } else {
            connectToMetamask();
        }
    }
    
    const getConnectButtonString = () => {
        let connectButtonString = 'Connect Wallet';
        if(! isInstalled) {
            if(isInstalling){
                connectButtonString = 'Installing Metamask';
            } else {
                connectButtonString = 'Install Metamask';
            }
        } else if(isConnected){
            connectButtonString = shortAddress(accounts[0]);
        }
        return connectButtonString;
    }
    
    const handleNewAccounts = (newAccounts) => {
        setAccounts(newAccounts);
        onAccountChange(newAccounts);
    }

    // const handleOnConnection = (connectionInfo) => {
    //     console.log(`ConnectionInfo: ${connectionInfo.chainId}`);
    // }

    function handleNewChain (chainId) {
        onConnection(chainId);
        // console.log(chainId);

        // SUdeep: To be enable for production
        // if( !(chainId === '0x38' || chainId === '0x61')) {
        //     throw new Error(`Connect to the Binance Chain. Current ChainID: ${chainId}`);
        // }
    }
    
    return(
        <div>
            <button className="connect-btn" onClick={connectWallet}>
                <img src={walletImg} className="wallet-img" alt='wallet-img'></img>
                {getConnectButtonString()}
            </button>
        </div>
    );
}

export default MetaMaskWallet;