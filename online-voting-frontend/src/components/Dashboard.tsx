import { useEffect, useState } from "react";
import Header from "./Header";
import CandidateCard from "./CandidateCard";
import VotersList from "./VotersList";
import api from "../services/api";
import { User, Candidate } from "../types";

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [currentUser, setCurrentUser] = useState<User>(user);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [showVoters, setShowVoters] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [loading, setLoading] = useState(true);

  const hasVoted = currentUser.hasVoted === true;

  /* =========================
     SYNC USER FROM BACKEND
     (FIXES REFRESH BUG)
     ========================= */
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/auth/me");
        setCurrentUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (err) {
        console.error("Failed to sync user");
      }
    };

    fetchMe();
  }, []);

  /* =========================
     FETCH CANDIDATES
     ========================= */
  const fetchCandidates = async () => {
    try {
      const res = await api.get("/candidates");
      setCandidates(res.data);
    } catch (err) {
      console.error("Failed to fetch candidates", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  /* =========================
     HANDLE VOTE
     ========================= */
  const handleVote = async (candidateId: string) => {
    if (hasVoted) return;

    try {
      await api.post("/vote", { candidateId });

      const updatedUser = { ...currentUser, hasVoted: true };

      // Sync everywhere
      setCurrentUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Refresh candidates to reflect vote count
      fetchCandidates();

      setShowThankYou(true);
    } catch (err: any) {
      alert(err.response?.data?.message || "Voting failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* HEADER */}
      <Header user={currentUser} onLogout={onLogout} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* TOGGLE */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setShowVoters(false)}
            className={`px-6 py-2 rounded-full font-medium ${
              !showVoters
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Candidates
          </button>

          <button
            onClick={() => setShowVoters(true)}
            className={`px-6 py-2 rounded-full font-medium ${
              showVoters
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            View Voters
          </button>
        </div>

        {/* CANDIDATES */}
        {!showVoters && (
          <>
            <h1 className="text-3xl font-bold text-center mb-10">
              Vote for Your Candidate
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {candidates.map((candidate) => (
                <CandidateCard
                  key={candidate._id}
                  candidate={candidate}
                  hasVoted={hasVoted}
                  onVote={handleVote}
                />
              ))}
            </div>

            {hasVoted && (
              <p className="text-center text-green-600 font-medium mt-6">
                You have already voted. Thank you!
              </p>
            )}
          </>
        )}

        {/* VOTERS LIST */}
        {showVoters && <VotersList />}
      </main>

      {/* THANK YOU MODAL */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative text-center">
            <button
              onClick={() => setShowThankYou(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">
                ✅
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2">
              Thank You for Voting!
            </h2>

            <p className="text-gray-600 mb-5">
              Your vote has been successfully recorded.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowThankYou(false);
                  setShowVoters(true);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium"
              >
                View All Voters
              </button>

              <button
                onClick={() => setShowThankYou(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-full font-medium"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              You can vote only once.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
