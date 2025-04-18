import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function UpdateWishlist() {
      const {id} = useParams()
      const [itemName, setItemName] = useState('');
      const [description, setDescription] = useState('');
      const [link, setLink] = useState('');
      const [priority, setPriority] = useState('Medium');
      const [createdAt, setCreatedAt] = useState(new Date().toISOString().slice(0, 16))
      const navigate = useNavigate()

      useEffect(() =>{
        axios.get("http://localhost:3001/getWish/"+id)
        .then(result =>{console.log(result)
          setItemName(result.data.itemName)
          setDescription(result.data.description)
          setLink(result.data.link)
          setPriority(result.data.priority)
          setCreatedAt(result.data.createdAt)
        })
        .catch(err => console.log(err))
      }, [])

     const Update = (e) => {
        e.preventDefault()
        axios.put("http://localhost:3001/wishUpdate/"+id, {itemName,description,link,priority,createdAt})
        .then(res => {console.log(res)
            navigate('/wishlist')
        })
        .catch(errr => console.log(errr)) 
     }

  return (
    <div>
    
    <form  className="space-y-4 mb-6" onSubmit={Update}>
    <input
      type="text"
      placeholder="Item Name"
      className="w-full p-2 border rounded"
      value={itemName}
      onChange={(e) => setItemName(e.target.value)}
      required
    />
    <textarea
      placeholder="Description"
      className="w-full p-2 border rounded"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
    <input
      type="url"
      placeholder="Product Link (optional)"
      className="w-full p-2 border rounded"
      value={link}
      onChange={(e) => setLink(e.target.value)}
    />
    <select
      className="w-full p-2 border rounded"
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
    >
      <option value="High">High Priority</option>
      <option value="Medium">Medium Priority</option>
      <option value="Low">Low Priority</option>
    </select>
    <input
    type="datetime-local"
    className="w-full p-2 border rounded"
    value={createdAt}
    onChange={(e) => setCreatedAt(e.target.value)}
  />
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
     
    >
      Update Wishlist
    </button>
  </form>

    </div>
  )
}

export default UpdateWishlist