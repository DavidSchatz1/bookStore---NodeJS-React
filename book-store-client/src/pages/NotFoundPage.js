import Header from '../Components/Common/Header/Header';
import Navbar from '../Components/Common/Nav-bar/Navbar';

function NotFoundPage() {
  return (
    <div className="page-wrapper">
      <Header></Header>
      <Navbar></Navbar>
      <div className='page-content'>
        <h1>
          404 - לא מצאנו את הדף שחיפשת...
        </h1>
      </div>

    </div>
  )
}

export default NotFoundPage