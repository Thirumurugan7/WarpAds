import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link, Globe, Copy, CheckCircle2, Sparkles } from 'lucide-react';
import { useProfile } from "@farcaster/auth-kit";
import { useAccount } from "wagmi";

export default function WarpAdsForm() {
  const [url, setUrl] = useState('https://mint.farcaster.xyz/');
  const [warpAdsUrl, setWarpAdsUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { isAuthenticated, profile } = useProfile();
  const { username, fid } = profile || {};
  const account = useAccount();

  // Simulated authentication state

  const address = "0x1234...5678";

  useEffect(() => {
    if (!address || !url) return;
    const encodedUrl = btoa(JSON.stringify({ url, address }));
    setWarpAdsUrl(`https://warpads.xyz/${encodedUrl}`);
  }, [url, address]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1000);
  };

  const handleCopy = async () => {
    if (warpAdsUrl) {
      await navigator.clipboard.writeText(warpAdsUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Card className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-violet-950 dark:via-black dark:to-purple-950" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-200/30 dark:bg-violet-800/30 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200/30 dark:bg-purple-800/30 rounded-full blur-3xl -ml-32 -mb-32" />
        
        <div className="relative">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-100 dark:bg-violet-900/50 rounded-lg">
                <Link className="w-5 h-5 text-violet-500" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  WarpAds URL Generator
                </CardTitle>
                <CardDescription className="mt-1 text-gray-600 dark:text-gray-400">
                  Generate your custom WarpAds frame URL
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url" className="text-base font-medium flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Website URL
                </Label>
                <div className="flex gap-3">
                  <Input
                    id="url"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1 h-12 text-base border-2 border-violet-200 dark:border-violet-800 focus-visible:ring-violet-500 bg-white/50 dark:bg-black/50"
                    placeholder="Enter your website URL"
                  />
                  <Button
                    onClick={handleGenerate}
                    className="h-12 px-6 font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-lg hover:shadow-violet-500/25"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Generate
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {warpAdsUrl && username && (
              <div className="mt-8 space-y-4">
                <Alert className="bg-violet-50 dark:bg-violet-900/30 border-violet-200 dark:border-violet-800">
                  <AlertDescription className="flex flex-col items-center gap-2">
                    <div className="text-lg font-medium text-violet-700 dark:text-violet-300">
                      Hey @{username}! 👋
                    </div>
                    <div className="text-sm text-violet-600 dark:text-violet-400">
                      Here's your WarpAds URL for the frame
                    </div>
                  </AlertDescription>
                </Alert>

                <div className="relative">
                  <div className="p-4 bg-violet-100/50 dark:bg-violet-900/50 rounded-lg border-2 border-violet-200 dark:border-violet-800">
                    <p className="pr-10 font-mono text-sm text-violet-700 dark:text-violet-300 break-all">
                      {warpAdsUrl}
                    </p>
                    <button
                      onClick={handleCopy}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-violet-500 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300"
                      title="Copy to clipboard"
                    >
                      {copied ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </div>
      </Card>
    </div>
  );
}