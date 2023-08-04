import axios from 'axios';

const MOVIES_API = 'https://api.themoviedb.org/3/search/movie';
const LATEST_MOVIES_API = "https://api.themoviedb.org/3/movie/now_playing";
const POPULAR_MOVIES_API = "https://api.themoviedb.org/3/movie/popular";
const TOP_MOVIES_API = "https://api.themoviedb.org/3/movie/top_rated";
const UPCOMING_MOVIES_API = "https://api.themoviedb.org/3/movie/upcoming";
const MOVIE_DETAILS = "https://api.themoviedb.org/3/movie/";
const API_KEY = "ffdfb660a1488ae7f304368f73e0e7ec";

// loading video
export const findMovieVideo = async (movieId) => {
  const response = await axios.get(MOVIE_DETAILS + movieId + "/videos", {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.results[0].key;
};

// loading search results
export const findMovies = async (searchParams) => {
  const { title } = searchParams;

  const response = await axios.get(MOVIES_API, {
    params: {
      api_key: API_KEY,
      query: title,
    },
  });
  const movies = response.data;
  return movies;
}

// movie details
export const findMovieDetails = async (id) => {
  const [movieDetailsResponse, creditsResponse] = await Promise.all([
    axios.get(`${MOVIE_DETAILS}${id}`, {
      params: { api_key: API_KEY } }),
    axios.get(`${MOVIE_DETAILS}${id}/credits`, {
      params: { api_key: API_KEY },
    }),
  ]);

  const movieDetails = movieDetailsResponse.data;
  const credits = creditsResponse.data;

  const uniqueCrew = credits.crew
    .filter((crew) => crew.profile_path)
    .reduce((acc, crew) => {
      if (!acc.some((c) => c.id === crew.id)) {
        acc.push(crew);
      }
      return acc;
    }, [])
    .slice(0, 4);

  return {
    ...movieDetails,
    cast: credits.cast.slice(0, 4).filter((cast) => cast.profile_path),
    crew: uniqueCrew,
  };
};


// displaying carousels
async function loadResults(movie_api, pages) {
  let movieList = [];
  for (let i = 1; i <= pages; i++) {
    const response = await axios.get(movie_api, {
      params: {
        api_key: API_KEY,
        page: i,
      },
    });
    movieList.push(...response.data.results);
  }
  return movieList;
}

async function queryMovieHelper(movie_api, pages) {
  return (await loadResults(movie_api, pages)).filter(
    (movie) => !movie.genre_ids.includes(27) && movie.backdrop_path != null
  );
}

export const findLatestMovies = async () => {
  return await queryMovieHelper(LATEST_MOVIES_API, 1);
};

export const findPopularMovies = async () => {
  return await queryMovieHelper(POPULAR_MOVIES_API, 1);
};

export const findTopMovies = async () => {
  return (await queryMovieHelper(TOP_MOVIES_API, 1));
};

export const findUpcomingMovies = async () => {
  return (await queryMovieHelper(UPCOMING_MOVIES_API, 5))
    .filter((movie) => movie.vote_count === 0)
    .slice(0, 16);
};

// audience reviews
export const findAudienceReviews = async (id) => {
  return (await loadResults(MOVIE_DETAILS + id + "/reviews", 1)).slice(0, 2);
};