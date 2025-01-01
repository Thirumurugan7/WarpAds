"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { SignInButton, useProfile } from "@farcaster/auth-kit";
import { useAccount } from "wagmi";
import  WarpAdsForm  from "@/components/WarpAdsForm";
import  BuyAd  from "@/components/BuyAd";
import  {ClaimRoyalties}  from "@/components/ClaimRoyalties";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Tab } from "@/types";
import { TABS } from "@/constants";
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Shield, Zap, ChevronRight, Activity, TrendingUp } from 'lucide-react';

const MetricsDisplay = () => (
  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
    <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto px-4">
      {[
        { value: "$2.5M", label: "Total Volume", change: "+12.5%" },
        { value: "10.2K", label: "Active Users", change: "+8.3%" },
        { value: "1.2K", label: "Campaigns", change: "+15.7%" }
      ].map((metric, i) => (
        <div key={i} className="text-center">
          <div className="font-mono text-2xl bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-indigo-500">
            {metric.value}
          </div>
          <div className="text-sm text-zinc-500">{metric.label}</div>
          <div className="text-xs text-emerald-500">{metric.change}</div>
        </div>
      ))}
    </div>
  </div>
);

export default function Home() {
  const [currentTab, setCurrentTab] = useState<Tab>("generate");
  const [isLoading, setIsLoading] = useState(true);
  const account = useAccount();
  const { isAuthenticated, profile } = useProfile();
  const { username, fid } = profile || {};

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const renderTabContent = () => {
    if (!fid || typeof fid !== 'number') return null;

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative"
        >
          {(() => {
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
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur-xl opacity-50" />
          <Image
            src="/logo/logo.png"
            alt="WarpAds Logo"
            width={80}
            height={80}
            className="relative z-10"
          />
        </motion.div>
      </div>
    );
  }

  // Initial state - No wallet connection
  if (!account?.address) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
        <div className="fixed top-6 right-6">
          <ModeToggle />
        </div>
        
        <div className="container max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-4xl"
          >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 rounded-3xl" />
            <div className="absolute inset-0">
              <div className="absolute inset-0 backdrop-blur-3xl opacity-50" />
              <div className="h-full w-full bg-[linear-gradient(to_right,transparent_0%,#ffffff20_15%,#ffffff20_85%,transparent_100%)] animate-wave" />
            </div>
            
            {/* Content */}
            <div className="relative">
              <div className="pt-20 pb-16 px-6 md:px-12">
                {/* Logo Section */}
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-center mb-12"
                >
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000" />
                    <Image
                      src="/logo/logo.png"
                      alt="WarpAds Logo"
                      width={120}
                      height={120}
                      className="relative rounded-full"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Title & Description */}
                <div className="text-center mb-12">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600"
                  >
                    warp<span>ads</span>
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
                  >
                    The Next Generation of Decentralized Advertising
                  </motion.p>
                </div>

                {/* Stats Display */}
                <MetricsDisplay />

                {/* Connect Button */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center mt-20"
                >
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200" />
                    <div className="relative">
                      <ConnectButton />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Wallet connected but not authenticated with Farcaster
  if (!isAuthenticated || !fid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
        <div className="fixed top-6 right-6">
          <ModeToggle />
        </div>

        <div className="container max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl max-w-2xl w-full"
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-transparent to-indigo-500/20 opacity-50" />
              <div className="absolute inset-0 backdrop-blur-3xl" />
            </div>
            
            <div className="relative z-10 p-12">
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/logo/logo.png"
                  alt="WarpAds Logo"
                  width={80}
                  height={80}
                  className="mb-8"
                />
                <h2 className="text-3xl font-bold mb-4">WarpAds</h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                  Connect with Farcaster to unlock the full potential of WarpAds
                </p>
                <div className="flex items-center gap-6">
                  <ConnectButton />
                  <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-700" />
                  <SignInButton />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Fully authenticated - Main interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      {/* Sticky Header */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800"
      >
        <div className="container max-w-7xl mx-auto">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-8">
              <Image
                src="/logo/logo.png"
                alt="WarpAds Logo"
                width={40}
                height={40}
                className="rounded-xl"
              />
              <div className="flex items-center gap-4">
                <ConnectButton />
               {username}
              </div>
            </div>
            <ModeToggle />
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto py-12 px-6">
        {/* Activity Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Activity, label: "Campaign Performance", value: "+32.5%", desc: "Last 7 days" },
            { icon: TrendingUp, label: "Total Revenue", value: "$12.4K", desc: "This month" },
            { icon: Star, label: "Average ROI", value: "3.2x", desc: "Across campaigns" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 p-6 group hover:shadow-lg transition-shadow duration-200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-violet-500/10 dark:bg-violet-500/20">
                    <stat.icon className="h-5 w-5 text-violet-500" />
                  </div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">{stat.desc}</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {stat.label}
                  </h3>
                  <p className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {TABS.map((tab, index) => (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setCurrentTab(tab.id)}
              className={`relative overflow-hidden p-6 rounded-xl text-left group transition-all duration-200
                ${currentTab === tab.id 
                  ? 'bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg' 
                  : 'bg-white dark:bg-zinc-900 hover:shadow-lg'
                }
              `}
            >
              <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
              <div className="relative z-10">
                <div className="text-xl font-bold mb-3">{tab.label}</div>
                <div className={`text-sm mb-6 ${
                  currentTab === tab.id 
                    ? 'text-white/80' 
                    : 'text-zinc-600 dark:text-zinc-400'
                }`}>
                  {tab.description}
                </div>
                <ArrowRight className={`w-5 h-5 transition-transform duration-200 ${
                  currentTab === tab.id 
                    ? 'translate-x-2 text-white' 
                    : 'group-hover:translate-x-2 text-violet-500'
                }`} />
              </div>
            </motion.button>
          ))}
        </nav>

        {/* Main Content Area */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative overflow-hidden bg-white dark:bg-zinc-900 rounded-2xl shadow-xl"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5" />
            <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
          </div>
          <div className="relative z-10 p-8">
            {renderTabContent()}
          </div>
        </motion.div>
      </div>
    </div>
  );
}