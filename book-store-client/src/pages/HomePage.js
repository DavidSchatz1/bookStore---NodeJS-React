import Header from '../Components/Common/Header/Header';
import Navbar from '../Components/Common/Nav-bar/Navbar';
import BookList from '../Components/Books/BookList';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function HomePage() {
  const { isAdmin } = useAuth();

  if (isAdmin) {
    return <Navigate to="/adminbookform" />;
  }
  return (
    <div className="page-wrapper">
      <Header></Header>
      <Navbar></Navbar>
      <div className='page-content'>
        <div className='home-page-text'>
          <h1>ברוכים הבאים לחנות הספרים המובילה בישראל</h1>
          <h3>כאן תמצאו מגוון ספרים מדהימים ויוצאי דופן בצורה בלתי רגילה, במחירים מעולים</h3>
          <h3>אז למה אתם מחכים? מלאו את העגלה שלכם בספרים, והתחילו לרכוש!</h3>
        </div>

        <BookList />
      </div>

    </div>
  )
}

export default HomePage