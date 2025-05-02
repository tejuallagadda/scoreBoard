import React, { useState } from "react";

export default function ScoreTracker() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [activePlayerIndex, setActivePlayerIndex] = useState(null); // State to track active player

  const addPlayer = () => {
    if (!name.trim()) return;
    setPlayers([...players, { name, scores: [], total: 0 }]);
    setName("");
  };

  const addScore = (index, score) => {
    const updatedPlayers = [...players];
    const numScore = parseInt(score, 10);
    if (isNaN(numScore)) return;
    updatedPlayers[index].scores.push(numScore);
    updatedPlayers[index].total += numScore;
    setPlayers(updatedPlayers);
  };

  const sortPlayersByScore = () => {
    const sorted = [...players].sort((a, b) => a.total - b.total); // Ascending
    setPlayers(sorted);
  };

  const toggleScores = (index) => {
    setActivePlayerIndex(activePlayerIndex === index ? null : index); // Toggle visibility
  };

  return (
      <div className="min-h-screen p-2 sm:p-4 bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-screen-md bg-white p-4 rounded-lg shadow overflow-hidden">
          <h1 className="text-xl sm:text-2xl font-bold text-center text-blue-700 mb-4">🏆 Score Tracker</h1>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
            <input
                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                placeholder="Enter player name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded shadow text-sm"
                onClick={addPlayer}
            >
              ➕ Add Player
            </button>
            <button
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded shadow text-sm"
                onClick={sortPlayersByScore}
            >
              📊 Sort by Score
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {players.length === 0 ? (
                <p className="col-span-full text-center text-gray-500">No players added yet.</p>
            ) : (
                players.map((player, index) => (
                    <div key={index} className="border border-gray-300 rounded-md p-3 bg-gray-50 hover:bg-gray-100 transition text-sm shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                  <span
                      className="font-bold break-words max-w-[100%] cursor-pointer"
                      title={player.name}
                      onClick={() => toggleScores(index)} // Toggle scores on name click
                  >
                    {player.name}
                  </span>
                        <span className="text-blue-600 text-right">: {player.total}</span>
                      </div>
                      <input
                          className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2"
                          type="number"
                          placeholder="Add score & press Enter"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              addScore(index, e.target.value);
                              e.target.value = "";
                            }
                          }}
                      />
                      {activePlayerIndex === index && player.scores.length > 0 && ( // Display scores if player is active
                          <div className="text-gray-600 mt-1 whitespace-normal break-words">
                            <span className="font-medium">Scores:</span>
                            <div className="text-xs leading-snug mt-1">{player.scores.join(", ")}</div>
                          </div>
                      )}
                    </div>
                ))
            )}
          </div>
        </div>
      </div>
  );
}
