/**
 * @constructor Movies
 * @description everything needed to receive from API and render information in HTML
 */

let Movies = function (type) {
  this.myAPIkey = "599733411a8825ab5d83eb79fbc0e3ce";
  this.fetchType = type;
};

/**
 * @async
 * @function popMovieTitlesAPI
 * @description Download data from API to receive top-rated movies
 */

Movies.prototype.popMovieTitlesAPI = async function () {
  var data123;
  var checkNetworkConn = window.navigator.onLine; //boolean
  var errorText = document.getElementById("topViewedText");
  if (checkNetworkConn != true) {
    errorText.innerHTML = "Connection error, please check your network and reload the page!";
    errorText.style.color = "red";
    errorText.style.marginTop = "200px";
    return;
  }
  const response = await fetch(`https://api.themoviedb.org/3/discover/${this.fetchType}?api_key=${this.myAPIkey}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      } else {
        throw Error(res.status + " " + res.statusText);
      }})
    .then(function (data) {
      data123 = data;
    })
    .catch(err => console.log(err));
    
  this.getMovies(data123);
};

/**
 * @function getPopularMovies
 * @param {*} data - receives an JSON object with all the results of top-rated movies from API
 * @description selects frist 10 movies from the JSON object and sends them to @function renderTopMovies
 */

Movies.prototype.getMovies = function (data) {
  console.log(data.results);
  let movies = []; //array with top 10 movies
  for (i = 0; i < 10; i++) {
    movies.push({
      title: data.results[i].title || data.results[i].name,
      img: data.results[i].poster_path,
      description: data.results[i].overview,
      releaseDate:
        data.results[i].release_date || data.results[i].first_air_date,
      vote: data.results[i].vote_average,
    });
  }
  this.renderMovies(movies);
};
/**
 * @function renderTopMovies
 * @param {array} top10 - Array with 10 created object, each object containing some information about one movie
 * @description render top 10 movies to HTML
 */

Movies.prototype.renderMovies = function (top10) {
  document.querySelector("#results").innerHTML = "";
  document.getElementById("topViewedText").innerHTML = "";

  let appendTo = document.getElementById("results");
  let topViewedText = document.createElement("h2");
  if (this.fetchType == "tv") {
    topViewedText.innerHTML = `Top viewed series:`;
  } else {
    topViewedText.innerHTML = `Top viewed ${this.fetchType}s:`;
  }
  document.getElementById("topViewedText").appendChild(topViewedText);
  for (let property in top10) {
    let cDiv = document.createElement("div");
    cDiv.setAttribute("class", "result");
    appendTo.appendChild(cDiv);

    let cTitle = document.createElement("h2");
    cTitle.innerHTML = top10[property].title;
    cDiv.appendChild(cTitle);

    let cImg = document.createElement("img");
    cImg.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500${top10[property].img}`
    ); //creates link to display image, api only returns part of the path to the link
    cDiv.appendChild(cImg);

    let descDiv = document.createElement("div");
    let p = document.createElement("p");
    p.innerHTML = "View Description";
    p.setAttribute("id", "viewDescriptionText");
    let viewDescImg = document.createElement("img");
    viewDescImg.setAttribute("class", "viewDescription");
    viewDescImg.setAttribute("src", "./pics/view-desc.png");
    let cDesc = document.createElement("p");
    cDesc.setAttribute("class", "description-hided");
    cDesc.innerHTML = top10[property].description;
    descDiv.appendChild(p);
    descDiv.appendChild(cDesc);
    descDiv.appendChild(viewDescImg);
    cDiv.appendChild(descDiv);

    viewDescImg.addEventListener("click", function () {
      this.parentElement.lastChild.previousSibling.classList.toggle(
        "description-show"
      );
      this.classList.toggle("rotate-descImg");
    });

    if (top10[property].releaseDate != undefined) {
      let releaseDateDiv = document.createElement("div");
      releaseDateDiv.setAttribute("class", "inline");
      let releaseImg = document.createElement("img");
      releaseImg.setAttribute("src", "pics/release-date.png");
      releaseImg.setAttribute("class", "release-date icons");
      let cRelease = document.createElement("p");
      cRelease.innerHTML = top10[property].releaseDate;
      releaseDateDiv.appendChild(releaseImg);
      releaseDateDiv.appendChild(cRelease);
      cDiv.appendChild(releaseDateDiv);
    }

    let voteDiv = document.createElement("div");
    let starImg = document.createElement("img");
    starImg.setAttribute("src", "pics/star.png");
    starImg.setAttribute("class", "vote-star icons");
    let votes = document.createElement("p");
    votes.innerHTML = top10[property].vote;
    voteDiv.appendChild(starImg);
    voteDiv.appendChild(votes);
    cDiv.appendChild(voteDiv);
  }

  let genres = document.querySelectorAll(".item");
  var self = this;
  for (let i = 0; i < genres.length; i++) {
    genres[i].addEventListener("click", function (e) {
      self.clickedGenre(e);
    });
  }
};

Movies.prototype.clickedGenre = async function (e) {
  let clickedGenreDiv = e.path[1].getAttribute("data-ix"); //returns the data-ix of the clicked element ie if the user clicked on Action, comedy etc
  let genre_id;
   if (clickedGenreDiv == "Action") {
    genre_id = 28;
  } else if (clickedGenreDiv == "Comedy") {
    genre_id = 35;
  } else if (clickedGenreDiv == "Crime") {
    genre_id = 80;
  } else if (clickedGenreDiv == "Drama") {
    genre_id = 18;
  } else if (clickedGenreDiv == "Animation") {
    genre_id = 16;
  } else if (clickedGenreDiv == "Documentary") {
    genre_id = 99;
  } else if (clickedGenreDiv == "Thriller") {
    genre_id = 878;
  } else if (clickedGenreDiv == "Romance") {
    genre_id = 10749;
  } else if (clickedGenreDiv == "Fantasy") {
    genre_id = 14;
  }
  try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/${this.fetchType}?api_key=599733411a8825ab5d83eb79fbc0e3ce&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre_id}`);
    const data = await response.json();
    this.getMovies(data);
  } catch (err) {
    console.log(err);
  }
};
