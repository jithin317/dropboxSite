import { auth, storage } from "./firebaseConfig.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  ref,
  uploadBytesResumable,
  listAll,
  deleteObject,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

let userId;
const inputFile = document.getElementById("inputFile");
const dropBox = document.getElementById("drop-box");
const fileList = document.getElementById("fileList");
const logOutBtn = document.getElementById("logOutBtn");
const name = document.getElementById("name");
let topName = document.getElementById("top-name");

console.log(topName);
// TO check the user is legit or not
async function loginCheck() {
  await onAuthStateChanged(auth, (snapshot) => {
    if (!snapshot) {
      // window.location.href = "https://dropsite-e8ab0.web.app/pages/auth.html";
      window.location.href = "http://localhost:5500/public/pages/auth.html";
    }
    userId = snapshot.uid;
    name.innerText = snapshot.email.slice(0, snapshot.email.indexOf("@"));
    topName.innerText = name.innerText;
    listAllFiles();
  });
}
loginCheck();

// File upload listener
inputFile.addEventListener("change", uploadingFile);
// drag & drop event listener
dropBox.addEventListener("dragover", (e) => e.preventDefault());
dropBox.addEventListener("drop", (e) => {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;
  uploadingFile();
});
// logic to store the file in Firebase Storage
async function uploadingFile() {
  let fileType = inputFile.files[0].name.slice(
    inputFile.files[0].name.lastIndexOf(".")
  );
  let fileName = inputFile.files[0].name.slice(
    0,
    inputFile.files[0].name.lastIndexOf(".")
  );
  const storageRef = await ref(storage, `${userId}/${fileName}${fileType}`);
  const uploadFile = await uploadBytesResumable(storageRef, inputFile.files[0]);
  listAllFiles();
  console.log(uploadFile);
}
// Lists the user uploaded files to the list
async function listAllFiles() {
  const storageRef = await ref(storage, `${userId}/`);
  const result = await listAll(storageRef);
  fileList.innerHTML = "";
  result.items.forEach((item) => {
    let name = JSON.stringify(item.fullPath.split("/")[1]);
    fileList.innerHTML += `<div class="item">
      <li>${item.name}</li>
      <div>
        <label for="inputFile" class = "edit-btn" data-id = ${name}>Edit</label>
        <button class="del-btn" data-id = ${name}>Delete</button>
      </div>
    </div>`;
    for (let btn of document.getElementsByClassName("del-btn")) {
      btn.addEventListener("click", (e) => {
        deleteFile(e.target.getAttribute("data-id"), userId);
      });
    }
    for (let btn of document.getElementsByClassName("edit-btn")) {
      btn.addEventListener("click", (e) => {
        editFile(e.target.getAttribute("data-id"), userId);
      });
    }
  });
}
async function deleteFile(fileName, uid) {
  try {
    const fileRef = ref(storage, `${uid}/${fileName}`);
    const res = await deleteObject(fileRef);
    listAllFiles();
  } catch (err) {
    console.log(err);
  }
}
async function editFile(fileName, uid) {
  deleteFile(fileName, uid);
  uploadingFile();
  listAllFiles();
}
logOutBtn.addEventListener("click", (e) => {
  let ans = confirm("Are you Sure you want to logout ?");
  if (ans) {
    signOut(auth);
    loginCheck();
  }
});
