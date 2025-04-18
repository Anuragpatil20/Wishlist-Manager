import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WishlistList = () => {
  const [items, setItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get('http://localhost:3001')
      .then((result) => setItem(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handelDelete = (id) => {
    axios
      .delete('http://localhost:3001/Delete/' + id)
      .then((res) => {
        console.log(res);
        alert('Wish is Deleted Successfully...');
      })
      .catch((error) => console.log(error));
    window.location.reload();
  };

  // Logic for slicing the items based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for changing the page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Number of pages to display
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {items.length === 0 ? (
        <p className="text-gray-500 text-center">No items in your wishlist.</p>
      ) : (
        <div>
          <ul className="space-y-6">
            {currentItems.map((item) => (
              <li
                key={item?.id || Math.random()}
                className="flex flex-col bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <h2 className="text-2xl font-semibold text-gray-800">{item?.itemName || 'Unnamed Item'}</h2>
                {item?.description && <p className="text-gray-600 mt-2">{item.description}</p>}
                {item?.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline mt-3"
                  >
                    View Product
                  </a>
                )}
                {item?.priority && (
                  <p className={`mt-3 text-lg font-medium text-${item.priority === 'High' ? 'red' : item.priority === 'Medium' ? 'yellow' : 'green'}-500`}>
                    Priority: {item.priority}
                  </p>
                )}
                <div className="flex gap-4 mt-6">
                  <a
                    href={`/update/${item._id}`}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Edit
                  </a>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={(e) => handelDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <nav>
              <ul className="flex space-x-4">
                {pageNumbers.map((number) => (
                  <li key={number}>
                    <button
                      onClick={() => paginate(number)}
                      className={`px-4 py-2 rounded-lg text-lg ${
                        number === currentPage
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white'
                      }`}
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistList;
