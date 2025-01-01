"use client";

import { useState } from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { SignInButton, useProfile } from "@farcaster/auth-kit";
import { useAccount } from "wagmi";
import { WarpAdsForm } from "@/components/WarpAdsForm";
import { BuyAd } from "@/components/BuyAd";
import { ClaimRoyalties } from "@/components/ClaimRoyalties";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Tab } from "@/types";
import { TABS } from "@/constants";




export default function Home() {
  const [currentTab, setCurrentTab] = useState<Tab>("generate");
  const account = useAccount();
  const { isAuthenticated, profile } = useProfile();
  const { username, fid } = profile || {};

  const renderTabContent = () => {
    if (!fid || typeof fid !== 'number') return null;

    switch (currentTab) {
      case "generate":
        return <WarpAdsForm fid={fid} />;
      case "buy":
        return <BuyAd fid={fid} />;
      case "claim-author":
      case "claim-influencer":
        return (
          <ClaimRoyalties
            fid={fid}
            type={currentTab === "claim-author" ? "author" : "influencer"}
            username={username}
          />
        );
      default:
        return null;
    }
  };

  const renderAuthContent = () => {
    if (!account?.address) {
      return (
        <div className="flex justify-center items-center flex-col p-8 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <h3 className="text-xl font-semibold mb-6">Connect your wallet to get started</h3>
          <ConnectButton />
        </div>
      );
    }

    return (
      <div className="flex justify-center items-start flex-col w-full">
        <div className="flex w-full justify-between items-center p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <ConnectButton />
          <SignInButton />
        </div>

        {account?.address && isAuthenticated && fid && (
          <div className="mt-8 w-full">
            <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  className={`p-4 rounded-lg transition-all duration-200 
                    ${currentTab === tab.id 
                      ? 'bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-100' 
                      : 'bg-zinc-50 dark:bg-zinc-900 hover:bg-violet-50 dark:hover:bg-violet-900/50'
                    }
                  `}
                  onClick={() => setCurrentTab(tab.id)}
                >
                  <div className="text-lg font-medium">{tab.label}</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    {tab.description}
                  </div>
                </button>
              ))}
            </nav>

            <div className="bg-white dark:bg-zinc-900 rounded-lg p-6">
              {renderTabContent()}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="container min-h-screen py-12 px-4">
      <div className="fixed top-5 right-5 z-10">
        <ModeToggle />
      </div>

      {/* Logo and Title Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
        <Image
          className="relative"
          src="/logo/logo.png"
          alt="WarpAds Logo"
          width={180}
          height={180}
          priority
        />
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-bold mb-2">
            warp<span className="text-violet-400">ads</span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            The Next Generation Farcaster Ads Protocol
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="max-w-7xl mx-auto">
        <div className="ring-1 ring-zinc-200 dark:ring-zinc-800 rounded-xl p-6 md:p-8">
          {renderAuthContent()}
        </div>
      </section>
    </main>
  );
}