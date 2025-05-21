const section = document.querySelectorAll(".payment button");
const sectionContainer = document.querySelectorAll(".payment  ");
console.log(sectionContainer);

section.forEach((btn) => {
  btn.addEventListener("click", function () {
    section.forEach((b) => b.classList.remove("bg-black"));

    btn.classList.add("bg-black");
  });
});
