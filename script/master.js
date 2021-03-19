var master = {

    init: window.onload = function() {
        const movieBtn = document.querySelectorAll(".movies");
        const serieBtn = document.querySelectorAll(".series");
        const searchButton = document.querySelectorAll(".searchButton");
        const searchbox = document.querySelectorAll(".searchTerm");
        console.log(searchbox);

        for (let i = 0; i < movieBtn.length; i++) {
            movieBtn[i].addEventListener("click", master.movieTab);
            serieBtn[i].addEventListener("click", master.serieTab);
            searchButton[i].addEventListener("click", master.searchTab);

            //activates searching when enter key klicked
            searchbox[i].addEventListener("keyup", function(event) {
                event.preventDefault();
                if (event.keyCode === 13) {
                    searchButton[i].click();
                }
            });
        }
    },
    movieTab: function() {
        master.changeHTMLContent();

        const fetchMovies = "movie";
        let movies = new Movies(fetchMovies);
        movies.popMovieTitlesAPI();

        const movieGenres = ["Action", "Comedy", "Crime", "Drama", "Animation", "Documentary", "Thriller", "Romance", "Fantasy"];
        let style = new Style(movieGenres);
        style.carousel();

    },
    serieTab: function() {
        master.changeHTMLContent();

        const fetchSeries = "tv"
        let series = new Movies(fetchSeries);
        series.popMovieTitlesAPI();

        const serieGenre = ["Action", "Comedy", "Crime", "Drama", "Animation", "Documentary", "Thriller", "Romance", "Fantasy"];
        let style = new Style(serieGenre)
        style.carousel();
    },
    searchTab: function() {
        master.changeHTMLContent();
        
        let searchbars = document.querySelectorAll(".searchTerm");
        let userInput = searchbars[this.parentNode.firstElementChild.getAttribute("data-ix")].value;
        var searchAPI = new Search(userInput);
        searchAPI.searchMovieAPI();
        searchAPI.searchSerieAPI();

    },
    changeHTMLContent: function() {
        document.getElementById("topViewedText").innerHTML ="";
        document.querySelector("#insertSlider").innerHTML = "";
        document.querySelector("#results").innerHTML = "";
        document.querySelector(".firstPage").style.display = "none";
        document.querySelector(".header-underpages").style.display = "flex";
    },

}