import React, { useState } from 'react';
import axios from 'axios';

const WishlistForm = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [priority, setPriority] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/createWish', {
      itemName,
      description,
      link,
      priority,
      createdAt,
    })
    .then((result) => {
      console.log(result);
      if (!priority) {
        alert('Please select a priority');
      } else {
        alert('Wish added successfully!');
        setItemName('');
        setDescription('');
        setLink('');
        setPriority('');
        setCreatedAt('');
      }
    })
    .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add to Wishlist</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Item Name</label>
          <input
            type="text"
            placeholder="Enter item name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            placeholder="Write a short description"
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Product Link</label>
          <input
            type="url"
            placeholder="https://example.com/product"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Priority</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="" disabled>Select Priority</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Date & Time</label>
          <input
            type="datetime-local"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Add to Wishlist
        </button>
      </form>
    </div>
  );
};

export default WishlistForm;
