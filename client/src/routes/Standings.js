import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon } from '@iconify/react';
import winner from "../assets/images/winner-icon.svg";
import captain from "../assets/images/captain-armband.svg";

const StandingsContainer = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teamAverages, setTeamAverages] = useState([]);
  const [lastUpdated, setLastUpdated] = useState();
  const [expandedTeams, setExpandedTeams] = useState({}); 
  const [allTime, setallTime] = useState(true);

  // Team data
  const teams = {
    "Nakli Barca": [
      "Koustav Bhattacharyya",
      "Shreyansh Srivastava",
      "Soumik Datta",
      "Sahil Dhawan",
      "Hashim Salim",
      "Abhilash Pani",
    ],

    "G Town Dawgz": [
      "Saswat Biswas",
      "Aaryak Garg",
      "Sambhu Nair",
      "Rohit Gupta",
      "Pranav Arora",
      "Aryan Khosla",
    ],

    "Straw Hat FC": [
      "Aditya Garg", 
      "Mahi G", 
      "Ujjval Chopra", 
      "Kevin Joseph", 
      "Ishaan sindhu",
      "Lovely Chopra",
    ],

    "Gathbandhan FC": [
      "Harsh Kumar", 
      "Rishi Kumar Rai", 
      "Vasu Pal", 
      "Shyamal Jain", 
      "Amrutanshu Tyagi", 
      "Dhruv Jain"
    ],

    "Besharam Behaya David De Gea": [
      "Saksham Singh", 
      "Romil Jaitly", 
      "Kushagra .", 
      "Saksham Tyagi", 
      "Jayant Tokas", 
      "Vatsal Garg"
    ],

    "Dunder Mifflin": [
      "Yashaswee Raman", 
      "Goutam Choudhury", 
      "Rishabh Mishra", 
      "Varad Terdal", 
      "Ashton"
    ],
  };

  const captains = {
    "Nakli Barca": "Koustav Bhattacharyya",
    "G Town Dawgz": "Saswat Biswas",
    "Straw Hat FC": "Aditya Garg",
    "Gathbandhan FC": "Harsh Kumar",
    "Besharam Behaya David De Gea": "Saksham Singh",
    "Dunder Mifflin": "Yashaswee Raman",
  };


  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get(
          "/api/leagues-classic/1453054/standings/?page_new_entries=1&page_standings=1&phase=1"
        );
        console.log(response.data);
        setStandings(response.data.standings.results);
        calculateTeamAverages(response.data.standings.results, "allTime");
        setLoading(false);
        const date = new Date(response.data.last_updated_data);
        setLastUpdated(
          date.toLocaleDateString("en-US", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }) + " (local time)"
        );
      } catch (err) {
        setError("Failed to fetch standings");
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  const calculateTeamAverages = (standingsData, mode) => {
    const teamPoints = {};
    Object.keys(teams).forEach((teamName) => {
      teamPoints[teamName] = { totalPoints: 0, memberCount: 0, members: [] };
    });

    standingsData.forEach((player) => {
      Object.keys(teams).forEach((teamName) => {
        if (teams[teamName].includes(player.player_name)) {
          const points = mode === "allTime" ? player.total : player.event_total;
          teamPoints[teamName].totalPoints += points;
          teamPoints[teamName].memberCount += 1;
          teamPoints[teamName].members.push({ name: player.player_name, points });
        }
      });
    });

    const averages = Object.keys(teamPoints).map((teamName) => {
      const { totalPoints, memberCount } = teamPoints[teamName];
      let normalizedTotal = totalPoints;
      let normalizedCount = memberCount;

      if (memberCount < 6) {
        const averageForAvailableMembers = memberCount > 0 ? totalPoints / memberCount : 0;
        normalizedTotal += averageForAvailableMembers * (6 - memberCount);
        normalizedCount = 6;
      }

      return {
        teamName,
        averagePoints: parseFloat((normalizedTotal / normalizedCount).toFixed(2)),
        members: teamPoints[teamName].members,
      };
    });

    averages.sort((a, b) => b.averagePoints - a.averagePoints);
    setTeamAverages(averages);
  };

  const toggleView = (mode) => {
    setallTime(mode === "allTime");
    calculateTeamAverages(standings, mode);
  };

  const toggleExpand = (teamName) => {
    setExpandedTeams((prevState) => ({
      ...prevState,
      [teamName]: !prevState[teamName],
    }));
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 text-white sm:w-1/2">
      <div className="flex justify-center w-52 sm:w-56 m-auto py-8 ">
        <div className="relative flex w-full p-1 bg-gray-800 rounded-full">
          <span
            className="absolute inset-0 m-1 pointer-events-none"
            aria-hidden="true"
          >
            <span
              className={`absolute inset-0 w-1/2 bg-indigo-600 rounded-full shadow-sm shadow-indigo-950/10 transform transition-transform duration-150 ease-in-out ${
                allTime ? "translate-x-0" : "translate-x-full"
              }`}
            ></span>
          </span>
          <button
            className={`relative flex-1 text-sm font-medium h-8 font-semibold rounded-full focus-visible:outline-none focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${
              allTime ? "text-white" : "text-gray-400"
            }`}
            onClick={() => toggleView("allTime")}
            aria-pressed={allTime}
          >
            All Time
          </button>
          <button
            className={`relative flex-1 text-sm font-semibold h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${
              allTime ? "text-gray-200" : "text-white"
            }`}
            onClick={() => toggleView("currentGW")}
            aria-pressed={allTime}
          >
            Current GW
          </button>
        </div>
      </div>
      <div className="rounded-lg p-4">
        <p className="text-xs sm:text-lg font-light text-tablegray text-center mb-4">
          Last Updated on <span>{lastUpdated}</span>
        </p>
        <div className="space-y-4">
            <div className="rounded-lg text-lg sm:text-xl text-indigo-500 font-light shadow-md backdrop-blur-md p-4 mb-2">
              <div className="flex justify-between">
                <span>Team Name</span>
                <span>Average Points</span>
              </div>
            </div>
        </div>
        <div className="space-y-4">
          {teamAverages.map((team, index) => (
            <div
                key={team.teamName}
                className={`${
                  index === 0 ? 
                    "bg-none text-golden border-golden border rounded-lg shadow-md backdrop-blur-md p-4 relative" 
                    : "bg-white/10 text-white border-white/30 rounded-lg shadow-md backdrop-blur-md p-4 relative"
                }`}
              >
              {index === 0 && allTime && (
                <img
                  src={winner}
                  alt="Winner Icon"
                  className="absolute -left-8 transform -translate-y-1/4 sm:h-24 sm:-left-14 sm:top-1/8 sm:-translate-y-1/2"
                />
              )}
              <div className="flex justify-between text-md sm:text-lg">
                <span>{team.teamName}</span>
                <div className="flex gap-4">
                  <span className="font-semibold">{team.averagePoints}</span>
                  <Icon
                    icon={expandedTeams[team.teamName] ? "si:expand-less-fill" : "si:expand-more-fill"}
                    width="20"
                    className="my-auto cursor-pointer text-reallavender"
                    onClick={() => toggleExpand(team.teamName)}
                  />
                </div>
              </div>
              {expandedTeams[team.teamName] && (
                <div className="mt-4 space-y-2">
                  {team.members.map((member) => {
                    const isCaptain = captains[team.teamName] === member.name;
                    return (
                      <div key={member.name} className="flex justify-between px-2 text-sm items-center">
                        <div className="flex items-center">
                          <span>{member.name}</span> 
                          {isCaptain && (
                            <img
                              src={captain}
                              alt="Captain's Armband"
                              className="ml-2 h-2 sm:h-3"
                            />
                          )}
                        </div>
                        <span>{member.points}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StandingsContainer;
