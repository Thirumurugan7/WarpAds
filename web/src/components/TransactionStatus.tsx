export const TransactionStatus = ({ hash }: { hash: string }) => (
  <div className="my-4 text-center">
    <p className="font-semibold">Transaction Sent ✅</p>
    <p className="text-sm break-all">{hash}</p>
  </div>
);