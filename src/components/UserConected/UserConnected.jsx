import { useSelector } from "react-redux";
import css from "./UserConnected.module.css";

function UserConected() {
  const accountAdrress = useSelector((state) => state.accounts);
  const balance = useSelector((state) => state.balance);
  const shortAddress = `${accountAdrress?.substring(
    0,
    6
  )}...${accountAdrress?.substring(accountAdrress.length - 8)}`;

  return (
    <div className={css.container}>
      <p className={css.text}>{balance}</p>
      <p className={css.text}>{shortAddress}</p>
    </div>
  );
}

export default UserConected;
