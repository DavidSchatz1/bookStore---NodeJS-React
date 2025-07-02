import { useState } from 'react';
import PaginationWrapper from '../../services/PaginationWrapper';
import { useAuth } from '../../context/AuthContext';
import { useBooks } from '../../context/BookContext';
import AddBookForm from '../Admin/AddBookForm';
import BookGridWithButtons from './BookGridWithButtons';

function BookList() {
  const { isAdmin } = useAuth();
  const { books } = useBooks();

  //searching
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(book => {
    const searchLower = searchTerm.toLowerCase();
    const titleLower = book.title.toLowerCase();
    const authorLower = book.author.toLowerCase();
    return titleLower.includes(searchLower) || authorLower.includes(searchLower);
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="סנן לפי כותרת או מחבר"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <PaginationWrapper items={filteredBooks} itemsPerPage={6}>
        {(currentBooks) => (
          <BookGridWithButtons books={currentBooks} />
        )}
      </PaginationWrapper>

      {isAdmin && <AddBookForm />}
    </div>
  )
}

export default BookList