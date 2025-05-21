const section = document.querySelectorAll(".shipping button");
const sectionContainer = document.querySelectorAll(".shipping  ");
console.log(sectionContainer);

section.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    section.forEach((b) => b.classList.remove("bg-black"));
    const shipping = document.querySelectorAll(".shipping");

    let chooseShipping = shipping[index];
    console.log(chooseShipping.innerHTML);
    localStorage.setItem(
      "choose-shipping",
      JSON.stringify(chooseShipping.innerHTML)
    );

    btn.classList.add("bg-black");
  });
});
