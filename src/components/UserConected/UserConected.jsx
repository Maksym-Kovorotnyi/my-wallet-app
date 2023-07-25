import { useSelector } from "react-redux";

function UserConected() {
  const accountAdrress = useSelector((state) => state.accounts);
  const balance = useSelector((state) => state.balance);

  const shortAddress = `${accountAdrress.substring(
    0,
    6
  )}...${accountAdrress.substring(accountAdrress.length - 8)}`;

  return (
    <div>
      <p>{balance}</p>
      <p>{shortAddress}</p>
    </div>
  );
}

export default UserConected;
