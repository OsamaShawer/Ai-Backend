export interface CommunityOpinion {
  id: string;
  opinion: string;
  createdAt: Date;
}

const communityOpinions: CommunityOpinion[] = [];

export function addOpinion(opinion: string): CommunityOpinion {
  const newOpinion: CommunityOpinion = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    opinion,
    createdAt: new Date(),
  };

  communityOpinions.push(newOpinion);
  return newOpinion;
}

export function getOpinions(): CommunityOpinion[] {
  return communityOpinions;
}
