import { searchParametr } from "./apis/sneaker";
import { renderProduct } from "./product";

document.getElementById("search").addEventListener("change", async () => {
  const searchText = document.getElementById("search").value.trim();

  location.href = `search.html?search=${searchText}`;
});

export async function inputSearch() {
  const urlParams = new URLSearchParams(window.location.search);

  let searchShoes = "";
  try {
    const response = await searchParametr(urlParams.get("search"));

    // console.log("serach:", response.data);
    searchShoes = response.data;

    if (searchShoes.length === 0) {
      document.getElementById("not-found").classList.remove("hidden");
    }

    document.getElementById(
      "searchInfo"
    ).innerHTML = `<span class="h-6 font-bold text-xl text-black"
          >Result for "${urlParams.get("search")}"</span
        >
        <span class="h-5 font-bold text-[20px] text-black">${
          response.data.length
        } founds</span>`;

    const container = document.querySelector("#searchPara");
    searchShoes.forEach((data) => {
      const shoeElement = document.createElement("div");
      shoeElement.classList.add(
        "flex",
        "flex-col",
        "items-center",
        "w-44",
        "mx-3"
      );

      shoeElement.innerHTML = `
    <div class="w-44 h-44 bg-gray-200 mt-2 rounded-2xl flex justify-center items-center overflow-hidden">
      <img src="${data.imageURL}" data-id="${data.id}" class="shoe-image max-w-full max-h-full cursor-pointer"/>
    </div>
    <div class="w-44 h-6 px-4 text-center">
      <h1 class="text-xl font-bold text-black truncate overflow-hidden whitespace-nowrap">
        ${data.name}
      </h1>
    </div>
    <img width="150px" height="50px" src="src/image/stars.png" alt="">
    <p class="text-black font-semibold px-4 text-center mt-1 text-xl">
      $${data.price}.00
    </p>
  `;

      container.appendChild(shoeElement);
    });
  } catch (error) {
    console.log("error:", error);
  }
  renderProduct();
}

inputSearch();

export function renderShoes(data) {
  const shoes = document.getElementById("shoes");

  data.forEach((item) => {
    // console.log(item);
    localStorage.setItem("Shoes:", JSON.stringify(item));
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
        <p class="text-black font-semibold px-4 text-center mt-1">
          $${item.price}.00
        </p>
      </div>`;
  });
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  window.location.href = "checkout.html";
});
document.getElementById("home").addEventListener("click", () => {
  window.location.href = "home.html";
});
