import { useState } from 'react';
import Button from './Button';

const FormSplitBill = ({ selectedFriend, onSplitBill }) => {
  const [bill, setBill] = useState('');
  const [paidByUser, setPaidByUser] = useState('');
  const paidByFriend = bill ? bill - paidByUser : '';
  const [whoIsPaying, setWhoIsPaying] = useState('user');

  const handleSetBill = (e) => {
    setBill(Number(e.target.value));
  };

  const handlePaidByUser = (e) => {
    setPaidByUser(
      Number(e.target.value) > bill ? paidByUser : Number(e.target.value),
    );
  };

  const handleWhoIsPaying = (e) => {
    setWhoIsPaying(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser);
  };

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰 Bill value</label>
      <input type="text" value={bill} onChange={handleSetBill} />
      <label>💃 Your expense</label>
      <input type="text" value={paidByUser} onChange={handlePaidByUser} />
      <label>🕺 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />
      <label>🤑 Who is paying the bill</label>
      <select value={whoIsPaying} onChange={handleWhoIsPaying}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split the bill</Button>
    </form>
  );
};

export default FormSplitBill;
