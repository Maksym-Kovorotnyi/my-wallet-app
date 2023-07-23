function TransactionForm() {
  return (
    <div>
      <form>
        <input type="text" placeholder="please enter the wallet address" />
        <input type="text" placeholder="please enter the transfer amount" />
        <button type="submit">transfer money</button>
      </form>
    </div>
  );
}

export default TransactionForm;
