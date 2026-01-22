export interface Candidate {
  _id: string;
  name: string;
  voteCount: number;
  linkedinProfile?: string;
  image?: string;
}


export interface User {
  id: string;
  name: string;
  email: string;
  hasVoted: boolean;        
  linkedinProfile?: string;
  avatar?: string;
}


export interface Voter {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  votedAt: string;
  candidateName: string;
  linkedin?: string;
}



