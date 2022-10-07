"use strict";

// UI Element
const btnContent = document.querySelector(".btn-content");
const galleryContent = document.querySelector(".gallery-content");

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
}
console.log(items);

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
