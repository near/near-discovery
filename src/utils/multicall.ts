import { Contract, utils } from 'ethers';

export const multicall = async <T = any>({
  abi,
  calls,
  options,
  multicallAddress,
  provider,
}: {
  abi: any[];
  calls: any[];
  options?: any;
  multicallAddress: string;
  provider: any;
}): Promise<T> => {
  const { requireSuccess = true, ...overrides } = options || {};
  const multi = new Contract(
    multicallAddress,
    [
      {
        inputs: [
          { internalType: 'bool', name: 'requireSuccess', type: 'bool' },
          {
            components: [
              { internalType: 'address', name: 'target', type: 'address' },
              { internalType: 'bytes', name: 'callData', type: 'bytes' },
            ],
            internalType: 'struct Multicall2.Call[]',
            name: 'calls',
            type: 'tuple[]',
          },
        ],
        name: 'tryAggregate',
        outputs: [
          {
            components: [
              { internalType: 'bool', name: 'success', type: 'bool' },
              { internalType: 'bytes', name: 'returnData', type: 'bytes' },
            ],
            internalType: 'struct Multicall2.Result[]',
            name: 'returnData',
            type: 'tuple[]',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    provider,
  );
  const itf = new utils.Interface(abi);
  const calldata = calls.map((call) => ({
    target: call.address.toLowerCase(),
    callData: itf.encodeFunctionData(call.name, call.params),
  }));

  const returnData = await multi?.callStatic.tryAggregate(requireSuccess, calldata, overrides);
  const res = returnData?.map((call: any, i: number) => {
    const [result, data] = call;
    return result && Number(data) !== 0 ? itf.decodeFunctionResult(calls[i].name, data) : null;
  });
  return res as any;
};
