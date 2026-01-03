import { Linkedin } from "lucide-react";
import { Candidate } from "../types";

interface CandidateCardProps {
  candidate: Candidate;
  hasVoted: boolean;
  onVote: (candidateId: string) => void;
}

export default function CandidateCard({
  candidate,
  hasVoted,
  onVote,
}: CandidateCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
        hasVoted ? "opacity-80" : ""
      }`}
    >
      {/* ================= Avatar ================= */}
      <div className="flex justify-center items-center my-6">
        {candidate.image ? (
          <img
            src={candidate.image}
            alt={candidate.name}
            className="w-24 h-24 rounded-full object-cover bg-gray-100"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
            {candidate.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
        )}
      </div>

      {/* ================= Content ================= */}
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          {candidate.name}
        </h2>

        {/* Vote count */}
        <p className="text-sm text-gray-500 mb-4">
          Votes received:{" "}
          <span className="font-semibold">{candidate.voteCount}</span>
        </p>

        {/* ================= Actions ================= */}
        {hasVoted ? (
          <div className="bg-gray-100 text-gray-600 py-3 rounded-full font-medium">
            Already Voted
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => onVote(candidate._id)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-full transition-colors shadow-md"
            >
              Vote
            </button>

            {candidate.linkedinProfile && (
              <a
                href={candidate.linkedinProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 border-2 rounded-full hover:bg-[#0A66C2] hover:text-white transition-colors"
                style={{ borderColor: "#0A66C2", color: "#0A66C2" }}
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
