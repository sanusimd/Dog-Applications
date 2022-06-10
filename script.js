// Global variable
let timer;
let DeleteFirstPhotodelay;

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
  clearInterval(timer);
  setTimeout(DeleteFirstPhotodelay);
  if (images.length > 1) {
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
    // Check if the dog has only two imagesg
    if (images.length == 2) currentPosition = 0;
    timer = setInterval(nextSlide, 3000);
  } else {
    document.getElementById("slideshow").innerHTML = `
    <div
    class="slide"
    style="
      background-image: url('${images[0]}');
    "
  ></div>
  <div class="slide"></div>
   `;
  }
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
    DeleteFirstPhotodelay = setTimeout(function () {
      document.querySelector(".slide").remove();
    }, 1000);
    if (currentPosition + 1 >= images.length) {
      currentPosition = 0;
    } else {
      currentPosition++;
    }
  }
}
