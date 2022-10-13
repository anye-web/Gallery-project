"use strict";

// UI Element
const btnContent = document.querySelector(".btn-content");
const galleryContent = document.querySelector(".gallery-content");
const overlayContent = document.querySelector(".overlay-container");

// Contents dynamic Generated
const items = [
  {
    id: 1,
    category: "caves",
    img: [
      "../images/cave-1.jpg",
      "./images/cave-2.jpg",
      "./images/cave-3.jpg",
      "./images/cave-4.jpg",
      "./images/cave-5.jpg",
      "./images/cave-6.jpg",
    ],
  },
  {
    id: 2,
    category: "rivers",
    img: [
      "./images/river-1.jpg",
      "./images/river-2.jpg",
      "./images/river-3.jpg",
      "./images/river-4.jpg",
      "./images/river-5.jpg",
      "./images/river-6.jpg",
    ],
  },
  {
    id: 3,
    category: "mountains",
    img: [
      "./images/mount-1.jpg",
      "./images/mount-2.jpg",
      "./images/mount-3.jpg",
      "./images/mount-4.jpg",
      "./images/mount-5.jpg",
      "./images/mount-6.jpg",
    ],
  },
  {
    id: 4,
    category: "animals",
    img: [
      "./images/animal-1.jpg",
      "./images/animal-2.jpg",
      "./images/animal-3.jpg",
      "./images/animal-4.jpg",
      "./images/animal-5.jpg",
      "./images/animal-6.jpg",
    ],
  },
];

// Load Objects on Window load

window.addEventListener("DOMContentLoaded", function () {
  displayGalleryContent(items);
  displayGalleryBtns();
});

// Creating Gallery Images
function displayGalleryContent(galleryItems) {
  // Displaying Items in the Dom
  let displayGallery = galleryItems
    .map((item, id) => {
      return `<div class=${item.category}>
          <h3 class="title">${item.id}. ${item.category}</h3>
          <div class="content">
          ${item.img
            .map((el) => {
              return `<div class="gallery-img">
              <img src=${el} class="img" alt="gallery" />
                </div>`;
            })
            .join("")}      
          </div>
        </div>`;
    })
    .join("");

  galleryContent.innerHTML = displayGallery;

  // Displaying overlay Gallery

  // Adding Event listern to the images
  function displayOverlay() {
    const imgs = document.querySelectorAll(".img");

    imgs.forEach((img) => {
      img.addEventListener("click", function (e) {
        const itemCategory =
          e.currentTarget.parentElement.parentElement.parentElement.className;

        const itemClick = galleryItems.find(
          (item) => item.category === itemCategory
        );

        creatOverlay(itemClick);
      });
    });
  }
  displayOverlay();
}

// Creating Buttons
function displayGalleryBtns() {
  // Creating an array with all the categories for the buttons

  let categories = items.reduce(
    (item, el) => {
      if (!item.includes(el.category)) {
        item.push(el.category);
      }
      return item;
    },
    ["all"]
  );

  console.log(categories);

  // Displaying the btns in Ui
  let displayBtn = categories
    .map((category) => {
      return `<button type="button" class="btn btn-filter" data-id=${category}>${category}</button>`;
    })
    .join("");

  btnContent.innerHTML = displayBtn;

  // Filtering the Btns
  const filterBtns = document.querySelectorAll(".btn-filter");

  filterBtns.forEach((btn) => {
    // Adding the Active class to the all btn onload
    if (btn.dataset.id === "all") {
      btn.classList.add("btn-active");
    }

    btn.addEventListener("click", function (e) {
      const id = e.currentTarget.dataset.id;

      const itemsID = items.filter((item) => {
        if (item.category === id) {
          return item;
        }
      });

      // Removing active class and putting on the the btn click
      filterBtns.forEach((btn) => {
        btn.classList.remove("btn-active");
        if (btn.dataset.id === id) {
          btn.classList.add("btn-active");
        }
      });

      if (id === "all") {
        displayGalleryContent(items);
      } else {
        displayGalleryContent(itemsID);
      }
    });
  });
}

// Creating Overlay
function creatOverlay(item) {
  const itemImgs = item.img;

  // Building the overlay items
  const content = `
  <!-- Close btn -->
 <div class="container">
       <button class="btn overlay-btn">x</button>
        <!-- slide container -->
        <div class="overlay-slider">
          ${itemImgs
            .map((el) => {
              return ` <div class="slide">
              <img src=${el} class="slide-img" alt="" />
            </div>`;
            })
            .join("")}
          <!-- Slide Controls -->
          <button class="prev controls" type="button">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </button>
          <!-- Slide Controls -->
          <button class="next controls" type="button">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </button>
        </div>
        <!-- Slides Dots -->
        <div class="slide-dots">
          ${itemImgs
            .map((el) => {
              return `<div class="dots">&nbsp;</div>`;
            })
            .join("")}
        </div>
       </div>
  `;

  overlayContent.innerHTML = content;
  overlayContent.classList.add("show-overlay");

  // Selcting Element Items
  function hideOverlay() {
    const closedOverlay = document.querySelector(".overlay-btn");

    closedOverlay.addEventListener("click", function () {
      overlayContent.classList.remove("show-overlay");
    });
  }
  hideOverlay();
  // creating slider
  function slider() {
    const slides = document.querySelectorAll(".slide");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    slides.forEach((slide, index) => {
      slide.style.left = `${index * 100}%`;
    });

    let counter = 0;

    nextBtn.addEventListener("click", function () {
      counter++;
      carousel();
    });

    prevBtn.addEventListener("click", function () {
      counter--;
      carousel();
    });

    function carousel() {
      if (counter < slides.length - 1) {
        nextBtn.style.display = "inline-block";
      } else {
        nextBtn.style.display = "none";
      }

      if (counter > 0) {
        prevBtn.style.display = "inline-block";
      } else {
        prevBtn.style.display = "none";
      }

      slides.forEach((slide) => {
        slide.style.transform = `translateX(-${counter * 100}%)`;
      });
    }
    prevBtn.style.display = "none";
  }
  slider();
}
