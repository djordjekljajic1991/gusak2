import { async } from "regenerator-runtime";

let modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".modal-close");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".gallery__image");
const modalBlur = document.querySelector(".gallery-gallery");
const images = document.querySelectorAll(".gallery__image");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const close = document.querySelector(".close");
const spinner = document.querySelector(".spinner");

const container = document.querySelector(".gallery__container");
let folderName = document.getElementById("icona").textContent;
folderName = folderName.replace(" ", "-").replace(" ", "-");
console.log(folderName);

let imgBox = document.querySelector(".modal__image-box");
let src;
let slideNum;

const getImgUrl = function (slideNum) {
  const Data = Object.values(images)[slideNum].src.split("/");
  console.log(Data);
  const urlData = Object.values(Data)[Object.keys(Data).length - 1].split(".");

  src = `${Object.values(urlData)[-0]}.${
    Object.values(urlData)[Object.keys(urlData).length - 1]
  }`;

  const src2 = src.split(".");
  const src2x = `${src2[0]}@2x.${src2[1]}`;

  imgBox.innerHTML = " ";
  const markup = `
      <img
        class="modal-image"
        srcset="/src/img/galery/${folderName}/${src2x} 2x"
      />
      `;
  imgBox.insertAdjacentHTML("afterbegin", markup);
};

const openImg = function () {
  images.forEach((item, i) => {
    item.addEventListener("click", function (e) {
      slideNum = i;
      getImgUrl(slideNum);
    });
  });
};

openImg();
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  modalBlur.classList.add("blur");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  modalBlur.classList.remove("blur");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

document.addEventListener("keydown", function (e) {
  // console.log(e.key);

  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
closeModalBtn.addEventListener("click", function (e) {
  closeModal();
});
const sliders = function () {
  const maxSlide = images.length;

  const nextSlide = function () {
    if (slideNum === maxSlide - 1) slideNum = 0;
    else slideNum++;
    getImgUrl(slideNum);
  };
  const prevSlide = function () {
    if (slideNum === 0) slideNum = maxSlide - 1;
    else slideNum--;
    getImgUrl(slideNum);
  };

  //event handlers

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });
};
sliders();

window.addEventListener("load", function () {
  spinner.classList.add("hidden");
  container.classList.remove("hidden");
});
close.addEventListener("click", function () {
  history.back();
});
