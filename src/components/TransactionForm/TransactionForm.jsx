import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transferToken } from "../../redux/wallet/walletOperations";
import { toast } from "react-toastify";
import css from "./TransactionForm.module.css";

function TransactionForm() {
  const isConnect = useSelector((state) => state.isConnected);
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const [tokensValue, setTokensValue] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const transferAdrress = e.currentTarget[0].value;

    if (!/^0x[0-9A-Fa-f]{40}$/.test(transferAdrress) && !tokensValue) {
      toast.error("Check recipient address");
      return;
    } else if (!tokensValue) {
      toast.error("Enter some transfer amount");
      return;
    }

    dispatch(transferToken({ adrress: transferAdrress, value: tokensValue }));
    formRef.current.reset();
    setTokensValue("");
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const formattedValue = value.replace(/[,/]/g, ".");
    setTokensValue(formattedValue);
  };

  return (
    <div className={css.container}>
      {isConnect ? (
        <form ref={formRef} className={css.form} onSubmit={handleSubmitForm}>
          <input
            className={css.input}
            type="text"
            placeholder="enter the wallet address"
          />
          <input
            className={css.input}
            type="text"
            placeholder="enter the transfer amount"
            value={tokensValue}
            onChange={handleChange}
          />
          <button className={css.btn} type="submit">
            Transfer
          </button>
        </form>
      ) : (
        <p className={css.text}>Please connect to your wallet</p>
      )}
    </div>
  );
}

export default TransactionForm;
