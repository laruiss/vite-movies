import "normalize.css";

import { $, $$, $ce, $h} from './dom-utils.js'

const apiKey = "b0a2dad";

const baseApiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=`;
const detailApiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=`;

const imdbUrl = "https://www.imdb.com";
const imdbTitleUrl = imdbUrl + "/title/";

const fetchJson = url => fetch(url).then(res => res.json())

function projectMediaToRow ({Title, Year, Director, Actors, Writer, imdbID, imdbRating}) {
  const tds = [
    Title,
    Year,
    Director,
    Actors,
    Writer,
    imdbID,
    imdbRating,
  ].map(str => {
    const td = document.createElement('td')
    td.innerHTML = str
    return td
  })
  const tr = document.createElement('tr')
  tr.append(...tds)
  return tr
}

const createRowsFromObjects = (objects) => {
  return objects.map(projectMediaToRow)
}

function fetchMovies(search) {
  const searchUrl = baseApiUrl + search;
  fetchJson(searchUrl)
    .then((searchResult) => {
      const movieDetails = searchResult.Search
        .map((movie) => fetchJson(detailApiUrl + movie.imdbID))
        return Promise.all(movieDetails)
      })
      .then(moviesDetails => {
        const rows = createRowsFromObjects(moviesDetails)
        const moviesEl = $("#movies");
        moviesEl.innerHTML = "";
        moviesEl.append(...rows);
      })
      .catch((error) => {
        console.error(error);
      });
}

document.querySelector("#app").innerHTML = `
  <form id="search-form">
    <label for="search"> Search : </label>
    <input type="text" id="search" name="search">
    <input type="submit" value="Go"/>
    <label for="filter"> Filter : </label>
    <input type="text" id="filter" name="filter">
  </form>
  <table>
    <caption>Titre du tableau</caption>
    <thead>
      <tr>
        <th>Title</th>
        <th>Year</th>
        <th>Director</th>
        <th>Actors</th>
        <th>Writers</th>
        <th>idmdID</th>
        <th>imdbRating</th>
      </tr>
    </thead>
    <tbody id="movies">
    </tbody>
  </table>
`;

$("#search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  fetchMovies($("#search").value);
});
