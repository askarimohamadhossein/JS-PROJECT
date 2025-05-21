import "toastify-js/src/toastify.css";
import { deatilSneaker } from "./apis/sneaker";
let curentNumber = 0;
let newPrice = 0;
let selectedSize = "";
let selectedColor = "";
let sneakerData = "";
let sneakerId = "";

export const renderProduct = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    sneakerId = urlParams.get("productId");
    console.log("Product ID:", sneakerId);

    const response = await deatilSneaker(sneakerId);
    console.log(response);

    sneakerData = response;

    let price = response.price;

    renderSneakers(response);
    addPriceShoes(price);
    removePriceShoes(price);
    gotoCart();
    RenderSize(response);
    renderColors(response);
  } catch (error) {
    console.log("Error:", error);
  }
};

function renderSneakers(response) {
  document.getElementById("main-product").innerHTML = `
  <img id="back-home" class=" w-30 h-25 absolute z-20 m-1" src="src/image/back-step.png" alt="" />
    <div class="relative overflow-hidden w-full h-[400px] bg-gray-100 flex items-center justify-center">
  <div id="slider" class="flex gap-4 animate-slider">
    <img width="328px" height="328px" src="${response.imageURL}" alt="" />
    <img width="328px" height="328px" src="${response.imageURL}" alt="" />
    <img width="328px" height="328px" src="${response.imageURL}" alt="" />
    <img width="328px" height="328px" src="${response.imageURL}" alt="" />
    <img width="328px" height="328px" src="${response.imageURL}" alt="" />
    
  </div>
</div>
 <section class="flex flex-row justify-between m-4">
   <h1 class="font-bold text-3xl mt-5">${response.name}</h1>
   <img width="28px" height="28px" src="src/svg/like.svg" alt="" />
 </section>

 <section>
   <img
     class="mx-2"
     width="280px"
     src="src/image/Screenshot 2025-05-14 154237.png"
     alt=""
   />
   <div class="border-b-1 border-gray-200 mt-4"></div>
 </section>
 <section id="sectionDesc" class="line-clamp-3 mt-3 mb-8 mx-2 text-gray-700 text-center">
  <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti voluptate illum veniam impedit veritatis cum laborum temporibus! Provident ratione <b id="b">ullam</b> iusto voluptatem quas fugit? Perspiciatis, .</p>
 </section>
 <section class=" mt-4 mx-5 flex flex-col">
  

 </section>
 <section class="flex flex-row gap-2 justify-center items-center w-full mx-auto">
   <div id="size" class="w-1/2"></div>
   <div id="color" class="space-x-2 overflow-x-scroll whitespace-nowrap "></div>
 </section>
 <section class="flex justify-start items-center gap-5 mx-5 mt-8">
   <h1 class="text-xl font-bold">Quantity</h1>
   <div class="flex justify-center items-center w-fit">
     <button
       class="bg-gray-100 w-[140px] h-[47px] rounded-4xl text-black font-bold   flex justify-center items-center gap-3 shadow-md hover:bg-gray-300 active:scale-95 transition-all duration-200"
     >
       <img
       id = "negative"
         width="20px"
         height="20px"
         src="src/svg/negative-sign.svg"
         alt=""
       />
       <span id= "curentNumber">${curentNumber}</span>
       <img
         id= "plus"
         width="20px"
         height="20px"
         src="src/svg/52-523186_plus-sign-comments-plus-icon-svg-hd-png.png"
         alt=""
       />
     </button>
   </div>
 </section>
 <section class="flex justify-baseline items-center gap-3 bg-white fixed bottom-0 left-0 w-full z-50">
   <div class="mx-5">
     <p class="text-gray-500">total price</p>
     <h1 id="priceNumber" class="font-bold text-2xl">$${response.price}.00</h1>
   </div>
   <div>
     <button id="cartBtn"
       class="bg-black w-[250px] h-[47px] rounded-4xl text-white text-xl font-semibold mb-5 mt-5"
     >
       Add to cart
     </button>
   </div>
 </section>
     
    `;
  document.getElementById("curentNumber").textContent = curentNumber;
  document.getElementById("priceNumber").textContent = `$${newPrice}.00`;
  document.getElementById("b").addEventListener("click", function () {
    document.getElementById("sectionDesc").classList.remove("line-clamp-3");
  });
  document.getElementById("back-home").addEventListener("click", function () {
    window.location.href = "home.html";
  });
}

export function renderColors(response) {
  const colorDiv = document.getElementById("color");
  colorDiv.className = "flex flex-row items-center justify-center   ";
  response.colors.split("|").forEach((color) => {
    const button = document.createElement("button");
    button.className = " rounded-full  mx-1 w-9 h-9 ";
    button.style.backgroundColor = color;

    if (color === "white") {
      button.className = "border-1 border-gray-400 rounded-full  mx-1 w-9 h-9";
    }

    button.addEventListener("click", () => {
      document.querySelectorAll("#color button").forEach((btn) => {
        btn.innerHTML = "";
      });
      button.innerHTML = `<img src="src/image/tik-icon.jpg" alt="">`;

      selectedColor = color;
      console.log("Selected Color:", selectedColor);
    });

    colorDiv.appendChild(button);
  });
}

function RenderSize(response) {
  const sizeDiv = document.getElementById("size");

  response.sizes.split("|").forEach((size, index) => {
    const button = document.createElement("button");

    button.setAttribute("data-id", index);
    button.className =
      "border-2 rounded-full mx-1 w-9 h-9 text-center border-gray-400 ";
    button.textContent = size;

    button.addEventListener("click", function () {
      selectedSize = this.textContent;
      document.querySelectorAll("#size button").forEach((btn) => {
        btn.classList.remove("bg-black", "text-white");
      });

      this.classList.add("bg-black", "text-white");
    });

    sizeDiv.appendChild(button);
  });
}

export function addPriceShoes(price) {
  document.getElementById("plus").addEventListener("click", function () {
    if (curentNumber === 0) {
      document.getElementById("curentNumber").textContent = curentNumber;
      document.getElementById("priceNumber").textContent = `$${newPrice}.00`;
    }
    if (curentNumber === 1) {
      newPrice = price;
    }
    curentNumber++;
    newPrice = price * curentNumber;
    // console.log(newPrice);

    document.getElementById("curentNumber").textContent = curentNumber;
    document.getElementById("priceNumber").textContent = `$${newPrice}.00`;
  });
}

function removePriceShoes(price) {
  document.getElementById("negative").addEventListener("click", function () {
    if (curentNumber > 0) {
      curentNumber--;
    }

    newPrice = curentNumber === 1 ? price : price * curentNumber;
    // console.log(newPrice);

    document.getElementById("curentNumber").textContent = curentNumber;
    document.getElementById("priceNumber").textContent = `$${newPrice}.00`;
  });
}

function gotoCart() {
  const addToCart = document.getElementById("cartBtn");
  addToCart.addEventListener("click", function () {
    saveData(sneakerData);
    Toastify({
      text: "add to cart",
      duration: 4000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
    // window.location.href = "cart.html";
  });
}

function saveData(sneakerData) {
  let arrayData = JSON.parse(localStorage.getItem("data-new")) || [];
  const obj = {
    id: sneakerId,
    name: sneakerData.name,
    color: selectedColor,
    size: selectedSize,
    price: newPrice,
    quantity: curentNumber,
    image: sneakerData.imageURL,
  };
  arrayData.push(obj);
  localStorage.setItem("data-new", JSON.stringify(arrayData));
}

window.addEventListener("DOMContentLoaded", renderProduct);
