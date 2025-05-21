const section = document.querySelectorAll(".payment button");
const sectionContainer = document.querySelectorAll(".payment  ");
console.log(sectionContainer);

section.forEach((btn) => {
  btn.addEventListener("click", function () {
    section.forEach((b) => b.classList.remove("bg-black"));

    btn.classList.add("bg-black");
  });
});

const end = document.getElementById("show-successfull");

const overly = document.getElementById("main-task-overly");

const confirmBtn = document.getElementById("confirm");

confirmBtn.addEventListener("click", function () {
  overly.classList.remove("hidden");
  end.classList.remove("hidden");
  localStorage.clear();
});
