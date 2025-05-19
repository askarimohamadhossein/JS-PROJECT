let curentNumber = 1;

export const renderProduct = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);

    let sneakerId = urlParams.get("productId");
    console.log("Product ID:", sneakerId);

    const response = await deatilSneaker(sneakerId);
    console.log(response);
    console.log(response.category);

    document.getElementById("main-product").innerHTML = `
  <section class="w-full h-[328px] flex justify-center items-center bg-gray-100">
   <img width="328px" height="328px" src="${response.imageURL}" alt="" />
 </section>
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
   <div class="border-b-1 border-gray-400 mt-4"></div>
 </section>
 <section class="line-clamp-3 mt-5">
  <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti voluptate illum veniam impedit veritatis cum laborum temporibus! Provident ratione ullam iusto voluptatem quas fugit? Perspiciatis, aliquam iusto quisquam laboriosam quaerat distinctio nemo. Earum dolorem error, culpa laboriosam ullam voluptatem! Accusantium natus voluptates, voluptatibus ullam in autem dolorem dolore minus odio.</p>
 </section>
 <section class=" mt-4 mx-5 flex flex-col">
   ${response.brand}
   ${response.category}
 </section>
 <section class="flex flex-row gap-2">
   <div id="size" class="w-1/2"></div>
   <div id="color" class="space-x-2 overflow-x-scroll whitespace-nowrap "></div>
 </section>
 <section class="flex justify-start items-center gap-5 mx-5 mt-14">
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
     <button
       class="bg-black w-[250px] h-[47px] rounded-4xl text-white text-xl font-semibold mb-5 mt-5"
     >
       Add to cart
     </button>
   </div>
 </section>
`;

    const sizeDiv = document.getElementById("size");

    let sizeId = 0;

    response.sizes.split("|").forEach((size) => {
      const button = document.createElement("button");
      sizeId++;
      button.setAttribute("data-id", sizeId);
      button.className =
        "border-2 rounded-full mx-1 w-10 h-10 text-center border-gray-400";
      button.textContent = size;

      button.addEventListener("click", function () {
        const buttonText = this.textContent;
        console.log("Selected size:", buttonText);

        document.querySelectorAll("#size button").forEach((btn) => {
          btn.classList.remove("bg-black", "text-white");
        });

        this.classList.add("bg-black", "text-white");
      });

      sizeDiv.appendChild(button);
    });

    console.log(sizeDiv);

    const colorDiv = document.getElementById("color");
    // اینجا برای اینکه بتونم توی صفحه وقتی کلیک میشه روی رنگ ها ایدی شو با productId چک کنم و اطلاعات رو ذخیره کنم توی لوکال استوریج id ساختم برای هرکدام
    let Colorid = 0;
    response.colors.split("|").forEach((color) => {
      const button = document.createElement("button");

      button.setAttribute("data-id", Colorid);
      Colorid++;

      button.className = "border-1 rounded-full p-3 mx-1 w-10 h-10";

      button.style.backgroundColor = color;

      button.addEventListener("click", function () {
        // console.log("ok");
        console.log(color);
      });
      colorDiv.appendChild(button);
    });
    console.log(colorDiv);

    //این قسمت میخوام چک کنم روی باتن که کلیک شد ایدی شو بکشم بیرون و نهایتا با ایدی product بذارم توی شرط

    const parameterURL = new URLSearchParams(window.location.search);
    console.log(window.location.search, typeof window.location.search);

    let id = parameterURL.get("productId");
    console.log(id);

    // productId رو اینجا گرفتم

    let price = response.price;

    function addPriceShoes(price) {
      const plusButton = document.getElementById("plus");
      const priceDisplay = document.getElementById("priceNumber");
      const numberDisplay = document.getElementById("curentNumber");

      plusButton.addEventListener("click", function () {
        curentNumber++;
        let newPrice = price * curentNumber;

        numberDisplay.textContent = curentNumber;
        priceDisplay.textContent = `$${newPrice}.00`;
      });
    }

    function removePriceShoes(price) {
      const minusButton = document.getElementById("negative");
      const priceDisplay = document.getElementById("priceNumber");
      const numberDisplay = document.getElementById("curentNumber");

      minusButton.addEventListener("click", function () {
        if (curentNumber > 0) {
          curentNumber--;
        }

        let newPrice = price * curentNumber;

        numberDisplay.textContent = curentNumber;
        priceDisplay.textContent = `$${newPrice}.00`;
      });
    }

    addPriceShoes(price);
    removePriceShoes(price);
  } catch (error) {
    console.log("Error:", error);
  }
  console.log(historyObj);
};

window.addEventListener("DOMContentLoaded", renderProduct);
