let currentStep = 0;
updateUI();
function updateUI() {
  steps.style.transform = `translateX(-${currentStep * 100}%)`;
  document.querySelectorAll(".stp").forEach((step, index) => {
    if (index === currentStep) {
      step.classList.add("bg-black");
      step.classList.remove("bg-gray-500");
    } else {
      step.classList.add("bg-gray-500");
      step.classList.remove("bg-black");
    }
  });
}

document.getElementById("first-btn").addEventListener("click", function () {
  if (currentStep < 2) {
    currentStep++;
    updateUI();
  }

  if (currentStep === 2) {
    const btn = document.getElementById("first-btn");
    btn.textContent = "Get Started";
    btn.addEventListener("click", function () {
      window.location.href = "signup.html";
    });
  }
  updateUI();
});

function clickBtn() {
  const btns = document.querySelectorAll(".stp");
  btns.forEach((btn, indx) => {
    btn.addEventListener("click", function () {
      // console.log("ok");
      // console.log(indx);
      currentStep = indx;
      if (currentStep === 2) {
        const btn = document.getElementById("first-btn");
        btn.textContent = "Get Started";
        btn.addEventListener("click", function () {
          window.location.href = "signup.html";
        });
      } else {
        const btn = document.getElementById("first-btn");
        btn.textContent = "Next";
      }
      updateUI();
    });
  });
}
clickBtn();
