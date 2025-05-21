// console.log("ok");

const section = document.querySelectorAll(".loc button");
const sectionContainer = document.querySelectorAll(".loc p ");
console.log(sectionContainer);

section.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    section.forEach((b) => b.classList.remove("bg-black"));
    const texts = document.querySelectorAll("p.font-bold");

    let shippingAdress = texts[index].textContent;
    console.log(shippingAdress);
    localStorage.setItem("location", JSON.stringify(shippingAdress));

    btn.classList.add("bg-black");
  });
});

const newAddressBtn = document.getElementById("new-Addres");
newAddressBtn.addEventListener("click", function () {
  const newAddress = document.getElementById("new-addrs");
  newAddress.innerHTML = `
     <section
   class="flex justify-between items-center mx-5 mt-5 shadow-md p-5 rounded-4xl"
 >
   <div class="flex">
     <img src="src/image/location2.png" alt="" />
     <div class="mx-3">
       <p class="font-bold">Parent's House</p>
       <p class="text-sm text-gray-500">Lorem ipsum dolor sit amet.</p>
     </div>
   </div>
   <button class="border-2 w-5 h-5 rounded-full"></button>
 </section>
  `;
});
