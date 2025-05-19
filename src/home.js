import { brands, sneakers } from "./apis/sneaker";

const savedUsername = localStorage.getItem("username");

const now = new Date();
const hours = now.getHours();
console.log(hours);

export function renderTime() {
  if (hours >= 5 && hours < 12) {
    document.getElementById("time").innerHTML = `
    <span
      class="w-[110px] h-[19px] mt-[16px] ml-[24px] text-mygray-600 font-semibold text-sm"
    >
      Good Morning☀️
    </span>
    <p class="font-bold w-[110px] h-[19px] ml-[24px]">${savedUsername}</p>
    `;
  } else if (hours >= 12 && hours < 18) {
    document.getElementById("time").innerHTML = `
    <span
     class="w-[110px] h-[19px] mt-[16px] ml-[24px] text-mygray-600 font-semibold text-sm"
   >
     Good Evening🌀
   </span>
   <p class="font-bold w-[110px] h-[19px] ml-[24px]">${savedUsername}</p>
    `;
  } else {
    document.getElementById("time").innerHTML = `
    <span
       class="w-[110px] h-[19px] mt-[16px] ml-[24px] text-mygray-600 font-semibold text-sm"
     >
      Good night🌜
     </span>
     <p class="font-bold w-[110px] h-[19px] ml-[24px]">${savedUsername}</p>`;
  }
}

renderTime();

const buttons = document.getElementById("buttons");
buttons.classList =
  "mt-5 p-2 flex space-x-2 overflow-x-scroll whitespace-nowrap";

const init = async () => {
  try {
    const response = await brands();
    // console.log(response.data);

    response.data.forEach((brand) => {
      const button = document.createElement("button");

      button.textContent = brand;
      button.classList =
        " border-2 border-black  text-black font-semibold p-1 rounded-3xl flex-shrink-0";
      button.addEventListener("click", function () {
        this.classList =
          "bg-black border-2 border-black  text-white font-semibold p-1 rounded-3xl flex-shrink-0";
      });
      buttons.appendChild(button);
    });
  } catch (error) {
    console.log("Error:", error);
  }
};
init();

export function renderShoes(data) {
  const shoes = document.getElementById("shoes");

  data.forEach((item) => {
    // console.log(item);
    // localStorage.setItem("Shoes:", JSON.stringify(item));
    shoes.innerHTML += `
      <div class="flex flex-col items-center w-44 mx-3">
        <div class="w-44 h-44 bg-gray-200 mt-2 rounded-2xl flex justify-center items-center overflow-hidden">
          <img src="${item.imageURL}" data-id="${item.id}" class="shoe-image max-w-full max-h-full cursor-pointer"/>
        </div>
        <div class="w-44 h-6 px-4 text-center">
          <h1 class="text-xl font-bold text-black truncate overflow-hidden whitespace-nowrap">
            ${item.name}
          </h1>
        </div>
        <p class="text-black font-semibold px-4 text-start mt-1 text-xl">
          $${item.price}.00
        </p>
      </div>`;
  });

  document.querySelectorAll(".shoe-image").forEach((img) => {
    img.addEventListener("click", function () {
      const productId = this.dataset.id;
      console.log("Clicked ID:", productId);

      localStorage.setItem("productId", productId);

      window.location.href = `product.html?productId=${productId}`;
    });
  });
}

let pageNumber = 1;
const showShoes = async (i) => {
  try {
    const shoesResponse = await sneakers(`?page=${i}&limit=10`);
    console.log(shoesResponse.data);

    shoesResponse.data.forEach((product) => {
      console.log("name:", product.name);
      console.log("image:", product.imageURL);
      console.log("colors:", product.colors);
      console.log("id:", product.id);

      // localStorage.setItem("shoesId:", product.id);
    });

    const sneaker = shoesResponse.data;
    renderShoes(sneaker);
  } catch (error) {
    console.log("Error:", error);
  }
};

(async () => {
  for (let i = 1; i < 6; i++) {
    await showShoes(i);
  }
})();

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 10
  ) {
    pageNumber++;
    showShoes(pageNumber);
  }
});

document.getElementById("search").addEventListener("change", async () => {
  const searchText = document.getElementById("search").value.trim();

  location.href = `search.html?search=${searchText}`;
});
