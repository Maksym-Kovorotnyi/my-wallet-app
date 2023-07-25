import { useDispatch, useSelector } from "react-redux";
import { transferToken } from "../../redux/wallet/walletOperations";

function TransactionForm() {
  const isConnect = useSelector((state) => state.isConnected);
  const dispatch = useDispatch();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const transferAdrress = e.currentTarget[0].value;
    const tokensValue = e.currentTarget[1].value;
    dispatch(transferToken({ adrress: transferAdrress, value: tokensValue }));
  };
  return (
    <div>
      {isConnect ? (
        <form onSubmit={handleSubmitForm}>
          <input type="text" placeholder="enter the wallet address" />
          <input type="text" placeholder="enter the transfer amount" />
          <button type="submit">Transfer</button>
        </form>
      ) : (
        <p>Please connect to your wallet</p>
      )}
    </div>
  );
}

export default TransactionForm;
