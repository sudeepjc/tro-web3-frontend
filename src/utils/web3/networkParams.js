const NETWORK_NAME = 'Binance Smart Chain Mainnet'
const RPC_URLS = ["https://bsc-dataseed1.binance.org",
    "https://bsc-dataseed2.binance.org",
    "https://bsc-dataseed3.binance.org",
    "https://bsc-dataseed4.binance.org",
    "https://bsc-dataseed1.defibit.io",
    "https://bsc-dataseed2.defibit.io",
    "https://bsc-dataseed3.defibit.io",
    "https://bsc-dataseed4.defibit.io",
    "https://bsc-dataseed1.ninicoin.io",
    "https://bsc-dataseed2.ninicoin.io",
    "https://bsc-dataseed3.ninicoin.io",
    "https://bsc-dataseed4.ninicoin.io"]
const CHAIN_ID = '0x38'
const CURRENCY = 'Binance Chain Native Token'
const SYMBOL = "BNB"
const EXPLORERS = ['https://bscscan.com']

export const MAINNET_PARAMS = {
    chainId: CHAIN_ID, // A 0x-prefixed hexadecimal string
    chainName: NETWORK_NAME,
    nativeCurrency: {
        name: CURRENCY,
        symbol: SYMBOL, // 2-6 characters long
        decimals: 18,
    },
    rpcUrls: RPC_URLS,
    blockExplorerUrls: EXPLORERS
}

const T_NETWORK_NAME = 'Binance Smart Chain Testnet'
const T_RPC_URLS = [
    "https://data-seed-prebsc-1-s1.binance.org:8545",
    "https://data-seed-prebsc-2-s1.binance.org:8545",
    "https://data-seed-prebsc-1-s2.binance.org:8545",
    "https://data-seed-prebsc-2-s2.binance.org:8545",
    "https://data-seed-prebsc-1-s3.binance.org:8545",
    "https://data-seed-prebsc-2-s3.binance.org:8545"
]
const T_CHAIN_ID = '0x61'
const T_CURRENCY = 'Binance Chain Native Token'
const T_SYMBOL = 'tBNB'
const T_EXPLORERS = ['https://testnet.bscscan.com']

export const TESTNET_PARAMS = {
    chainId: T_CHAIN_ID,
    chainName: T_NETWORK_NAME,
    nativeCurrency: {
        name: T_CURRENCY,
        symbol: T_SYMBOL,
        decimals: 18,
    },
    rpcUrls: T_RPC_URLS,
    blockExplorerUrls: T_EXPLORERS
}