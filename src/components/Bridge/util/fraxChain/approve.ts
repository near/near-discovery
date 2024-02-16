import { Contract, providers, utils } from 'ethers';
import Big from 'big.js';

export async function allowance(
    address: string, 
    account: string, 
    provider: any, 
    spender: string, 
    amount: string,
    decimals: number
    ) {
    const TokenContract = new Contract(
        address,
        [
            {
            inputs: [
                { internalType: 'address', name: '', type: 'address' },
                { internalType: 'address', name: '', type: 'address' },
            ],
            name: 'allowance',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
            },
        ],
        provider,
    );

    const allowanceRes = await TokenContract.allowance(account, spender);

    const needApproved = new Big(utils.formatUnits(allowanceRes.toString(), decimals)).lt(amount);
      
}

export async function approve(
    address: string, 
    account: string, 
    provider: any, 
    spender: string, 
    amount: string,
    decimals: number
) {
    const TokenContract = new Contract(
    address,
    [
        {
        inputs: [
            { internalType: 'address', name: 'spender', type: 'address' },
            { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
        },
    ],
    provider.getSigner(account),
    );

    const tx = await TokenContract.approve(spender, new Big(amount).mul(10 ** decimals).toString())
    const res = await tx.wait();
    return res.status === 1
}