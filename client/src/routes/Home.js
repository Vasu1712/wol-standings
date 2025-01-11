import React from 'react';
import { Link } from 'react-router-dom';
import StandingsContainer from './Standings';

const year = new Date().getFullYear();
const Home = () => {
  
  return (
    <div className="min-h-screen bg-gradient-to-tl from-bg1 via-bg2 to-bg1 text-white flex flex-col">
      <div className="flex flex-1 flex-col md:flex-col items-center justify-center pt-8">
      <h1 className="text-3xl sm:text-7xl  font-normal text-transparent bg-clip-text bg-gradient-to-b from-white to-reallavender">Crewticism Standings</h1>
      <StandingsContainer/>
      </div>
      <footer className="p-4 text-center text-gray-500">
        <p>&copy; {year} WoL. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
