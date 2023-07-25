import { useSelector } from "react-redux";

function UserConected() {
  const accountAdrress = useSelector((state) => state.accounts);
  const balance = useSelector((state) => state.balance);
  console.log(balance);
  return (
    <div>
      <p>{balance}</p>
      <p>{accountAdrress}</p>
    </div>
  );
}

export default UserConected;
