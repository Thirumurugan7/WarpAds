export const Input = ({ 
  label, 
  optional = false,
  ...props 
}: React.InputHTMLAttributes<HTMLInputElement> & { 
  label: string;
  optional?: boolean;
}) => (
  <div className="w-full">
    <label className="block text-sm font-medium mb-1">
      {label}
      {optional && <span className="text-sm text-gray-400"> (optional)</span>}
    </label>
    <input
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200"
      {...props}
    />
  </div>
);
