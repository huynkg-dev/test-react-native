import { ListParam, ListResponse, Movie, MovieDetail } from '@/models';

const LIST_MOVIES: Movie[] = [
  {
    'id': 1,
    'title': 'Barbie',
    'date': '19 July 2023',
    'description': 'Barbie and Ken are having the time of their lives in the colorful and...',
    'image': require('@/assets/images/movies/iuFNMS8U5cb6xfzi51Dbkovj7vM (1) 1.webp')
  },
  {
    'id': 2,
    'title': 'The Flash',
    'date': '13 June 2023',
    'description': 'When his attempt to save his family inadvertently alters the future, Barr...',
    'image': require('@/assets/images/movies/rktDFPbfHfUbArZ6OOOKsXcv0Bm 1.webp')
  },
  {
    'id': 3,
    'title': 'The Little Mermaid',
    'date': '18 May 2023',
    'description': 'The youngest of King Triton\'s daughters, and the most defiant...',
    'image': require('@/assets/images/movies/ym1dxyOk4jFcSl4Q2zmRrA5BEEN 1.webp')
  },
  {
    'id': 4,
    'title': 'Guardians of the Galaxy Vol. 3',
    'date': '3 May 2023',
    'description': 'Peter Quill, still reeling from the loss of Gamora, must rally his team...',
    'image': require('@/assets/images/movies/r2J02Z2OpNTctfOSN1Ydgii51I3 1.webp')
  },
  {
    'id': 5,
    'title': 'Ruby Gillman, Teenage Kraken',
    'date': '28 June 2023',
    'description': 'Ruby Gillman, a sweet and awkward high school student...',
    'image': require('@/assets/images/movies/kgrLpJcLBbyhWIkK7fx1fM4iSvf 1.webp')
  }
];

const MOVIE_DETAIL: MovieDetail = {
  'title': 'Barbie',
  'year': '2023',
  'image': require('@/assets/images/movies/iuFNMS8U5cb6xfzi51Dbkovj7vM (1) 1.webp'),
  'rating': 'PG13',
  'releaseDate': '20/07/2023',
  'contentRating': 'SG',
  'duration': '1h 54m',
  'genres': ['Comedy', 'Adventure', 'Fantasy'],
  'status': 'Released',
  'originalLanguage': 'English',
  'posterImage': '',
  'userScore': {
    'percentage': 74,
    'label': 'User Score'
  },
  'tagline': 'She\'s everything. He\'s just Ken.',
  'crew': [
    {
      'name': 'Greta Gerwig',
      'role': 'Director, Writer'
    },
    {
      'name': 'Noah Baumbach',
      'role': 'Writer'
    }
  ],
  'overview': 'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.',
  'cast': [
    {
      'id': 1,
      'name': 'Margot Robbie',
      'character': 'Barbie',
      'image': ''
    },
    {
      'id': 2,
      'name': 'Ryan Gosling',
      'character': 'Ken',
      'image': ''
    },
    {
      'id': 3,
      'name': 'America Ferrera',
      'character': 'Gloria',
      'image': ''
    },
    {
      'id': 4,
      'name': 'Kate McKinnon',
      'character': 'Barbie',
      'image': ''
    },
    {
      'id': 5,
      'name': 'Ariana Greenblatt',
      'character': 'Sasha',
      'image': ''
    },
    {
      'id': 6,
      'name': 'Michael Cera',
      'character': 'Allan',
      'image': ''
    },
    {
      'id': 7,
      'name': 'Will Ferrell',
      'character': 'Mattel CEO',
      'image': ''
    },
    {
      'id': 8,
      'name': 'Issa Rae',
      'character': 'Barbie',
      'image': ''
    },
    {
      'id': 9,
      'name': 'Alexandra Shipp',
      'character': 'Barbie',
      'image': ''
    }
  ],
  'recommendations': [
    {
      'id': 1,
      'title': 'Kingdom 3: the Flame of Fate',
      'rating': 76,
      'image': ''
    },
    {
      'id': 2,
      'title': 'Oppenheimer',
      'rating': 83,
      'image': ''
    },
    {
      'id': 3,
      'title': 'The Flash',
      'rating': 69,
      'image': ''
    }
  ],
};

const getListMovies = (params: ListParam): Promise<ListResponse<Movie>> => {
  return new Promise((resolve) => {
    const start = params.offset * params.limit;
    const end = start + params.limit;
    setTimeout(() => {
      resolve({
        data: LIST_MOVIES.slice(start, end),
        hasNextPage: end < LIST_MOVIES.length
      });
    }, 1000);
  });
};

const getMovieDetail = (): Promise<MovieDetail> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOVIE_DETAIL);
    }, 1000);
  });
};

export default { getListMovies, getMovieDetail };  