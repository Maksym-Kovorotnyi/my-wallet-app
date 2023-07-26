import { useDispatch, useSelector } from "react-redux";
import UserDisconected from "../UserDisconected/UserDisconnected";
import UserConected from "../UserConected/UserConnected";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import css from "./Header.module.css";
import { useEffect } from "react";
import {
  connectToMetaMask,
  getBalance,
} from "../../redux/wallet/walletOperations";
import { disconnected } from "../../redux/wallet/walletSlice";

function Header() {
  const isConnect = useSelector((state) => state.isConnected);
  const accounts = useSelector((state) => state.accounts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isConnect) {
      dispatch(connectToMetaMask());
      dispatch(getBalance(accounts));
    }
  }, [accounts, dispatch, isConnect]);

  const handleLogoClickToDisconnect = () => {
    dispatch(disconnected());
  };

  return (
    <div className={css.container}>
      <Logo onClick={handleLogoClickToDisconnect} className={css.logo} />
      {isConnect ? <UserConected /> : <UserDisconected />}
    </div>
  );
}

export default Header;
