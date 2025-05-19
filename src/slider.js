let currentStep = 0;

function updateUI() {
  steps.style.transform = `translateX(-${currentStep * 100}%)`;
}

document.getElementById("first-btn").addEventListener("click", function () {
  console.log("ok");

  if (currentStep < 3) {
    currentStep++;
    updateUI();
  }
});
document.getElementById("second-btn").addEventListener("click", function () {
  console.log("ok");

  if (currentStep < 3) {
    currentStep++;
    updateUI();
  }
});
document.getElementById("last-btn").addEventListener("click", function () {
  console.log("ok");

  if (currentStep < 4) {
    currentStep++;
    updateUI();
    window.location.href = "signup.html";
  }
});

document.getElementById("shoes-svg").addEventListener("click", function () {
  console.log("ok");

  if (currentStep < 3) {
    currentStep++;
    updateUI();
  }
});
