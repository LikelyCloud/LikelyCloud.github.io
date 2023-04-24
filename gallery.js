function loadIMG(url, id) {
    const P = new Promise(function (resolve, reject) {
        const parent = document.querySelector(id);
        const element = document.createElement("img");
        element.setAttribute("src", url);
        element.setAttribute("alt", url);
        element.classList.add("gallery-img");
        parent.appendChild(element);
        element.onload = function () { resolve(url); };
        element.onerror = function () { reject(url); };
    }
    );
    return P;
}

Promise.all([
    loadIMG("imgs/f5-free.jpeg", ".flex-container"),
    loadIMG("imgs/f2-free.jpeg", ".flex-container"),
    loadIMG("imgs/f3-free.jpeg", ".flex-container"),
    loadIMG("imgs/f4-free.jpeg", ".flex-container"),
    loadIMG("imgs/f0-free.jpeg", ".flex-container"),
    loadIMG("imgs/f6-free.jpeg", ".flex-container")
]).then(function () {
    console.log("Wszystko z równoległej się załadowało!");
}).catch(function () {
    console.log("Błąd ładowania galerii rownoległej");
});
