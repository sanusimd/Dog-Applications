// fetch the breeds list
async function start() {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();
  //   console.log(data);
  createBreedLists(data.message);
}

start();
// Create Breed Lists
function createBreedLists(breedList) {
  document.getElementById("breed").innerHTML = ` 
    <select onChange = 'loadByBreed(this.value)'>
    <option>Choose a Dog Bread</option>
     ${Object.keys(breedList).map(function (breed) {
       return `<Option>${breed}</Option>`;
     })}
  </select>`;
}

// Function to load breed
async function loadByBreed(breed) {
  if (breed != "Choose a Dog Bread") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    createSlideshow(data.message);
  }
}

// Create  Slideshow function
function createSlideshow(images) {
  document.getElementById("slideshow").innerHTML = `
    <div
    class="slide"
    style="
      background-image: url('${images[0]}');
    "
  ></div>
   `;
}
