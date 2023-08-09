import axios from 'axios';

const MOVIES_API = 'https://api.themoviedb.org/3/search/movie';
const LATEST_MOVIES_API = "https://api.themoviedb.org/3/movie/now_playing";
const POPULAR_MOVIES_API = "https://api.themoviedb.org/3/movie/popular";
const TOP_MOVIES_API = "https://api.themoviedb.org/3/movie/top_rated";
const UPCOMING_MOVIES_API = "https://api.themoviedb.org/3/movie/upcoming";
const MOVIE_DETAILS = "https://api.themoviedb.org/3/movie/";
const MOVIE_GENRES = "https://api.themoviedb.org/3/genre/movie/list";
const DISCOVER = "https://api.themoviedb.org/3/discover/movie";
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
  let list = [];
  for (let i = 1; i <= pages; i++) {
    const response = await axios.get(movie_api, {
      params: {
        api_key: API_KEY,
        page: i,
      },
    });
    list.push(...response.data.results);
  }
  return list;
}

async function queryMovieHelper(movie_api, pages) {
  return (await loadResults(movie_api, pages)).filter(
    (movie) => !movie.genre_ids.includes(27) && movie.backdrop_path != null
  );
}

export const findLatestMovies = async () => {
  return await queryMovieHelper(LATEST_MOVIES_API, 4);
};

export const findPopularMovies = async () => {
  return await queryMovieHelper(POPULAR_MOVIES_API, 4);
};

export const findTopMovies = async () => {
  return (await queryMovieHelper(TOP_MOVIES_API, 4));
};

export const findUpcomingMovies = async () => {
  return (await queryMovieHelper(UPCOMING_MOVIES_API, 6))
    .filter((movie) => movie.vote_count === 0)
};

// audience reviews
export const findAudienceReviews = async (id) => {
  return (await loadResults(MOVIE_DETAILS + id + "/reviews", 1)).slice(0, 2);
};

// genres
export const findGenres = async () => {
   const response = await axios.get(MOVIE_GENRES, {
     params: {
       api_key: API_KEY,
     },
   });
   return response.data.genres;
};

// loading genre searcg results
export const findGenreMovies = async (id) => {
  const response = await axios.get(DISCOVER, {
    params: {
      with_genres: id,
      api_key: API_KEY,
      sort_by: "revenue.desc"
    },
  });

  const genreList = await findGenres();
  const genreName = genreList.find((genre) => genre.id == id).name;
  return await { name: genreName, list: response.data.results };
};

export const findBlockbusters = async () => {
  let list = [];
  for (let i = 1; i <= 4; i++) {
    const response = await axios.get(DISCOVER, {
      params: {
        api_key: API_KEY,
        sort_by: "revenue.desc",
        page: i,
      },
    });
    list.push(...response.data.results);
  }
  return list.filter((movie) => movie.backdrop_path != null);
};