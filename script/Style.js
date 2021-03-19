let Style = function(content) {
    this.content = content;
}

Style.prototype.carousel = function() {
    this.carouselHTML();
    let isDown = false;
    let startX;
    let scrollLeft;
    const slider = document.querySelector('.items');

    const start = (e) => {
        isDown = true;
        slider.classList.add('grab');
        startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    }

    const end = () => {
        isDown = false;
        slider.classList.remove('grab');
    }

    const move = (e) => {
        if (!isDown) return;

        e.preventDefault();
        const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
        const dist = (x - startX);
        slider.scrollLeft = scrollLeft - dist;
    }

    (() => {
        slider.addEventListener('mousedown', start);
        slider.addEventListener('mousemove', move);
        slider.addEventListener('mouseup', end);
    })()
}

Style.prototype.carouselHTML = function() {
    let sliderDiv = document.createElement("div");
    sliderDiv.setAttribute("id", "slider");

    let wrapperDiv = document.createElement("div");
    wrapperDiv.setAttribute("class", "wrapper");
    sliderDiv.appendChild(wrapperDiv);

    let ul = document.createElement("ul");
    ul.setAttribute("class", "items");
    for (let i = 0; i < this.content.length; i++) {
        let li = document.createElement("li");
        li.setAttribute("class", "item");
        li.setAttribute("data-ix", this.content[i])
        let img = document.createElement("img");
        img.setAttribute("src", `pics/${this.content[i]}.jpg`);
        li.appendChild(img);
        ul.appendChild(li)
    }
    wrapperDiv.appendChild(ul);
    document.querySelector("#insertSlider").appendChild(sliderDiv);
}