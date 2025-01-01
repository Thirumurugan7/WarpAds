export interface WarpAdsFormProps {
  fid: number;
}

export interface AdMetadata {
  title: string;
  description?: string;
  logoUrl?: string;
}

export interface ContractExecutionResult {
  isLoading: boolean;
  error: string | null;
  txHash: string;
}

export interface WarpAdsContractHook extends ContractExecutionResult {
  executeContract: (
    functionName: string,
    args: any[],
    value?: bigint
  ) => Promise<string>;
}

export interface GenerateLabelsProps {
  setLabels: (labels: string[]) => void;
  metadata: {
    title: string;
    description?: string;
  };
}

export interface WarpAdsFormProps {
  fid: number;
}

export type Tab = "generate" | "buy" | "claim-author" | "claim-influencer";

export type TabConfig = {
  id: string;
  label: string;
  description: string;
};