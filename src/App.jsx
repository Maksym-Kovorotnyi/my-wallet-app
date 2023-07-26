import Header from "./components/Header/Header";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Header />
      <TransactionForm />
      <ToastContainer />
    </div>
  );
}

export default App;
