import "toastify-js/src/toastify.css";
import { signup } from "./apis/auth";
import { tokenName } from "./libs/constants";

const username = document.getElementById("username");
const password = document.getElementById("password");
const btn = document.getElementById("login-btn");

const systemErr = document.getElementById("system-err");
const usernameErr = document.getElementById("username-err");
const passwordErr = document.getElementById("password-err");

const showErrors = (msg) => {
  if (msg.includes("username")) {
    usernameErr.innerText = msg;
    usernameErr.classList.remove("hidden");
  } else if (msg.includes("password")) {
    passwordErr.innerText = msg;
    passwordErr.classList.remove("hidden");
  } else {
    systemErr.innerText = msg;
    systemErr.classList.remove("hidden");
  }
};

const clearError = () => {
  systemErr.classList.add("hidden");
  usernameErr.classList.add("hidden");
  passwordErr.classList.add("hidden");
};

document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    clearError();
    // console.log("ok");
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    const data = { username: usernameValue, password: passwordValue };
    console.log(data);

    localStorage.setItem("username", data.username);

    try {
      const resBody = await signup(data);

      console.log("Response:", resBody);
      console.log(resBody.data);
      localStorage.setItem(tokenName, resBody.data.token);

      console.log(resBody.data.token);
      window.location.href = "home.html";
    } catch (error) {
      const msg = error.response?.data?.message;
      if (Array.isArray(msg)) {
        msg.forEach(showErrors);
        return;
      }
      if (typeof msg === "string") {
        showErrors(msg);
        return;
      }
      console.log(error);
      showErrors("Something went wrong");
    }
  });

function updateButtonState() {
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue && passwordValue) {
    btn.classList.remove("bg-mygray");
    btn.classList.add("bg-black");
  } else {
    // btn.disabled = true;
    btn.classList.remove("bg-black");
    btn.classList.add("bg-mygray");
  }
}

username.addEventListener("input", updateButtonState);
password.addEventListener("input", updateButtonState);

const unvis = document.getElementById("unvisible");
const vis = document.getElementById("visible");
const passwordInput = document.getElementById("password");

unvis.addEventListener("click", function () {
  if (passwordInput.getAttribute("type") === "password") {
    passwordInput.setAttribute("type", "text");
    vis.classList.remove("hidden");
  } else {
    passwordInput.setAttribute("type", "password");
  }
});

vis.addEventListener("click", function () {
  if (passwordInput.getAttribute("type") === "text") {
    passwordInput.setAttribute("type", "password");
    vis.classList.add("hidden");
  } else {
    passwordInput.setAttribute("type", "text");
  }
});

Toastify({
  text: "This is a toast",
  duration: 3000,
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
