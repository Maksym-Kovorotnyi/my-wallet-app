import { useSelector } from "react-redux";
import UserDisconected from "../UserDisconected/UserDisconected";
import UserConected from "../UserConected/UserConected";

function Header() {
  const isConnect = useSelector((state) => state.isConnected);
  return <div>{isConnect ? <UserConected /> : <UserDisconected />}</div>;
}

export default Header;
