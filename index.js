const formulari = document.getElementById("formulari");
const mock = document.getElementById("mock");
const url =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png";
const emri = formulari["emri"];
const roli = formulari["roli"];
let personat = JSON.parse(localStorage.getItem("personat")) || [];
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keyup", (e) => {
  value = e.target.value.toLowerCase();
  const filteredPersonat = personat.filter((person) => {
    return person.emri.toLowerCase().includes(value);
  });

  mockElement(filteredPersonat);
});

const shtoPerson = (url, emri, roli) => {
  personat.push({
    id: Date.now(),
    url,
    emri,
    roli,
  });
  localStorage.setItem("personat", JSON.stringify(personat));
  return { url, emri, roli };
};

const mockElement = (personat) => {
  const mockDiv = personat
    .map((personi) => {
      return `
    <div data-id="${personi.id}" class="infoDiv">
    <div class="imgDiv"><img src="${personi.url}" class="img"></img></div>
    <div class="emriDiv"><p class="emri">${personi.emri}</p>
    <p class="roli">${personi.roli}</p></div>
    <div class="deleteDiv"><button class="deleteButton">&#10005;</button></div>
    </div>
    `;
    })
    .join("");

  mock.innerHTML = mockDiv;
};
mockElement(personat);

formulari.onsubmit = (e) => {
  e.preventDefault();

  const personIri = shtoPerson(url, emri.value, roli.value);
  mockElement(personat);
  emri.value = "";
  roli.input = "";
};
mock.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteButton")) {
    deletePerson(e.target.parentElement.parentElement.getAttribute("data-id"));
    e.target.parentElement.parentElement.remove();
  }
});
function deletePerson(personId) {
  personat = personat.filter((task) => task.id != personId);
  console.log(personat);
  localStorage.setItem("personat", JSON.stringify(personat));
}
