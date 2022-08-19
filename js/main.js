const cities = [];
let datafinal = [];
const prom = fetch("js/wilaya.json");
prom.then((blob) => blob.json()).then((data) => cities.push(...data));

function findMatches(word, cities) {
  return cities.filter((place) => {
    const reg = new RegExp(word, "gi");
    return place.name.match(reg);
  });
}
function findMatchesWilaya(id, cities) {
  return cities.filter((place) => {
    return place.wilaya_id.match(id);
  });
}
let search = document.querySelector("input");
let ul = document.querySelector("ul");

search.addEventListener("keyup", function () {
  ul.innerHTML = "";

  datafinal = findMatches(this.value, cities);
  datafinal.forEach((city) => {
    let li = document.createElement("li");
    let com = document.createElement("span");
    let wilaya = document.createElement("span");
    wilaya.className = "wilaya";
    let codepostal = document.createElement("span");
    let comData = document.createTextNode(city.name);
    let wilayaExact = findMatchesWilaya(city.wilaya_id, cities);
    console.log();
    let comDataid = document.createTextNode("," + wilayaExact[0].name);

    let codeData = document.createTextNode(city.post_code);
    codepostal.className = "postal-code";
    codepostal.appendChild(codeData);

    wilaya.appendChild(comDataid);
    com.appendChild(comData);
    li.appendChild(com);
    li.appendChild(wilaya);

    li.appendChild(codepostal);

    ul.appendChild(li);
    if (this.value === "") {
      ul.innerHTML = "";
    }
  });
});
