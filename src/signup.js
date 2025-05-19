import { signup } from "./apis/auth";
import { tokenName } from "./libs/constants";

const username = document.getElementById("username");
const password = document.getElementById("password");
const btn = document.getElementById("signup-btn");

const signupForm = document.getElementById("sign-up-form");
signupForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  console.log("ok");

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  const data = { username: usernameValue, password: passwordValue };
  console.log(data.username);

  localStorage.setItem("username", data.username);

  try {
    const resBody = await signup(data);
    console.log(resBody);
    localStorage.setItem(tokenName, resBody.data.token);
    window.location.href = "home.html";
  } catch (error) {
    console.log(error);
  }
});

function updateButtonState() {
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue && passwordValue) {
    btn.classList.remove("bg-mygray");
    btn.classList.add("bg-black");
  } else {
    btn.classList.remove("bg-black");
    btn.classList.add("bg-mygray");
  }
}

username.addEventListener("input", updateButtonState);
password.addEventListener("input", updateButtonState);
