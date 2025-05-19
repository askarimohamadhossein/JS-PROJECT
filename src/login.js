import { login } from "./apis/auth";
import { tokenName } from "./libs/constants";

const username = document.getElementById("username");
const password = document.getElementById("password");
const btn = document.getElementById("login-btn");

document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    // console.log("ok");
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    const data = { username: usernameValue, password: passwordValue };
    console.log(data);

    localStorage.setItem("username", data.username);

    try {
      const resBody = await login(data);

      console.log("Response:", resBody);
      console.log(resBody.data);
      localStorage.setItem(tokenName, resBody.data.token);
      console.log(resBody.data.token);
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
