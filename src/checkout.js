let dataLocalStorage = localStorage.getItem("data-new");
let dataCart = JSON.parse(dataLocalStorage);
console.log(dataCart);

let quantity = null;
let newPrice = null;

dataCart.forEach((data) => {
  quantity = data.quantity;
  document.getElementById("checkout-container").innerHTML += `

<section id = "mamadi"
  class="mamadi flex items-center gap-4 shadow-md rounded-4xl bg-white p-4 mb-6 "
>
  <img
    class=" w-36 h-36 rounded-lg"
    src="${data.image}"
    alt="React Miler"
  />
  <div class="flex flex-col w-full ">
    <div class="flex justify-between items-center border-gray-300 pb-2 ">
      <h1
        class="text-black font-bold text-xl truncate overflow-hidden whitespace-nowrap w-[200px] max-w-xs
"
      >
        ${data.name}
      </h1>
      
    </div>
    <div
      class="flex justify-start items-center gap-2 border-gray-300 py-2"
    >
      <button style="background-color:${data.color};" class="colorBtn border-1 rounded-full mx-1 w-5 h-5   "></button>
      <p class="font-semibold text-sm text-gray-500">color | Size = ${data.size}</p>
    </div>
    <div class="flex justify-between items-center pt-2">
      <h1 class="font-bold text-xl text-black">$${data.price}.00</h1>
      <button id ="btnn"
        class="curentNumberBtn bg-gray-100 w-[50px] h-[40px] rounded-4xl text-black font-bold flex justify-center items-center gap-3 shadow-md hover:bg-gray-300 active:scale-95 transition-all duration-200"
      >
     
        <span id="curentNumber">${quantity}</span>
       
      </button>
    </div>
  </div>
</section>
  
  `;
});

const SelectLocation = document.getElementById("select-location");
SelectLocation.addEventListener("click", function () {
  window.location.href = "location.html";
});

const plusIcon = document.getElementById("plus-icon");
plusIcon.addEventListener("click", () => {
  console.log("ok");
  renderBtn();
});

const poromoInp = document.getElementById("poromoInp");
poromoInp.addEventListener("change", function (event) {
  // console.log(event.target.value);
  const valueinp = event.target.value;
  console.log(valueinp);
  renderBtn(valueinp);
});

function renderBtn(value) {
  const changeInputToBtn = document.getElementById("change-input-to-btn");
  poromoInp.classList.add("hidden");
  changeInputToBtn.classList.remove("hidden");

  changeInputToBtn.innerHTML = `
  <div class="flex justify-center">
    <button class="bg-black w-[150px] h-[47px] rounded-4xl text-white mt-12 mb-12">
      ${value}
    </button>
  </div>
  `;
}
