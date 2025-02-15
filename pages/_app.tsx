import Header from "@/components/header/header";
import { Toaster } from "@/components/toaster/toaster";
import { wagmiConfig } from "@/configs/wagmi";
import {
  darkTheme,
  RainbowKitProvider
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          initialChain={arbitrumSepolia}
          theme={darkTheme({
            accentColor: 'white',
            accentColorForeground: 'black',
          })}
        >
          <ThemeProvider
            disableTransitionOnChange
            attribute="class"
            value={{ light: "light", dark: "dark" }}
            defaultTheme="system"
          >
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-950 text-white flex flex-col">
              <Header />
              <Component {...pageProps} />
              <Toaster />
            </div>
          </ThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
