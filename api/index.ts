import { ListParam, ListResponse, Movie, MovieDetail } from '@/models';
import { parse } from 'date-fns';
import _ from 'lodash';

const LIST_MOVIES: Movie[] = [
  {
    'id': 1,
    'title': 'Barbie',
    'date': '19 July 2023',
    'description': 'Barbie and Ken are having the time of their lives in the colorful and...',
    'image': require('@/assets/images/movies/iuFNMS8U5cb6xfzi51Dbkovj7vM (1) 1.webp'),
    'rating': 74,
    'tags': ['PLAY', 'POP']
  },
  {
    'id': 2,
    'title': 'The Flash',
    'date': '13 June 2023',
    'description': 'When his attempt to save his family inadvertently alters the future, Barr...',
    'image': require('@/assets/images/movies/rktDFPbfHfUbArZ6OOOKsXcv0Bm 1.webp'),
    'rating': 62,
    'tags': ['PLAY', 'POP']
  },
  {
    'id': 3,
    'title': 'The Little Mermaid',
    'date': '18 May 2023',
    'description': 'The youngest of King Triton\'s daughters, and the most defiant...',
    'image': require('@/assets/images/movies/ym1dxyOk4jFcSl4Q2zmRrA5BEEN 1.webp'),
    'rating': 31,
    'tags': ['PLAY', 'UP']
  },
  {
    'id': 4,
    'title': 'Guardians of the Galaxy Vol. 3',
    'date': '3 May 2023',
    'description': 'Peter Quill, still reeling from the loss of Gamora, must rally his team...',
    'image': require('@/assets/images/movies/r2J02Z2OpNTctfOSN1Ydgii51I3 1.webp'),
    'rating': 82,
    'tags': ['PLAY', 'UP']
  },
  {
    'id': 5,
    'title': 'Ruby Gillman, Teenage Kraken',
    'date': '28 June 2023',
    'description': 'Ruby Gillman, a sweet and awkward high school student...',
    'image': require('@/assets/images/movies/kgrLpJcLBbyhWIkK7fx1fM4iSvf 1.webp'),
    'rating': 70,
    'tags': ['PLAY', 'UP']
  }
];

const MOVIE_DETAIL: MovieDetail = {
  'id': 1,
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
  'userScore': 74,
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
      'image': require('@/assets/images/movies/euDPyqLnuwaWMHajcU3oZ9uZezR 1.webp')
    },
    {
      'id': 2,
      'name': 'Ryan Gosling',
      'character': 'Ken',
      'image': require('@/assets/images/movies/lyUyVARQKhGxaxy0FbPJCQRpiaW 1.webp')
    },
    {
      'id': 3,
      'name': 'America Ferrera',
      'character': 'Gloria',
      'image': require('@/assets/images/movies/dhiUliLE7dFaqj5BKNQ6x7Wm9uR 1.webp')
    },
    {
      'id': 4,
      'name': 'Kate McKinnon',
      'character': 'Barbie',
      'image': require('@/assets/images/movies/2cNetzianFcxPQbyOQnkAIkKUZE 1.webp')
    },
    {
      'id': 5,
      'name': 'Ariana Greenblatt',
      'character': 'Sasha',
      'image': require('@/assets/images/movies/8xrCTYP8PuHixWzkiX6onJNfw8k 1.webp')
    },
    {
      'id': 6,
      'name': 'Michael Cera',
      'character': 'Allan',
      'image': require('@/assets/images/movies/lFKyW2C7xj7X4nWpOEbVIDGOKrH 1.webp')
    },
    {
      'id': 7,
      'name': 'Will Ferrell',
      'character': 'Mattel CEO',
      'image': require('@/assets/images/movies/xYPM1OOLXZguj4FsgmOzTSUXaXd 1.webp')
    },
    {
      'id': 8,
      'name': 'Issa Rae',
      'character': 'Barbie',
      'image': require('@/assets/images/movies/1tX1T5ZNCMh2KYP1jMgfg8P26vm 1.webp')
    },
    {
      'id': 9,
      'name': 'Alexandra Shipp',
      'character': 'Barbie',
      'image': require('@/assets/images/movies/wOHyVZTP6UzCAALxXEpr0Os6Y5C 1.webp')
    }
  ],
  'recommendations': [
    {
      'id': 1,
      'title': 'Kingdom 3: the Flame of Fate',
      'rating': 76,
      'image': require('@/assets/images/movies/r54HQwvisSXMfip7oJNhPSWyCK5 1.webp')
    },
    {
      'id': 2,
      'title': 'Oppenheimer',
      'rating': 83,
      'image': require('@/assets/images/movies/rLb2cwF3Pazuxaj0sRXQ037tGI1 1.webp')
    },
    {
      'id': 3,
      'title': 'The Flash',
      'rating': 69,
      'image': require('@/assets/images/movies/yF1eOkaYvwiORauRCPWznV9xVvi 1.webp')
    }
  ],
};

const sortList = (data: Movie[], sort: string): Movie[] => {
  switch (sort) {
    case 'ALPHABE':
      return _.orderBy(data,
        [(item) => item.title],
        ['asc']
      );
    case 'RATING':
      return _.orderBy(data,
        [(item) => item.rating],
        ['desc']
      );
    case 'RELEASE':
      return _.orderBy(data,
        [(item) => parse(item.date, 'dd MMMM yyyy', new Date())],
        ['desc']
      );
  }
  return data;
}

const getListMovies = (params: ListParam): Promise<ListResponse<Movie>> => {
  return new Promise((resolve) => {
    const start = params.offset * params.limit;
    const end = start + params.limit;
    const result = LIST_MOVIES
      .filter(e => params.search ? (
        e.title.toLowerCase().includes(params.search.toLowerCase()) || e.description.toLowerCase().includes(params.search.toLowerCase())
      ) : true
        && params.tag ? (
        e.tags.includes(params.tag)
      ) : true
      )
      .slice(start, end);

    setTimeout(() => {
      resolve({
        data: params.sort ? sortList(result, params.sort) : result,
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