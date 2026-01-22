import { Linkedin } from "lucide-react";
import { Candidate } from "../types";

interface CandidateCardProps {
  candidate: Candidate;
  hasVoted: boolean;
  onVote: (candidateId: string) => void;
}

// 🔹 Simple frontend-only description mapping
const getDescription = (name: string) => {
  if (name === "Gloria Steephan") {
    return "Backend Developer focused on server-side logic and secure application functionality.";
  }
  if (name === "Chrismon P Liju") {
    return "Frontend Developer focused on building clean and user-friendly interfaces.";
  }
  return "";
};

export default function CandidateCard({
  candidate,
  hasVoted,
  onVote,
}: CandidateCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg transition-all duration-300 p-6 text-center">
      
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
          {candidate.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>
      </div>

      {/* Name + LinkedIn icon */}
      <div className="flex items-center justify-center gap-2 mb-1">
        <h2 className="text-xl font-semibold text-gray-900">
          {candidate.name}
        </h2>

        {candidate.linkedinProfile && (
          <a
            href={candidate.linkedinProfile}
            target="_blank"
            rel="noopener noreferrer"
            title="View LinkedIn Profile"
            className="text-[#0A66C2] hover:text-[#004182]"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        )}
      </div>

      {/* 🔹 Profile description */}
      <p className="text-sm text-gray-600 mb-3">
        {getDescription(candidate.name)}
      </p>

      {/* Votes */}
      <p className="text-sm text-gray-500 mb-4">
        Votes received:{" "}
        <span className="font-semibold">{candidate.voteCount}</span>
      </p>

      {/* Vote / Status */}
      {hasVoted ? (
        <div className="bg-gray-100 text-gray-600 py-2 rounded-full font-medium">
          Already Voted
        </div>
      ) : (
        <button
          onClick={() => onVote(candidate._id)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full"
        >
          Vote
        </button>
      )}
    </div>
  );
}
