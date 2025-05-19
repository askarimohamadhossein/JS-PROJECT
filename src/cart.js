let dataLocalStorage = localStorage.getItem("data-new");
console.log(JSON.parse(dataLocalStorage));

let dataCart = JSON.parse(dataLocalStorage);
console.log(dataCart);

let quantity = null;
let newPrice = null;

function renderCart() {
  let dataCartSt = JSON.parse(localStorage.getItem("data-new"));
  document.getElementById("cart").innerHTML = "";
  dataCartSt.forEach((data) => {
    quantity = data.quantity;
    document.getElementById("cart").innerHTML += `

<section id = "mamadi"
  class="mamadi flex items-center gap-4 shadow-xl rounded-4xl bg-white p-4 mb-6 "
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
      <img id = "recycle-bin"
        class="recycle-bin w-8 h-8 cursor-pointer"
        src="src/image/recycle-bin.png"
        alt="Delete"
      />
    </div>
    <div
      class="flex justify-start items-center gap-2 border-gray-300 py-2"
    >
      <button class="colorBtn border-1 rounded-full mx-1 w-5 h-5  "></button>
      <p class="font-semibold text-sm text-gray-500">color | Size = ${data.size}</p>
    </div>
    <div class="flex justify-between items-center pt-2">
      <h1 class="font-bold text-xl text-black">$${data.price}.00</h1>
      <button id ="btnn"
        class="curentNumberBtn bg-gray-100 w-[110px] h-[40px] rounded-4xl text-black font-bold flex justify-center items-center gap-3 shadow-md hover:bg-gray-300 active:scale-95 transition-all duration-200"
      >
        <img
          id="negative"
          width="10px"
          height="10px"
          src="src/svg/negative-sign.svg"
          alt=""
        />
        <span id="curentNumber">${quantity}</span>
        <img
          class = "plus"
          id="plus"
          width="10px"
          height="10px"
          src="src/svg/52-523186_plus-sign-comments-plus-icon-svg-hd-png.png"
          alt=""
        />
      </button>
    </div>
  </div>
</section>
  
  `;
    // console.log(index);
    setColor(dataCart);
    calculatePrice(data);
    removeItem();
  });
}
renderCart();

export function totalPrice() {
  const totalPrice = dataCart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("priceNumber").textContent = `$${totalPrice}.00`;
}
totalPrice();

function getRecycleBin() {
  document.querySelectorAll(".recycle-bin").forEach((btn, index) => {
    btn.addEventListener("click", function () {
      console.log(`Item ${index + 1} removed`);
      // this.closest("section").remove();
    });
  });
}
getRecycleBin();

function calculatePrice(data) {
  // console.log(data.price, typeof data.price);

  if (plus) {
    // console.log("plus");
    document.querySelectorAll(".curentNumberBtn").forEach((btn, index) => {
      btn.addEventListener("click", function () {
        console.log(`btn ${index + 1} selected`);
      });
    });
  } else {
    console.log("negative");
  }
}

function setColor(dataCart) {
  let btns = document.querySelectorAll(".colorBtn");
  btns.forEach((btn, index) => {
    btn.style.backgroundColor = dataCart[index]?.color;
  });
}

function removeItem() {
  document.querySelectorAll(".recycle-bin").forEach((btn, index) => {
    btn.addEventListener("click", function () {
      const deletedItem = dataCart[index];
      // console.log(`Item Removed:`, deletedItem);
      setColor(dataCart);
      confirmDeleteCart(deletedItem);
    });
  });
}

function confirmDeleteCart(deletedItem) {
  setColor(dataCart);
  document.getElementById("new-task-overlay").classList.remove("hidden");
  let removeInfo = document.getElementById("renderDelete");
  removeInfo.innerHTML = `
       <section
          id="confirm"
          class="fixed bottom-0 left-0 w-full h-[300px] bg-white z-[50] rounded-t-4xl"
        >
          <h1 class="text-center font-semibold text-2xl mt-5  border-b-2 border-gray-200">
            Remove From Cart?
          </h1>
          <div>
            <section class="flex items-center rounded-4xl bg-white p-4">
              <img
                class="w-36 h-36 rounded-lg"
                src="${deletedItem.image}"
                alt=""
              />

              <div class="flex flex-col w-full">
                <div class="flex justify-between items-center border-gray-300">
                  <h1
                    class="text-black font-bold text-xl truncate overflow-hidden whitespace-nowrap w-[200px]"
                  >
                   ${deletedItem.name}
                  </h1>
                  <img
                    class="w-8 h-8 cursor-pointer"
                    src="src/image/recycle-bin.png"
                    alt="Delete"
                  />
                </div>

                <div
                  class="flex justify-start items-center gap-3 border-gray-300 py-2"
                >
                  <button id="btn-remove" class=" colorBtn border-1 rounded-full mx-1 w-5 h-5"></button>
                  <p class="font-semibold text-sm text-gray-500">color | Size = ${deletedItem.size}</p>
                </div>

                <div class="flex justify-between items-center pt-2">
                  <h1 class="font-bold text-xl text-black">$${deletedItem.price}.00</h1>
                  <button
                    class="bg-gray-100 w-[110px] h-[40px] rounded-4xl text-black font-bold flex justify-center items-center gap-3 shadow-md hover:bg-gray-300 active:scale-95 transition-all duration-200"
                  >
                    <img
                      id="negative"
                      width="10px"
                      height="10px"
                      src="src/svg/negative-sign.svg"
                      alt=""
                    />
                    <span id="curentNumber">${deletedItem.quantity}</span>
                    <img
                      id="plus"
                      width="10px"
                      height="10px"
                      src="src/svg/52-523186_plus-sign-comments-plus-icon-svg-hd-png.png"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </section>
          </div>
          <div class="flex justify-center gap-2 ">
            <div class="flex justify-center">
              <button id = "cancel"
                class="bg-gray-200 w-[180px] h-[47px] rounded-4xl text-black"
              >
                Cancel
              </button>
            </div>
            <div class="flex justify-center">
              <button 
                id="remove" 
                dataId="${deletedItem.id}"
                class="remove-confirm-btn bg-black w-[180px] h-[47px] rounded-4xl text-white"
              >
                Yes,Remove
              </button>
            </div>
          </div>
        </section>
  `;
  document.getElementById("renderDelete").classList.remove("hidden");
  document.getElementById("btn-remove").style.backgroundColor =
    deletedItem.color;

  //اینجا میخوام اطلاعات کفشو از سبد خرید پاک کنم
  document.getElementById("remove").addEventListener("click", function (event) {
    const dataId = event.target.getAttribute("dataId");
    console.log(dataId);
    dataCart = dataCart.filter((item) => item.id !== +dataId);
    localStorage.setItem("data-new", JSON.stringify(dataCart));
    console.log(dataCart);

    renderCart();
    //اینجا نتونستم دقیق دسترسی پیدا کنم به اون چیزی ک باید حذف میشد ))))):
    // document.querySelectorAll(".mamadi").remove();
    console.log(document.querySelectorAll(".mamadi"));

    totalPrice();
    document.getElementById("new-task-overlay").classList.add("hidden");
  });

  //کلیک برروی کنسل
  document.getElementById("cancel").addEventListener("click", function () {
    document.getElementById("renderDelete").classList.add("hidden");
    document.getElementById("new-task-overlay").classList.add("hidden");
  });
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  window.location.href = "checkout.html";
});
