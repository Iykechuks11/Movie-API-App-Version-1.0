// AUTHENTICATION DATA FROM THE API
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzljN2RkNjIxNDEyYTVhNmE0MjRjMjE4NTg2MWQ5ZCIsInN1YiI6IjY0YWM1ODlkYjY4NmI5MDE1MDExMDJmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O6IMmxZQiXtUodN6JMTc40UyHerc_jTQuCCdSO14Pto',
  },
};

// API LINK FOR POPULAR MOVIES
const API_URL =
  'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

// API LINK FOR SEARCH
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query="';

// API LINK FOR IMAGE
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;

// ELEMENTS SELECTED FROM THE HTML DOC
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

// EVENT LISTENER ON THE INPUT
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm, options);
    search.value = '';
  } else {
    window.location.reload();
  }
});

// GET INITIAL MOVIES
getMovies(API_URL, options);

async function getMovies(url, options) {
  const res = await fetch(url, options);
  const data = await res.json();

  showMovies(data.results);
  console.log(data);
}

function showMovies(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const { title, id, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
     
        <img src="${IMG_PATH + poster_path}" alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
    
  
  `;
    main.appendChild(movieEl);
  });
}

//
function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}
