import { useState } from 'react';
import Button from './Button';
import FriendsList from './FriendsList';
import FormAddFriend from './FormAddFriend';
import FormSplitBill from './FormSplitBill';
import { initialFriends } from '../data/initialData';

const App = () => {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleShowAddFriend = () => {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  };

  const handleAddFriend = (newFriend) => {
    setFriends((friends) => [...friends, newFriend]);
    setShowAddFriend(false);
  };

  const handleSelection = (friend) => {
    setSelectedFriend((currSelected) => (currSelected?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  };

  const handleSplitBill = (differenceValue) => {
    setFriends((friends) => friends.map((friend) => (friend.id === selectedFriend.id
      ? { ...friend, balance: friend.balance + differenceValue }
      : friend)));
    setSelectedFriend(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add friend'}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
};

export default App;
