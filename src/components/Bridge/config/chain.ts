export default {}

const exclude_chains: { [key: number]: boolean } = {
    5000: true,
    534352: true,
    169: true,
}

export const excludeChain = function(chainId: number): boolean | undefined {
    return exclude_chains[chainId]
}