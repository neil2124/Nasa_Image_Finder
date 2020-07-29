const searchBtn = document.getElementById("submit");
const searchInput = document.getElementById("search-input");
const heading = document.getElementById("heading");

//Search Nasa Database And Add to DOM
function searchDatabase(input) {
  const data = fetch(`https://images-api.nasa.gov/search?q=${input}`)
    .then((res) => res.json())
    .then((data) => data.collection.items.map((data) => data));
  const st = input;
  updateDOM(data, st);
}

//Update DOM
function updateDOM(data, input) {
  data.then((results) => {
    let output = "";
    console.log(results);
    results.forEach((post) => {
      try {
        output += `
            <div class="img-container">
            <img src="${post.links[0].href}">
            </div>
            


            `;
      } catch (e) {
        console.log(e);
      }
    });

    if (output) {
      console.log(output);
      heading.innerHTML = `<h2>Search Results For '${input}' </h2>`;
      document.getElementById("results").innerHTML = output;
    } else {
      document.getElementById("results").innerHTML = "";
      heading.innerHTML = "<h2>No Results.Please Try Again</h2>";
    }
  });
}

//Event Listeners
searchBtn.addEventListener("click", (e) => {
  //Get The Search Term
  const searchTerm = searchInput.value;

  //Check Input
  if (searchTerm === "") {
    //Show Message
    showmessage("Please Add A Term");
  }

  //Clear Input
  searchInput.value = "";

  //Search Nasa Database
  searchDatabase(searchTerm);

  e.preventDefault();
});
