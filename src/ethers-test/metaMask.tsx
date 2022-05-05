/*
 * @Author: your name
 * @Date: 2022-05-05 17:34:51
 * @LastEditTime: 2022-05-05 17:54:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \react-web3-test\src\ethers-test\metaMask.tsx
 */
import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./index.css";
import { ethers } from "ethers";

function MetaMask() {
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

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  console.log({
    provider,
    signer,
  });

  const handleConnectWallet = async () => {};
  const handleSendEth = () => {};
  const handleWatchAsset = async () => {};
  return (
    <div>
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
    </div>
  );
}

export default MetaMask;
