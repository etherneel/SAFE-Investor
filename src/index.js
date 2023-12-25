import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Saidbar from './component/saidbar';
import Search from './component/searchBar/searchbar'
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <ThirdwebProvider
      supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect()]}
      activeChain="mumbai"
      clientId="6abc9ac7d84af657aa9e36dfe7833cc1"
    >

    <App />
    </ThirdwebProvider>
  </React.StrictMode>
);

const searchRoot =ReactDOM.createRoot(document.getElementById('Search'));
searchRoot.render(
  <React.StrictMode>
    <Search />
  </React.StrictMode>
)

const saidbarRoot = ReactDOM.createRoot(document.getElementById('Saidbar'));
saidbarRoot.render(
  <React.StrictMode>
    <Saidbar />
  </React.StrictMode>
);


