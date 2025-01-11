// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const StandingsContainer = () => {
//   const [standings, setStandings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStandings = async () => {
//       try {
//         const response = await axios.get('/api/leagues-classic/1453054/standings/?page_new_entries=1&page_standings=1&phase=1');
//         console.log(response);
//         setStandings(response.data.standings.results); // Set the standings from API response
//         setLoading(false); // Loading is done
//       } catch (err) {
//         setError('Failed to fetch standings');
//         setLoading(false);
//       }
//     };

//     fetchStandings();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="p-4 text-white min-h-screen w-1/2">
//       <div className="flex justify-center py-8">
//         <div className="flex items-center space-x-4 bg-white/25 rounded-full p-1">
//           <span className="bg-white text-gray-900 px-4 py-1 rounded-full">GW5</span>
//           <span className="px-4 py-1">All Time</span>
//         </div>
//       </div>

//       {/* Standings Table */}
//       <div className="rounded-lg p-4">
//         <div className="space-y-4">
//           {standings.map((team) => (
//             <div key={team.id} className="bg-white/20 rounded-lg shadow-md backdrop-blur-md border border-white/30 p-4">
//               <div className="flex justify-between">
//                 <span>{team.rank}</span>
//                 <span>{team.entry_name}</span>
//                 <span>{team.player_name}</span>
//                 <span>{team.total}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StandingsContainer;


// return (
//     <div className="p-4 text-white min-h-screen w-1/2">
//       <div className="flex justify-center py-8">
//         <div className="flex items-center space-x-4 bg-white/25 rounded-full p-1">
//           <span className="bg-white text-gray-900 px-4 py-1 rounded-full">Last GW</span>
//           <span className="px-4 py-1">All Time</span>
//         </div>
//       </div>

//       {/* Team Averages Table */}
//       <div className="rounded-lg p-4">
//         <p className="text-lg font-light text-tablegray text-center mb-4">
//           Last Updated on <span>{lastUpdated}</span>
//         </p>
//         <div className="min-w-full">
//           <div className="space-y-4">
//             <div className="rounded-lg text-xl font-light shadow-md backdrop-blur-md p-4 mb-4">
//               <div className="flex justify-between">
//                 <span>Team Name</span>
//                 <span>Average Points</span>
//               </div>
//             </div>
//           </div>
//           <div>
//             <div className="space-y-4">
//               {teamAverages.map((team) => (
//                 <div
//                   key={team.teamName}
//                   className="bg-white/20 rounded-lg shadow-md backdrop-blur-md border border-white/30 p-4"
//                 >
//                   <div className="flex justify-between">
//                     <span>{team.teamName}</span>
//                     <span>{team.averagePoints}</span>
//                     <button
//                         onClick={() => toggleExpand(team.teamName)}
//                         className="ml-4 text-gray-400 hover:text-white"
//                       >
//                         {expandedTeams[team.teamName] ? "▲" : "▼"}
//                     </button>
//                   </div>
//                   {expandedTeams[team.teamName] && (
//                     <div className="mt-4 space-y-2">
//                       {team.members.map((member) => (
//                         <div key={member.name} className="flex justify-between px-2 text-sm">
//                           <span>{member.name}</span>
//                           <span>{member.points}</span>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

