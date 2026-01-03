import { useEffect, useState } from "react";
import api from "../services/api";

interface Voter {
  name: string;
  linkedinProfile?: string;
}

export default function VotersList() {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/vote/voters")
      .then((res) => {
        setVoters(res.data);
      })
      .catch(() => {
        setError("Failed to load voters");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center">Loading voters...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Voters List</h2>

      {voters.length === 0 ? (
        <p>No voters found</p>
      ) : (
        <ul className="divide-y">
          {voters.map((voter, index) => (
            <li key={index} className="py-3">
              {voter.linkedinProfile ? (
                <a
                  href={voter.linkedinProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:underline"
                >
                  {voter.name}
                </a>
              ) : (
                <p className="font-medium">{voter.name}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
