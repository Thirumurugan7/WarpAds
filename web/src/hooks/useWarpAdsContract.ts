import { useState } from 'react';
import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import { WARP_ADS_ABI, WARP_ADS_ADDRESS } from '@/lib/constants';

export const useWarpAdsContract = (address?: `0x${string}`) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string>('');

  const getClients = () => {
    if (!address) throw new Error('No wallet connected');

    const walletClient = createWalletClient({
      chain: baseSepolia,
      transport: custom(window.ethereum!),
      account: address,
    });

    const publicClient = createPublicClient({
      chain: baseSepolia,
      transport: http(
        `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
      ),
    });

    return { walletClient, publicClient };
  };

  const executeContract = async (
    functionName: string,
    args: any[],
    value?: bigint
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const { walletClient, publicClient } = getClients();
      const { request } = await publicClient.simulateContract({
        address: WARP_ADS_ADDRESS as `0x${string}`,
        abi: WARP_ADS_ABI,
        functionName,
        args,
        value,
        account: address,
      });
      
      const hash = await walletClient.writeContract(request);
      setTxHash(hash);
      return hash;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    executeContract,
    isLoading,
    error,
    txHash,
  };
};