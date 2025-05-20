import "toastify-js/src/toastify.css";
import { brands, sneakers } from "./apis/sneaker";
const savedUsername = localStorage.getItem("username");

const now = new Date();
const hours = now.getHours();
// console.log(hours);

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
    const brandData = response.data;
    brandData.forEach((brand) => {
      const button = document.createElement("button");

      button.textContent = brand;

      // console.log(brand);

      button.classList =
        "border-1 border-gray-800 text-black font-semibold py-1 px-3 mx-2 rounded-3xl flex-shrink-0";

      button.addEventListener("click", function () {
        document
          .querySelectorAll("button")
          .forEach((btn) => btn.classList.remove("bg-gray-800", "text-white"));
        button.classList.add("bg-gray-800", "text-white");
      });
      buttons.appendChild(button);
    });
  } catch (error) {
    console.log("Error:", error);
  }
};
init();

export function renderShoes(data) {
  // console.log(data); //همهی کفشهارو اینجا تونستم بگیرم

  const shoes = document.getElementById("shoes");
  data.forEach((item) => {
    const container = document.createElement("div");
    container.classList.add(
      "shoesContainer",
      "flex",
      "flex-col",
      "items-center",
      "w-44",
      "mx-3"
    );
    container.innerHTML = `
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
    `;
    console.log(item.brand);

    container.setAttribute("brand", item.brand);
    shoes.appendChild(container);
  });

  function filterShoesByBrand(selectedBrand) {
    const filteredShoes = data.filter((item) => item.brand === selectedBrand);
    renderShoes(filteredShoes); // نمایش فقط کفش‌های برند انتخاب‌شده
  }

  //اینجا id رو توی لوکال استوریج ذخیره کردم ک روی هر عکس کلیک شد منو ببره به ایدی همون عکس توی جزئیات محصول

  document.querySelectorAll(".shoe-image").forEach((img) => {
    img.addEventListener("click", function () {
      const productId = this.dataset.id;
      console.log("Clicked ID:", productId);
      localStorage.setItem("productId", productId);

      window.location.href = `product.html?productId=${productId}`;
    });
  });
}

// صرفا قسمت infinityScroll با توجه به اطلاعات اقای پژوهش و ai

let pageNumber = 1;
const showShoes = async (i) => {
  try {
    const shoesResponse = await sneakers(`?page=${i}&limit=10`);
    const sneaker = shoesResponse.data;
    renderShoes(sneaker);
  } catch (error) {
    console.log("Error:", error);
  }
};

(async () => {
  for (let i = 1; i < 10; i++) {
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

//مقدار سرچ اینپوت رو گرفتمش صرفا

document.getElementById("search").addEventListener("change", async () => {
  const searchText = document.getElementById("search").value.trim();
  location.href = `search.html?search=${searchText}`;
});

Toastify({
  text: "Login successful!\nGlad to have you here.✨❤️",
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
