export interface User {
  username: string;
  id: number;
  createdAt: Date;
  avatar?: string;
  anime?: AnimeStats;
  manga?: MangaStats;
};

interface MediaStats {
  count: number;
  meanScore: number;
};

export interface AnimeStats extends MediaStats{
  episodesWatched: number;
  minutesWatched: number;
};

export interface MangaStats extends MediaStats{
  chaptersRead: number;
  volumesRead: number;
};
