import Book from '../models/book.model.js';

export const createBook = async (req, res) => {
  try {
    const book = await Book.create({ ...req.body, user: req.user._id });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({}).populate('user');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    console.log();
    if (req.user._id.toString() != book.user.toString()) {
      return res
        .status(401)
        .json({ message: 'you can only delete your own book' });
    }

    await Book.findByIdAndDelete(req.params.id);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};
