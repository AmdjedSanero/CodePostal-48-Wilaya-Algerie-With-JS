const cities = [];
let datafinal = [];
const prom = fetch("js/wilaya58.json");
prom.then((blob) => blob.json()).then((data) => cities.push(...data));

function findMatches(word, cities) {
  return cities.filter((place) => {
    const reg = new RegExp(word, "gi");
    return place.commune_name_ascii.match(reg) || place.commune_name.match(reg);
  });
}
function findMatchesWilaya(id, cities) {
  return cities.filter((place) => {
    return place.wilaya_code.match(id);
  });
}
let search = document.querySelector("input");
let ul = document.querySelector("ul");

search.addEventListener("keyup", function () {
  ul.innerHTML = "";

  datafinal = findMatches(this.value, cities);
  datafinal.forEach((city) => {
    let top = document.createElement("div");
    top.className = "top";
    let caption = document.createElement("div");
    caption.className = "caption";
    let bottom = document.createElement("div");
    bottom.className = "bottom";
    let bottomWilaya = document.createElement("div");
    bottomWilaya.className = "bottomW";

    let li = document.createElement("li");
    let com = document.createElement("span");
    let wilaya = document.createElement("span");
    wilaya.className = "wilaya";
    let codepostal = document.createElement("span");
    let comData = document.createTextNode(city.post_name);
    let wilayaExact = findMatchesWilaya(city.wilaya_code, cities);
    console.log();
    let comDataid = document.createTextNode(wilayaExact[0].wilaya_name + " , ");

    let codeData = document.createTextNode(city.post_code);
    codepostal.className = "postal-code";
    codepostal.appendChild(codeData);

    com.appendChild(comData);
    wilaya.appendChild(comDataid);
    top.appendChild(wilaya);

    top.appendChild(com);

    top.appendChild(codepostal);
    li.appendChild(top);
    li.appendChild(caption);
    li.appendChild(bottom);
    li.appendChild(bottomWilaya);

    ul.appendChild(li);
    li.addEventListener("click", function () {
      if (this.className == "") {
        this.classList = "opened";
        this.querySelector(".top").style.alignSelf = "flex-start";
        caption.innerHTML = `<p>البلدية: <span>${city.commune_name}</span></p>`;
        bottom.innerHTML = `<p>الدائرة: <span>${city.daira_name}</span></p>  `;
        bottomWilaya.innerHTML = `<p>الولاية: <span>${city.wilaya_name}</span></p>`;
      } else {
        this.classList = "";
        this.querySelector(".top").style.alignSelf = "center";
        caption.innerHTML = ``;
        bottom.innerHTML = ``;
        bottomWilaya.innerHTML = ``;
      }
    });
    if (this.value === "") {
      ul.innerHTML = "";
    }
  });
});
