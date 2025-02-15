'use client';

import { SafeGuardABI } from "@/abis/safe-guard/SafeGuardABI";
import { Button } from "@/components/button/button";
import { Card } from "@/components/card/card";
import ClientWrapper from "@/components/wrapper/client-wrapper";
import { wagmiConfig } from '@/configs/wagmi';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/dialog/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { simulateContract } from "@wagmi/core";
import { ArrowRight, Info, Shield } from "lucide-react";
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { getAddress } from "viem";
import {
  useAccount,
  usePublicClient,
  useWriteContract
} from "wagmi";

const Home: NextPage = () => {
  const publicClient = usePublicClient();
  const { address: userAddress, isConnected } = useAccount();
  const {
    data: setupGuardHash,
    isPending: isSetupGuardPending,
    writeContract: writeSetupGuard
  } = useWriteContract();

  const [isAlertSetupOpen, setIsAlertSetupOpen] = useState(false);
  const [isSetupLoading, setIsSetupLoading] = useState(false);
  const [currentGuard, setCurrentGuard] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);
  
  const transactions = [
    { id: 1, type: "Outgoing", amount: "500.00", date: "2025-02-14", safe: true },
    { id: 2, type: "Incoming", amount: "100.00", date: "2025-02-13", safe: true },
    { id: 3, type: "Outgoing", amount: "1000.00", date: "2025-02-12", safe: false },
  ]

  const getCurrentGuard = useCallback(async () => {
    if (!publicClient) return;
    const guardAddress = await publicClient.getStorageAt({
      address: userAddress as `0x${string}`,
      slot: process.env.NEXT_PUBLIC_GUARD_STORAGE_SLOT as `0x${string}`
    });
    if (!guardAddress) return;
    setCurrentGuard(getAddress('0x' + guardAddress.slice(-40)));
  }, [publicClient, userAddress]);

  const handleSetupGuard = async () => {
    try {
      setIsSetupLoading(true);
      
      console.log({
        abi: SafeGuardABI,
        address: userAddress as `0x${string}`,
        functionName: 'setGuard',
        args: [process.env.NEXT_PUBLIC_SAFE_GUARD_ADDRESS as `0x${string}`],
      })

      console.log("Setting up guard...", process.env.NEXT_PUBLIC_SAFE_GUARD_ADDRESS as `0x${string}`)

      const simulation = await simulateContract(wagmiConfig, {
        abi: SafeGuardABI,
        address: userAddress as `0x${string}`,
        functionName: 'setGuard',
        args: [process.env.NEXT_PUBLIC_SAFE_GUARD_ADDRESS as `0x${string}`],
      });

      console.log("Simulation result:", simulation)

      writeSetupGuard({
        abi: SafeGuardABI,
        address: userAddress as `0x${string}`,
        functionName: 'setGuard',
        args: [process.env.NEXT_PUBLIC_SAFE_GUARD_ADDRESS as `0x${string}`],
      });

      setIsAlertSetupOpen(true);
      console.log("Guard setup complete")
    } catch (error) {
      toast({
        title: "Error setting up guard",
        description: "Please try again",
        variant: "default",
      })
      console.error("Error setting up guard:", error)
    } finally {
      setIsSetupLoading(false);
    }
  }

  useEffect(() => {
    if (!userAddress) return;
    getCurrentGuard();
  }, [userAddress, getCurrentGuard]);

  return (
    <main>
      <Dialog open={isAlertSetupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
            <DialogDescription>Please confirm the transaction setup in your safe account dashboard</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <ClientWrapper>
        <div>
          {isConnected && (
            <div className="flex-grow flex items-center justify-center">
              {currentGuard === getAddress('0x0000000000000000000000000000000000000000') && (
                <Card className="w-full max-w-2xl bg-black bg-opacity-30 backdrop-blur-md border border-indigo-500/20 shadow-xl overflow-hidden">
                  <div className="p-8 space-y-6 relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div
                        className="absolute inset-0 bg-repeat bg-center"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                        }}
                      ></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 space-y-6">
                      <h1 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                        MalGuard Setup
                      </h1>

                      <div className="text-center space-y-4">
                        <Shield className="mx-auto h-20 w-20 text-indigo-400 animate-pulse" />
                        <p className="text-xl text-indigo-100 font-semibold">On-chain protection for your on-chain activities</p>
                        <p className="text-md text-indigo-200">
                          Activate MalGuard to transform you Safe Account into truly SAFE Account
                        </p>
                      </div>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 text-lg rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
                              size="lg"
                              onClick={handleSetupGuard}
                              disabled={isSetupLoading}
                            >
                              {isSetupLoading ? "Setting up..." : "Setup MalGuard"}
                              {!isSetupLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Click to activate MalGuard protection</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <div className="text-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="link" className="text-indigo-300 hover:text-indigo-100">
                                <Info className="h-4 w-4 mr-1" />
                                Learn more about MalGuard
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Discover how MaleGuard enhances your Safe security</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
              {(currentGuard && currentGuard !== getAddress('0x0000000000000000000000000000000000000000')) && (
                <div className="space-y-8 min-w-[1000px]">
                  {/* Success Message Section */}
                  <div className="bg-green-900 bg-opacity-20 border-1 border-solid border-green-500 p-6">
                    <div className="flex items-center space-x-4">
                      <Shield className="h-10 w-10 text-green-400" />
                      <div>
                        <h2 className="text-xl font-semibold text-green-300">MaleGuard Protection Active</h2>
                        <p className="text-green-200">Your Safe account is protected by MaleGuard.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {
            !isConnected && <div className="flex flex-col items-center gap-2">
              <h4 className="text-3xl text-center">Connect Wallet</h4>
              <p className="text-lg font-light mb-4">Please connect your wallet to use this service</p>
              <ConnectButton />
            </div>
          }
        </div>
      </ClientWrapper>
    </main>
  );
};

export default Home;
