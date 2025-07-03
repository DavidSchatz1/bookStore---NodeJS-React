import { useLocation } from 'react-router-dom';
import Header from '../Components/Common/Header/Header';
import Navbar from '../Components/Common/Nav-bar/Navbar';
import { useBooks } from '../context/BookContext';
import BookGridWithButtons from '../Components/Books/BookGridWithButtons';
import PaginationWrapper from '../services/PaginationWrapper';

const SearchResults = () => {
  const { books } = useBooks();

  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
  );

  return (
    <div className="page-wrapper">
      <Header />
      <Navbar />
      <div className='page-content'>
        <h2>תוצאות חיפוש עבור: {query}</h2>
        {filteredBooks.length > 0 ? (
          <PaginationWrapper items={filteredBooks} itemsPerPage={5}>
            {(currentBooks) => <BookGridWithButtons books={currentBooks} />}
          </PaginationWrapper>
        ) : (
          <p>לא נמצאו תוצאות.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

