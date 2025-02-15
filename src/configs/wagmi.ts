import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'viem';
import {
  arbitrumSepolia,
  Chain,
  sepolia
} from 'wagmi/chains';

const localChain: Chain = {
  id: 31337,
  name: "Anvil",
  nativeCurrency: {
    decimals: 18,
    name: "Anvil Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"],
    },
    public: {
      http: ["http://127.0.0.1:8545"],
    },
  },
  blockExplorers: {
    default: {
      name: "Ganache Explorer",
      url: "https://ganache.renakaagusta.dev",
    },
  },
  testnet: true,
};

const conduitChain: Chain = {
  id: 911867,
  name: "Conduit",
  nativeCurrency: {
    decimals: 18,
    name: "Conduit Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://odyssey.ithaca.xyz"],
    },
    public: {
      http: ["https://odyssey.ithaca.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "Conduit Explorer",
      url: "https://odyssey-explorer.ithaca.xyz",
    },
  },
  testnet: true,
};


export const wagmiConfig = getDefaultConfig({
  appName: 'Malguard',
  projectId: 'c8d08053460bfe0752116d730dc6393b',
  chains: [
    {
      ...sepolia,
      rpcUrls: {
        default: {
          http: ["https://sepolia.infura.io/v3/jBG4sMyhez7V13jNTeQKfVfgNa54nCmF"],
        },
      },
    },
  ],
});