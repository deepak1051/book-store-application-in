import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../api';

export default function CreateBook() {
  const [bookData, setBookData] = useState({
    title: '',
    image: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const { title, image } = bookData;
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    console.log('running');
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsLoading(true);
      e.preventDefault();

      const { data } = await api.post(`/books`, bookData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log(data);

      toast.success('book created successfully.');

      setIsLoading(false);

      navigate('/');
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || error?.message);
        setIsLoading(false);
        return;
      }
      if (error instanceof Error) {
        console.log(error);
        toast.error(error.message);
        setIsLoading(false);
      } else {
        toast.error('An unexpected error occurred.');
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full my-4">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
          Add New Book
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="name"
            >
              Title
            </label>
            <input
              value={title}
              onChange={onChange}
              id="name"
              name="title"
              type="text"
              placeholder="Your name"
              className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-2">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Image Url
            </label>
            <input
              value={image}
              onChange={onChange}
              name="image"
              id="email"
              type="text"
              placeholder="Your email"
              className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
