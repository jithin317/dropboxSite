import { auth } from "./firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
let shelp = document.getElementById("signinHelp");
let lhelp = document.getElementById("loginHelp");
let signupContent = document.getElementById("signUp");
let loginContent = document.getElementById("login");
let sMail = document.getElementById("sMail");
let sPass = document.getElementById("sPass");
let lMail = document.getElementById("lMail");
let lPass = document.getElementById("lPass");
let sBtn = document.getElementById("sBtn");
let lBtn = document.getElementById("lBtn");

shelp.addEventListener("click", () => {
  signupContent.style.display = "none";
  loginContent.style.display = "";
});
lhelp.addEventListener("click", () => {
  signupContent.style.display = "";
  loginContent.style.display = "none";
});

sBtn.addEventListener("click", async () => {
  if (sMail.value === "" || sMail.value === "") {
    alert("please enter the credentials");
  } else {
    try {
      let result = await createUserWithEmailAndPassword(
        auth,
        sMail.value,
        sPass.value
      );
      if (result) {
        window.location.href =
          "http://localhost:5500/public/pages/dropSite.html";
        // window.location.href =
        //   "https://dropsite-e8ab0.web.app/pages/dropSite.html";
      }
    } catch (err) {
      console.log(err);
      alert("please check the credentials and try again");
    }
  }
});
lBtn.addEventListener("click", async () => {
  if (lMail.value === "" || lPass.value === "") {
    alert("please enter the credentials");
  } else {
    try {
      let result = await signInWithEmailAndPassword(
        auth,
        lMail.value,
        lPass.value
      );
      if (result) {
        window.location.href =
          "http://localhost:5500/public/pages/dropSite.html";
        // window.location.href =
        //   "https://dropsite-e8ab0.web.app/pages/dropSite.html";
      } else {
        window.location.href = "https://dropsite-e8ab0.web.app/404.html";
      }
    } catch (err) {
      console.log(err);
      alert("please check the credentials and try again");
    }
  }
});
