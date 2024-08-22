import { useState } from 'react';
import Button from './Button';

const FormAddFriend = ({ onAddFriend }) => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('https://i.pravatar.cc/48');

  const handleChangeNameValue = (e) => {
    setName(e.target.value);
  };

  const handleChangeImageUrl = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !imageUrl) return;

    const id = crypto.randomUUID();
    const newFriendObj = {
      id,
      name,
      image: `${imageUrl}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriendObj);

    setName('');
    setImageUrl('https://i.pravatar.cc/48');
  };

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👯‍♀️ Friend name</label>
      <input type="text" value={name} onChange={handleChangeNameValue} />
      <label>🌄 Image URL</label>
      <input type="text" value={imageUrl} onChange={handleChangeImageUrl} />
      <Button>Add</Button>
    </form>
  );
};

export default FormAddFriend;
