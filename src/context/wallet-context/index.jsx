import "../../Navbar.css";
import "../../App.css";
import React, { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TrustWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { DarkModeProvider } from "../../provider/theme-provider";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { MusicPlayerProvider } from "../../provider/music-provider";
import { WalletConnectProvider } from "../../provider/staking-provider";


const Context = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const endpoint =
    "https://quiet-flashy-dream.solana-devnet.quiknode.pro/12ecf67b85c5f615f78ab0b3d68d636cf54f679b/";

  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),
      new PhantomWalletAdapter(),
      new TrustWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
      <DarkModeProvider>
        <MusicPlayerProvider>
          <WalletConnectProvider>
            <WalletModalProvider>                        
              {children}
            </WalletModalProvider>
          </WalletConnectProvider>
        </MusicPlayerProvider>
        </DarkModeProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default Context;
