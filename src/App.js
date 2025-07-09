import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Profile from './pages/Profile';
import CommentsDashboard from './pages/CommentsDashboard';
import Header from './components/Header';

import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<CommentsDashboard/>}/>
        <Route path='/profile' element={<Profile />}/>
      </Routes>
    </Router>
  );
}

export default App;
