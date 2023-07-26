import { Radio } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  connectToMetaMask,
  getBalance,
} from "../../redux/wallet/walletOperations";
import css from "./UserDisconected.module.css";
import { toast } from "react-toastify";

function UserDisconected() {
  const isLoad = useSelector((state) => state.isLoading);
  const accounts = useSelector((state) => state.accounts);
  const balance = useSelector((state) => state.balance);
  const dispatch = useDispatch();

  const handleWalletConnect = () => {
    dispatch(connectToMetaMask());
    dispatch(getBalance(accounts));
    if (balance !== null) {
      toast.success("Conection success");
    }
  };

  return (
    <div>
      <button className={css.btn} onClick={handleWalletConnect} type="button">
        {isLoad ? (
          <Radio
            visible={true}
            height="20"
            width="20"
            ariaLabel="radio-loading"
            wrapperStyle={{}}
            wrapperClass="radio-wrapper"
          />
        ) : (
          "Connect to wallet"
        )}
      </button>
    </div>
  );
}

export default UserDisconected;
