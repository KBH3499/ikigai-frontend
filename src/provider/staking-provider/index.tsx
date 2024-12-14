import React, { createContext, useState, useContext, useEffect } from "react";

// Create a context for the wallet connect state
const WalletConnectContext = createContext();

// Create a custom hook to use the context
export const useWalletConnect = () => {
  return useContext(WalletConnectContext);
};

const state = {
  unknown: 0,
  notApproved: 1,
  approved: 2,
};

// Provider component to wrap around your app or components where you want the context to be available
export const WalletConnectProvider = ({ children }) => {
  const [isWalletConnectVisible, setIsWalletConnectVisible] = useState(false);
  const [isWalletConnectConfirming, setIsWalletConnectConfirming] =
    useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [approval, setApproval] = useState(state.unknown);

  const askApproval = () => {
    setApproval(state.notApproved);
  };
  const approvalCompleted = () => {
    setApproval(state.approved);
  };

  const closeWalletConnect = () => {
    setIsWalletConnectVisible(false);
  };

  const openWalletConnect = () => {
    setIsWalletConnectVisible(true);
  };

  const closeWalletConnectConfirming = () => {
    setIsWalletConnectConfirming(false);
  };

  const openWalletConnectConfirming = () => {
    setIsWalletConnectConfirming(true);
  };

  const connectedWallet = () => {
    setIsWalletConnected(!isWalletConnected);
  };

  const approvalUnknown=()=>{
    setApproval(state.unknown);
  }

  return (
    <WalletConnectContext.Provider
      value={{
        isWalletConnectVisible,
        openWalletConnect,
        closeWalletConnect,
        isWalletConnectConfirming,
        openWalletConnectConfirming,
        closeWalletConnectConfirming,
        connectedWallet,
        isWalletConnected,
        askApproval,
        approvalCompleted,
        approval,
        setApproval,approvalUnknown,setIsWalletConnected
      }}
    >
      {children}
    </WalletConnectContext.Provider>
  );
};
