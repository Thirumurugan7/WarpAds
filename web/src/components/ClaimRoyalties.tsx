

import { useState } from 'react';
import { WarpAdsFormProps } from '@/types';
import { useAccount } from 'wagmi';
import { useWarpAdsContract } from '@/hooks/useWarpAdsContract';
import { TransactionStatus } from '@/components/TransactionStatus';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Coins, ArrowUpRight } from 'lucide-react';

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
    <div className="w-full max-w-2xl mx-auto p-6">
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-violet-950 dark:via-black dark:to-purple-950" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-200/30 dark:bg-violet-800/30 rounded-full blur-3xl -mr-32 -mt-32" />
        
        <div className="relative">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto p-3 bg-violet-100 dark:bg-violet-900/50 rounded-xl w-fit">
              <Coins className="w-6 h-6 text-violet-500 dark:text-violet-400" />
            </div>
            <CardTitle className="text-2xl font-bold">
              {type === 'author' ? 'Author' : 'Influencer'} Royalties
            </CardTitle>
            {username && (
              <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                Welcome back, <span className="text-violet-600 dark:text-violet-400">@{username}</span>
              </p>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-violet-100/50 to-purple-100/50 dark:from-violet-900/50 dark:to-purple-900/50 border-2 border-violet-200 dark:border-violet-800">
              <div className="text-center space-y-1">
                <p className="text-sm font-medium text-violet-700 dark:text-violet-300">
                  Available to Claim
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                    {claimableAmount} ETH
                  </span>
                </div>
              </div>
            </div>

            {claimableAmount > 0 && (
              <button
                onClick={handleClaim}
                disabled={isLoading}
                className="group relative w-full"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-200" />
                <div className="relative w-full px-6 py-4 font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl hover:from-violet-600 hover:to-purple-700 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 shadow-lg hover:shadow-violet-500/25 flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing Claim
                    </>
                  ) : (
                    <>
                      Claim Royalties
                      <ArrowUpRight className="w-5 h-5" />
                    </>
                  )}
                </div>
              </button>
            )}

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
              </div>
            )}
            
            {txHash && <TransactionStatus hash={txHash} />}
          </CardContent>
        </div>
      </Card>
    </div>
  );
};