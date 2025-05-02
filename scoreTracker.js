import React, { useState } from "react";

export default function ScoreTracker() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");

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
    updatedPlayers.sort((a, b) => b.total - a.total);
    setPlayers(updatedPlayers);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Score Tracker</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addPlayer}>
          Add
        </button>
      </div>
      <div className="space-y-4">
        {players.map((player, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">{player.name}</span>
              <span className="text-gray-600">Total: {player.total}</span>
            </div>
            <div className="mt-2 flex gap-2">
              <input
                className="border p-1 flex-1"
                type="number"
                placeholder="Add score"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addScore(index, e.target.value);
                    e.target.value = "";
                  }
                }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-500">Scores: {player.scores.join(", ")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
