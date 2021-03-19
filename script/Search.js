let Search = function(userInput) {
    this.myAPIkey = "599733411a8825ab5d83eb79fbc0e3ce";
    this.userInput = userInput;
    this.checkNetworkConn = window.navigator.onLine;
}
Search.prototype.searchMovieAPI = async function() {
    var errorText = document.getElementById("topViewedText");
    if (this.checkNetworkConn != true) {
      errorText.innerHTML = "Connection error, please check your network and reload the page!";
      errorText.style.color = "red";
      errorText.style.marginTop = "200px";
      return;
    }
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.myAPIkey}&language=en-US&query=${this.userInput}&page=1&include_adult=false`);
        const data = await response.json();
        this.getSearched(data);
    } catch (err) {
        console.log(err);
    }
}

Search.prototype.searchSerieAPI = async function() {
    if (this.checkNetworkConn != true) {
        return;
      }
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${this.myAPIkey}&language=en-US&query=${this.userInput}&page=1&include_adult=false`);
        const data = await response.json();
        this.getSearched(data);
    } catch (err) {
        console.log(err);
    }
}


Search.prototype.getSearched = function(data) {
        let movies = [];
        if (data.results.length >= 1){

        for (i = 0; i < 1; i++) {

            movies.push({
                title: data.results[i].title || data.results[i].name,
                img: data.results[i].poster_path,
                description: data.results[i].overview,
                releaseDate: data.results[i].release_date || data.results[i].first_air_date,
                vote: data.results[i].vote_average
            });
        }
        }
        this.renderSearched(movies);
    }
    /**
     * @function renderTopMovies
     * @param {array} top10 - Array with 10 created object, each object containing some information about one movie
     * @description render top 10 movies to HTML
     */

Search.prototype.renderSearched = function(top10) {
    document.getElementById("topViewedText").innerHTML ="";
    let appendTo = document.getElementById("results");
    let serchedText = document.createElement("h2");
    serchedText.innerHTML = `Searched for: <u>${this.userInput}</u>`
    if (top10.length == 0){
        serchedText.innerHTML = `0 results found for: <u>${this.userInput}</u>`
    }
    document.getElementById("topViewedText").appendChild(serchedText);

    for (let property in top10) {
        let cDiv = document.createElement("div");
        cDiv.setAttribute("class", "result");
        appendTo.appendChild(cDiv);

        let cTitle = document.createElement("h2");
        cTitle.innerHTML = top10[property].title;
        cDiv.appendChild(cTitle);

        if (top10[property].img != null){
            let cImg = document.createElement("img");
            cImg.setAttribute("src", `https://image.tmdb.org/t/p/w500${top10[property].img}`); //creates link to display image, api only returns part of the path to the link
            cDiv.appendChild(cImg);
        } else {
            let cImg = document.createElement("img");
            cImg.setAttribute("src", `pics/noimg.png`);
            cDiv.appendChild(cImg);
        }

        console.log(top10[property].description);
        if (top10[property].description != "") {
            let descDiv = document.createElement("div")
            let p = document.createElement("p");
            p.innerHTML = "View Description";
            p.setAttribute("id", "viewDescriptionText")
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

        viewDescImg.addEventListener("click", function() {
            this.parentElement.lastChild.previousSibling.classList.toggle("description-show");
            this.classList.toggle("rotate-descImg");
        })
    }
        if (top10[property].releaseDate != undefined) {
            let releaseDateDiv = document.createElement("div");
            releaseDateDiv.setAttribute("class", "inline")
            let releaseImg = document.createElement("img");
            releaseImg.setAttribute("src", "pics/release-date.png")
            releaseImg.setAttribute("class", "release-date icons")
            let cRelease = document.createElement("p");
            cRelease.innerHTML = top10[property].releaseDate;
            releaseDateDiv.appendChild(releaseImg);
            releaseDateDiv.appendChild(cRelease);
            cDiv.appendChild(releaseDateDiv);
        }

        let voteDiv = document.createElement("div");
        let starImg = document.createElement("img");
        starImg.setAttribute("src", "pics/star.png")
        starImg.setAttribute("class", "vote-star icons")
        let votes = document.createElement("p");
        votes.innerHTML = top10[property].vote;
        voteDiv.appendChild(starImg);
        voteDiv.appendChild(votes);
        cDiv.appendChild(voteDiv);
    }

    let genres = document.querySelectorAll(".item");
    var self = this;
    for (let i = 0; i < genres.length; i++) {
        genres[i].addEventListener("click", function(e) {
            self.clickedGenre(e)
        });
    }
}