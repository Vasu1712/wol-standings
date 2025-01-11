import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './routes/Home.js';
import StandingsContainer from './routes/Standings.js';
import './firebaseConfig';
import './custom.css';
// import ProtectedRoute from './components/ProtectedRoute';

function App() {

	// const [cookie] = useCookies(['token']);
  // const isUserLoggedIn = !!localStorage.getItem('user')
  return (
    <div className='w-screen h-screen font-sfpro'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element=<Home />
          />
          <Route
            path='/standings'
            element=<StandingsContainer />
          />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

