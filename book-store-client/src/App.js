import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchResults';
import NotFoundPage from './pages/NotFoundPage';
import AdminBookForm from './Components/Admin/AdminBookForm';
import './styles/styles.scss';
import BookPage from './Components/Books/BookPage';
import CartPage from './Components/Cart/CartPage';
import BookListPage from './pages/BookListPage';
import NotificationModal from './Components/Common/NotificationModal';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import { useAuth } from './context/AuthContext';
import AdminLoginPage from './pages/AdminLoginPage';
import SignUpPage from './pages/signUpPage';



function App() {
  const { isAdmin } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/book/:id" element={<BookPage />} />
        <Route path="/books" element={<BookListPage />} />
        {
          isAdmin && <Route path="/adminbookform" element={<AdminBookForm />} />
        }
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/adminlogin" element={<AdminLoginPage />} />
        <Route path='/signuppage' element={<SignUpPage />} />
      </Routes>

      <NotificationModal />
    </>
  );
}

export default App;
