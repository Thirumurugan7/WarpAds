import { useState } from 'react';
import { WarpAdsFormProps, AdMetadata } from '@/types';
import { useAccount } from 'wagmi';
import { Input } from '@/components/ui/Input';
import { TransactionStatus } from '@/components/TransactionStatus';
import { useWarpAdsContract } from '@/hooks/useWarpAdsContract';
import GenerateLabels from './GenerateLabels';

export const BuyAd = ({ fid }: WarpAdsFormProps) => {
  const [formData, setFormData] = useState<AdMetadata>({
    title: '',
    description: '',
    logoUrl: 'https://example.com/logo.svg',
  });
  const [labels, setLabels] = useState<string[]>([]);
  
  const { address } = useAccount();
  const { executeContract, isLoading, error, txHash } = useWarpAdsContract(address as `0x${string}`);

  const handleBuyAd = async () => {
    try {
      await executeContract(
        'createAd',
        [JSON.stringify(formData), labels],
        BigInt(100000000)
      );
    } catch (err) {
      console.error('Failed to buy ad:', err);
    }
  };

  return (
    <div className="w-full max-w-xl p-4 bg-white mx-auto dark:bg-black rounded-lg shadow-md">
      <div className="flex flex-col gap-4">
        <Input
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        />
        
        <Input
          label="Description"
          optional
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
        
        <Input
          label="Logo URL"
          value={formData.logoUrl}
          onChange={(e) => setFormData(prev => ({ ...prev, logoUrl: e.target.value }))}
        />

        <GenerateLabels
          setLabels={setLabels}
          metadata={{ title: formData.title, description: formData.description }}
        />

        <button
          onClick={handleBuyAd}
          disabled={isLoading}
          className="px-4 py-2 font-bold text-white bg-violet-400 rounded-lg hover:bg-violet-500 dark:bg-violet-400 dark:hover:bg-violet-500 disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Buy an Ad'}
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}
        
        {txHash && <TransactionStatus hash={txHash} />}
      </div>
    </div>
  );
};
