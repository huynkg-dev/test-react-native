import { ListResponse, ListMovieParam, Movie, Recommendation, MovieCreditsResponse, Account } from '@/models/movie-models';
import AXIOS from './axios-instance';
import { MovieDetail } from '@/models';

export const MOVIE_API = {
  listMovies(param: ListMovieParam): Promise<ListResponse<Movie>> {
    let api = '';
    switch (param.tag) {
      case 'POP':
        api = 'movie/popular?language=en-US&page=';
        break;
      case 'PLAY':
        api = 'movie/now_playing?language=en-US&page=';
        break;
      case 'UP':
        api = 'movie/upcoming?language=en-US&page=';
        break;
    };
    return AXIOS.get(`${api}${param.page}`);
  },
  detailMovie(id: number): Promise<MovieDetail> {
    const api = `movie/${id}?language=en-US`;
    return AXIOS.get(api);
  },
  credits(id: number): Promise<MovieCreditsResponse> {
    const api = `movie/${id}/credits?language=en-US`;
    return AXIOS.get(api);
  },
  recommendations(id: number): Promise<ListResponse<Recommendation>> {
    const api = `movie/${id}/recommendations?language=en-US&page=1`;
    return AXIOS.get(api);
  },
  account(): Promise<ListResponse<Account>> {
    const api = 'account/22186228';
    return AXIOS.get(api);
  },
};
