export interface ListParam {
  offset: number;
  limit: number;
};

export interface ListResponse<T> {
  data: T[];
  hasNextPage: boolean;
};

export interface Movie {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
};

export interface UserScore {
  percentage: number;
  label: string;
}

export interface CrewMember {
  name: string;
  role: string;
}

export interface Recommendation {
  id: number;
  title: string;
  rating: number;
  image: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  image: string;
}

export interface MovieDetail {
  title: string;
  year: string;
  image: string;
  rating: string;
  releaseDate: string;
  contentRating: string;
  duration: string;
  genres: string[];
  status: string;
  originalLanguage: string;
  posterImage: string;
  userScore: UserScore;
  tagline: string;
  crew: CrewMember[];
  overview: string;
  cast: CastMember[];
  recommendations: Recommendation[];
}