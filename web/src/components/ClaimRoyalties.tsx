import { useState } from 'react';
import { WarpAdsFormProps } from '@/types';
import { useAccount } from 'wagmi';
import { useWarpAdsContract } from '@/hooks/useWarpAdsContract';
import { TransactionStatus } from '@/components/TransactionStatus';

interface ClaimRoyaltiesProps extends WarpAdsFormProps {
  type: 'author' | 'influencer';
  username: string | undefined;
}

export const ClaimRoyalties = ({ fid, type, username }: ClaimRoyaltiesProps) => {
  const [claimableAmount, setClaimableAmount] = useState<number>(0.01);
  const { address } = useAccount();
  const { executeContract, isLoading, error, txHash } = useWarpAdsContract(address as `0x${string}`);

  const handleClaim = async () => {
    try {
      const functionName = type === 'author' ? 'claimAuthorRoyalties' : 'claimInfluencerRoyalties';
      const args = type === 'author' 
        ? ['https://mint.farcaster.xyz/', fid]
        : [fid];
      
      await executeContract(functionName, args);
    } catch (err) {
      console.error('Failed to claim royalties:', err);
    }
  };

  return (
    <div className="w-full max-w-xl p-4 bg-white mx-auto dark:bg-black rounded-lg shadow-md">
      <div className="mt-6 text-center">
        <p className="text-lg font-semibold dark:text-gray-200">
          Hey @{username}
        </p>
        <p className="mt-2 dark:text-gray-200">
          This is your available royalties
        </p>
        <p className="mt-2 text-violet-600 break-all dark:text-violet-400">
          {claimableAmount}
        </p>
      </div>

      {claimableAmount > 0 && (
        <div className="mt-3 flex items-center justify-center space-x-2">
          <button
            onClick={handleClaim}
            disabled={isLoading}
            className="px-4 py-2 font-bold text-white bg-violet-400 rounded-lg hover:bg-violet-500 dark:bg-violet-400 dark:hover:bg-violet-500 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Claim'}
          </button>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm text-center mt-2">{error}</p>
      )}
      
      {txHash && <TransactionStatus hash={txHash} />}
    </div>

);
};