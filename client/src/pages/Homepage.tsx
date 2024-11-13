import { toast } from 'react-toastify';

import useUsers from '../hooks/useUsers';
import { api } from '../api';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

interface Book {
  _id: string;
  title: string;
  image: string;
}

const Homepage = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get<Book[]>('/books', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setBooks(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const { id } = jwtDecode(localStorage.getItem('token')!);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message);
      } else {
        toast.error('something went wrong');
      }
    }
  };

  return (
    <>
      <main className="p-8">
        <h2 className="text-2xl text-center bg-pink-600 py-4 rounded text-white">
          Explore All Books but You can only delete your own books.
        </h2>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {books?.map((book) => (
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={book._id}>
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="object-cover object-center w-full h-full block"
                      src={book.image || 'https://dummyimage.com/420x260'}
                    />
                  </a>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {book.title}
                      </h2>
                      <div>Author: {book?.user?.name}</div>
                    </div>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="bg-red-400 text-white py-2 px-4 rounded text-xs "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Homepage;
