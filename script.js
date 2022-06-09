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
  let currentPosition = 0;
  document.getElementById("slideshow").innerHTML = `
    <div
    class="slide"
    style="
      background-image: url('${images[0]}');
    "
  ></div>
  <div
    class="slide"
    style="
      background-image: url('${images[1]}');
    "
  ></div>
   `;

  currentPosition += 2;
  setInterval(nextSlide, 3000);
  // function for nextslides
  function nextSlide() {
    document.getElementById("slideshow").insertAdjacentHTML(
      "beforeend",
      `
    <div
    class="slide"
    style="
      background-image: url('${images[currentPosition]}');
    "
  ></div> 
    `
    );
    setTimeout(function () {
      document.querySelector(".slide").remove();
    }, 1000);

    currentPosition++;
  }

  console.log(images);
}
