import React, { useState, useEffect } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import { shortAddress } from '../../utils/web3/addressUtils';
import ErrorModal from '../modals/errorModal';

import walletImg from "../../assets/images/wallet-solid.svg";

function MetaMaskWallet({ onConnection, onAccountChange }) {
    const [isInstalled, setIsInstalled] = useState(false);
    const [isInstalling, setIsInstalling] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    const [type, setType] = useState(null);

    let onboarding;

    useEffect(() => {
        if (isMetaMaskInstalled()) {
            setIsInstalled(true);
            window.ethereum.on('accountsChanged', handleNewAccounts);
            window.ethereum.on('chainChanged', handleNewChain);
            window.ethereum.on('connect', handleOnConnection);
        }

        return function cleanup() {
            if (isMetaMaskInstalled()) {
                window.ethereum.removeListener('accountsChanged', handleNewAccounts);
                window.ethereum.removeListener('chainChanged', handleNewAccounts);
                window.ethereum.removeListener('connect', handleOnConnection);
            }
        }
    });

    const showErrorModal = () => {
        setShow(!show);
    };

    const isMetaMaskInstalled = () => {
        const { ethereum } = window
        return Boolean(ethereum && ethereum.isMetaMask)
    }

    // const isMetaMaskConnected = () => {
    //     return accounts && (accounts.length > 0);
    // }

    const installMetamask = () => {
        const currentUrl = new URL(window.location.href);
        // console.log(currentUrl);
        const forwarderOrigin = currentUrl.hostname === 'localhost' ? 'http://localhost:3000' : undefined;
        // console.log(forwarderOrigin);

        try {
            onboarding = new MetaMaskOnboarding({ forwarderOrigin });
            setIsInstalling(true);
            onboarding.startOnboarding();
        } catch (err) {
            setError(err);
            showErrorModal();
            // throw err;
        }
    }

    const connectToMetamask = async () => {
        try {
            const { ethereum } = window;
            // if(!isMetaMaskConnected()){
            //     ethereum.on('accountsChanged', handleNewAccounts);
            //     ethereum.on('chainChanged', handleNewChain);
            //     // ethereum.on('connect', handleOnConnection);
            // }

            const newAccounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });
            handleNewAccounts(newAccounts);

            const chainId = await ethereum.request({
                method: 'eth_chainId',
            });
            handleNewChain(chainId);
            setIsConnected(true);


        } catch (err) {
            setError(err);
            showErrorModal();
            // throw err;
        } finally {
            if (onboarding) {
                console.log('onboarding stopped');
                onboarding.stopOnboarding();
            }
        }
    }

    const connectWallet = async () => {
        if (!isInstalled) {
            installMetamask();
        } else {
            connectToMetamask();
        }
    }

    const getConnectButtonString = () => {
        let connectButtonString = 'Connect Wallet';
        if (!isInstalled) {
            if (isInstalling) {
                connectButtonString = 'Installing Metamask';
            } else {
                connectButtonString = 'Install Metamask';
            }
        } else if (isConnected) {
            connectButtonString = shortAddress(accounts[0]);
        }
        return connectButtonString;
    }

    const handleNewAccounts = (newAccounts) => {
        setAccounts(newAccounts);
        onAccountChange(newAccounts);
    }

    const handleOnConnection = (connectionInfo) => {
        console.log(`ConnectionInfo: ${connectionInfo.chainId}`);
        // setIsConnected(true);
        if (onboarding) {
            console.log('onboarding stopped');
            onboarding.stopOnboarding();
        }
    }

    function handleNewChain(chainId) {
        onConnection(chainId);
        // console.log(chainId);

        // SUdeep: To be enable for production
        if (!(chainId === '0x38' || chainId === '0x61')) {
            setError(new Error(`Connect to the Binance Chain. Current ChainID: ${chainId}`));
            setType('switch metamask')
            showErrorModal();
        }
    }

    return (
        <div>
            {error ?
                <ErrorModal onClose={showErrorModal} show={show} type={type}>
                    {`${error.message}`}
                </ErrorModal> : null
            }
            <button className="connect-btn" onClick={connectWallet}>
                <img src={walletImg} className="wallet-img" alt='wallet-img'></img>
                {getConnectButtonString()}
            </button>
        </div>
    );
}

export default MetaMaskWallet;