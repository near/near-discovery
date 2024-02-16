import { Contract, providers, utils } from 'ethers';
import Big from 'big.js';

const frxETHAddress = '0x4200000000000000000000000000000000000016'
const frxETHABI = [{
    "inputs": [
        {
            "internalType": "address",
            "name": "_target",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "_gasLimit",
            "type": "uint256"
        },
        {
            "internalType": "bytes",
            "name": "_data",
            "type": "bytes"
        }
    ],
    "name": "initiateWithdrawal",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}]

export function swapFrxRETH(address: string, account: string, amount: string, provider: any) {
    const erc20 = new Contract(frxETHAddress, frxETHABI, provider.getSigner(account));
    return erc20.initiateWithdrawal(address, 200000, '0xfe', { value: new Big(amount).toString() })
}

const erc20Address = '0xB9c64BfA498d5b9a8398Ed6f46eb76d90dE5505d'
const ABIErc20 = [{
    "inputs": [
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
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}]

export function step1(address: string, account: string, amount: string, provider: any) {
    const erc20 = new Contract(erc20Address, ABIErc20, provider.getSigner(account));
    return erc20.withdraw(address, amount, 200000, '0x')
}

const optimismPortalProxyAddress = '0xB9c64BfA498d5b9a8398Ed6f46eb76d90dE5505d'
const ABIProveWithdrawalTransaction = [{
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "gasLimit",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "internalType": "struct Types.WithdrawalTransaction",
        "name": "_tx",
        "type": "tuple"
      },
      {
        "internalType": "uint256",
        "name": "_l2OutputIndex",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "version",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "stateRoot",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "messagePasserStorageRoot",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "latestBlockhash",
            "type": "bytes32"
          }
        ],
        "internalType": "struct Types.OutputRootProof",
        "name": "_outputRootProof",
        "type": "tuple"
      },
      {
        "internalType": "bytes[]",
        "name": "_withdrawalProof",
        "type": "bytes[]"
      }
    ],
    "name": "proveWithdrawalTransaction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }]

  export function step2() {

  }