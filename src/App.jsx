import { useEffect, useState } from "react";
import { Radio } from "react-loader-spinner";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState("");

  useEffect(() => {
    const connectToMetaMask = async () => {
      // Перевірте, чи MetaMask доступний в браузері
      if (typeof window.ethereum !== "undefined") {
        try {
          // Запитайте дозвіл на підключення до гаманця MetaMask
          // const provider = await detectEthereumProvider();
          // const accounts = await window.ethereum.request({
          //   method: "eth_requestAccounts",
          // });
          // console.log(accounts);
          await window.ethereum.enable();
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          console.log(provider);

          // Отримайте обліковий запис користувача, який використовує MetaMask
        } catch (error) {
          console.error("Помилка підключення до MetaMask: ", error);
        }
      } else {
        console.error("MetaMask не знайдений у вашому браузері.");
      }
    };

    connectToMetaMask();
  }, []);

  return (
    <div>
      <h1>Приклад підключення до гаманця MetaMask</h1>
      {web3 ? (
        <p>Ви підключені до гаманця з адресою: {account}</p>
      ) : (
        <p>Будь ласка, підключіться до гаманця MetaMask</p>
      )}
      <Radio
        visible={true}
        height="80"
        width="80"
        ariaLabel="radio-loading"
        wrapperStyle={{}}
        wrapperClass="radio-wrapper"
      />
    </div>
  );
}

export default App;
