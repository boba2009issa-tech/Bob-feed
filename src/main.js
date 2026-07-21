import "./style.css";
import { auth } from "./assets/firebase.js";
import {
     createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';


const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const message = document.getElementById("message");

signupBtn.addEventListener("click",async ()=> {
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        message.textContent = "Account created successfully";
        console.log(userCredential.user)
        window.location.href = "/feed.html";

    }
    catch (error) {
        message.textContent = error.message;
        console.log(error)
    }
}
);


loginBtn.addEventListener("click",async ()=> {
    const email = loginEmail.value;
    const password = loginPassword.value;

    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        window.location.href = "/feed.html";
        message.textContent = "Login successfully";
        console.log(userCredential.user)
    }
    catch (error) {
        message.textContent = error.message;
        console.log(error)
    }
}
);