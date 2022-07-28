import { async } from "regenerator-runtime";

let modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".modal-close");
const btnsOpenModal = document.querySelectorAll(".gallery__image");
const modalBlur = document.querySelector(".gallery-gallery");
const images = document.querySelectorAll(".gallery__image");

const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const close = document.querySelector(".close");
const spinner = document.querySelector(".spinner");

const container = document.querySelector(".gallery__container");
let folderName = document.querySelector(".folder").dataset.set;

let imgBox = document.querySelector(".modal__image-box");
let src;
let slideNum;

const getImgUrl = function (slideNum) {
  const Data = Object.values(images)[slideNum].src.split("/");
  const videoUrl = document.querySelector(".galery__video").src;
  const urlData = Object.values(Data)[Object.keys(Data).length - 1].split(".");

  src = `${Object.values(urlData)[-0]}.${
    Object.values(urlData)[Object.keys(urlData).length - 1]
  }`;
  const src2 = src.split(".");
  const src2x = `${src2[0]}@2x.${src2[1]}`;
  console.log(src2x);
  if (src2[1] === "") {
    imgBox.innerHTML = " ";
    const markup = `
    <span class="helper"></span>
    <video controls class="modal-image" >
    <source src="${videoUrl}"
            type="video/mp4">

    Sorry, your browser doesn't support embedded videos.
        `;
    imgBox.insertAdjacentHTML("afterbegin", markup);

    console.log("testic");
  } else {
    imgBox.innerHTML = " ";
    const markup = `
     <span class="helper"></span>
      <img
        class="modal-image"
        src="/src/img/galery/${folderName}/${src2x}"
        
      />
      `;
    imgBox.insertAdjacentHTML("afterbegin", markup);
  }

  //   const imgTarget = document.querySelector("img[data-src]");
  //   const loadImg = function (entries, observer) {
  //     const [entry] = entries;
  //     if (!entry.isIntersecting) return;
  //     entry.target.src = entry.target.dataset.src;

  //     entry.target.addEventListener("load", function () {
  //       imgTarget.src = imgTarget.dataset.src;
  //       imgTarget.classList.remove("lazy-img");
  //     });
  //     observer.unobserve(entry.target);
  //   };
  //   const imgObserver = new IntersectionObserver(loadImg, {
  //     root: null,
  //     threshold: 0,
  //     rootMargin: "200px",
  //   });

  //   imgObserver.observe(imgTarget);
};

const openImg = function () {
  images.forEach((item, i) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      slideNum = i;
      getImgUrl(slideNum);
    });
  });
};

openImg();
const openModal = function () {
  modal.classList.remove("hidden");

  modalBlur.classList.add("blur");
};

const closeModal = function () {
  modal.classList.add("hidden");

  modalBlur.classList.remove("blur");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

document.addEventListener("keydown", function (e) {
  // console.log(e.key);
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
close.addEventListener("click", function (e) {
  e.preventDefault();
  history.back();
});
