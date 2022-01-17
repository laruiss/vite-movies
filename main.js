import "normalize.css";

const apiKey = "b0a2dad";

const baseApiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=`;

const imdbUrl = "https://www.imdb.com";
const imdbTitleUrl = imdbUrl + "/title/";

const $ce = (tag) => document.createElement(tag);

function fetchMovies(search) {
  const searchUrl = baseApiUrl + search;
  console.log("searchUrl");
  fetch(searchUrl)
    .then((res) => (console.log(res), res))
    .then((res) => res.json())
    .then((data) => (console.log(data), data))
    .then((searchResult) => {
      const moviesEls = searchResult.Search.map((movie) => {
        const liEl = $ce("li");
          $(`<a href="${imdbTitleUrl + movie.imdbID}">`)
            .append(`${movie.Title} (${movie.Year})`)
            .appendTo(liEl);
        return liEl;
      });
      const moviesEl = document.querySelector("#movies");
      moviesEl.innerHTML = "";
      moviesEl.append(...moviesEls);
    })
    .catch((error) => {
      console.log("Test");
      console.error(error);
    });
}

document.querySelector("#app").innerHTML = `
  <form id="search-form">
    <label for="search"> Search : </label>
    <input type="text" id="search" name="search">
    <input type="submit" value="Go"/>
  </form>
  <ul id="movies"></ul>
`;

const createElFromHtml = (htmlPart) => {
  // 1
  const div = document.createElement("div");
  // 2
  div.innerHTML = htmlPart;
  // 3
  return div.firstElementChild;
};

const domProto = {
  addEvent(eventType, callback) {
    this.els.forEach((el) => el.addEventListener(eventType, callback));
  },
  append(...nodes) {
    console.log(this.els)
    this.els.forEach((el) => el.append(...nodes));
    console.log(this.els);
    return $(this.els);
  },
  appendTo(targetEl) {
    this.els.forEach((el) => targetEl.append(el));
    console.log(this.els);
    return $(this.els);
  },
  val() {
    if (this.els.length === 0) {
      return null;
    }
    return this.els[0].value;
  }
};

const $ = (selector) => {
  const els =
    typeof selector === "object"
      ? selector
      : selector.startsWith("<")
      ? [createElFromHtml(selector)]
      : [...document.querySelectorAll(selector)];

  const wrapper = Object.create(domProto)
  wrapper.els = els
  return wrapper
};

$("#search-form").addEvent("submit", (event) => {
  event.preventDefault();
  fetchMovies($("#search").val());
});
