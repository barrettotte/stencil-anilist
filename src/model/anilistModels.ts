export interface User {
  username: string;
  id: number;
  anime?: AnimeStats;
  manga?: MangaStats;
};

interface MediaStats {
  count: number;
  meanScore: number;
};

interface AnimeStats extends MediaStats{
  episodesWatched: number;
  minutesWatched: number;
};

interface MangaStats extends MediaStats{
  chaptersRead: number;
  volumesRead: number;
};
