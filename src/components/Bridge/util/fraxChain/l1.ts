import { Contract, providers, utils } from 'ethers';
import Big from 'big.js';

const address = "0x0BaafC217162f64930909aD9f2B27125121d6332";
const ABI = [{
    "inputs": [
        {
            "internalType": "uint32",
            "name": "_minGasLimit",
            "type": "uint32"
        },
        {
            "internalType": "bytes",
            "name": "_extraData",
            "type": "bytes"
        }
    ],
    "name": "depositETH",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}]

export function swapETH(amount: string, account: string, provider: any) {
    const erc20 = new Contract(address, ABI, provider.getSigner(account));
    erc20.depositETH(200000, '0x', { value: new Big(amount).toString() })
}

const addressFrxETH = '0xB9c64BfA498d5b9a8398Ed6f46eb76d90dE5505d'
const ABIFrxETH = [{
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "bridgeFrxETH",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }]

export function swapFrxETH(account: string, amount: string, provider: any) {
    const frxETH = new Contract(addressFrxETH, ABIFrxETH, provider.getSigner(account));
    return frxETH.bridgeFrxETH(amount)
}

const ERC20Address = '0x0BaafC217162f64930909aD9f2B27125121d6332'
const ABIERC20 = [{
    "inputs": [
        {
            "internalType": "address",
            "name": "_l1Token",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "_l2Token",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
        },
        {
            "internalType": "uint32",
            "name": "_minGasLimit",
            "type": "uint32"
        },
        {
            "internalType": "bytes",
            "name": "_extraData",
            "type": "bytes"
        }
    ],
    "name": "depositERC20",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}]

export function swapERC20(account: string, l1TokenAddress: string, l2TokenAddress: string, amount: string, provider: any) {
    const frxETH = new Contract(ERC20Address, ABIERC20, provider.getSigner(account));
    return frxETH.depositERC20(
        l1TokenAddress, 
        l2TokenAddress,
        new Big(amount).mul(10 ** 18).toString(),
        2000000,
        '0x'
    )
}