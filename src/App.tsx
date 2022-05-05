/*
 * @Author: shixuewen friendlysxw@163.com
 * @Date: 2022-05-04 16:52:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-05 14:04:27
 * @FilePath: \app-ts-redux\src\App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const winObj: any = window;
  if (typeof winObj.ethereum === "undefined") {
    return <p>MetaMask is not installed</p>;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [accounts, setAccounts] = useState([]);
  const account = accounts[0];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ethereum = winObj.ethereum;
  const isConnected = ethereum.isConnected();
  const chainId = ethereum.chainId;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const handleAccountsChanged = (accounts: React.SetStateAction<never[]>) => {
      setAccounts(accounts);
    };
    const handleChainChanged = (chainId: React.SetStateAction<string>) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      window.location.reload();
    };
    const handleConnect = (connectInfo: any) => {
      console.log({
        connectInfo,
      });
    };
    const handleDisconnect = (error: any) => {
      console.log({
        disconnectError: error,
      });
    };
    const handleMessage = (message: any) => {
      console.log({
        message,
      });
    };
    ethereum.on("accountsChanged", handleAccountsChanged);
    ethereum.on("chainChanged", handleChainChanged);
    ethereum.on("connect", handleConnect);
    ethereum.on("disconnect", handleDisconnect);
    ethereum.on("message", handleMessage);
    return () => {
      ethereum.removeListener("accountsChanged", handleAccountsChanged);
      ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, [ethereum]);
  const handleConnectWallet = async () => {
    // 钱包账户列表
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setAccounts(accounts);
  };
  ethereum.on("accountsChanged", function (accounts: any) {
    console.log({
      accounts,
      change: true,
    });
  });
  const handleSendEth = () => {
    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: "0x2f318C334780961FB129D2a6c30D0763d9a5C970",
            value: "0x29a2241af62c0000",
            gasPrice: "0x09184e72a000",
            gas: "0x2710",
          },
        ],
      })
      .then((txHash: any) => console.log({ txHash }))
      .catch((error: any) => console.log({ error }));
  };
  const handleWatchAsset = async () => {
    const tokenAddress = "0xd00981105e61274c8a5cd5a88fe7e037d935b513";
    const tokenSymbol = "TUT";
    const tokenDecimals = 18;
    const tokenImage = "http://placekitten.com/200/300";

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log("Thanks for your interest!");
      } else {
        console.log("Your loss!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>
          chainID: <span>{chainId}</span>
        </p>
        <p>
          account: <span>{account}</span>
        </p>
        <p>
          isConnected: <span>{isConnected.toString()}</span>
        </p>
        <button onClick={handleConnectWallet}> 连接以太坊提供者 </button>
        <br />
        <button onClick={handleSendEth}>发起以太坊交易请求</button>
        <br />
        <button onClick={handleWatchAsset}>为钱包添加推荐代币</button>
      </header>
    </div>
  );
}

export default App;
