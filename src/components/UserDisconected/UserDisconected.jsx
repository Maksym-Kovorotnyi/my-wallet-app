import { Radio } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  connectToMetaMask,
  getBalance,
} from "../../redux/wallet/walletOperations";

function UserDisconected() {
  const isLoad = useSelector((state) => state.isLoading);
  const accounts = useSelector((state) => state.accounts);
  const dispatch = useDispatch();

  const handleWalletConnect = () => {
    dispatch(connectToMetaMask());
    dispatch(getBalance(accounts));
  };
  return (
    <div>
      {isLoad ? (
        <Radio
          visible={true}
          height="40"
          width="40"
          ariaLabel="radio-loading"
          wrapperStyle={{}}
          wrapperClass="radio-wrapper"
        />
      ) : (
        <button onClick={handleWalletConnect} type="button">
          Connect wallet
        </button>
      )}
    </div>
  );
}

export default UserDisconected;
