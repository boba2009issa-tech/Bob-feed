import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import {db , auth} from "./assets/firebase.js";
import { collection , addDoc , getDocs , query , orderBy , deleteDoc , updateDoc , doc} from "firebase/firestore";
const postContent = document.getElementById("postContent");
const addPostBtn = document.getElementById("addPostBtn");
const postsContainer = document.getElementById("postsContainer");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, (user) =>{
    if(user){
        console.log("User Logged In");
        console.log(user);
    }
    else{
        window.location.href = "/";
    }
})

logoutBtn.addEventListener("click", async () =>{
    try {
        await signOut(auth);
        window.location.href ="/";
    }
    catch (error){
        console.log(error);
    }
})

addPostBtn.addEventListener("click",async () => {
    const content = postContent.value.trim();
    if(!content) return;
    try{
    await addDoc(collection(db,"posts"),
    {
        content: content,
        userEmail : auth.currentUser.email,
        userId : auth.currentUser.uid,
        createdAt : Date.now()
    });
    postContent.value = "";
    getPosts();
    
    }
    catch (error){
        console.log(error);
    }
});

async function getPosts(){
    try{
        const q = query(collection(db,"posts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
         postsContainer.innerHTML = "";
         querySnapshot.forEach((doc)=>{
            const post = doc.data();
            const postId = doc.id;
            const isOwner = auth.currentUser.uid === post.userId;
            postsContainer.innerHTML += `
                 <div class="post">

          <div class="post-header">

            <div class="avatar">
              ${post.userEmail[0].toUpperCase()}
            </div>

            <div class="user-info">
              <h3>${post.userEmail}</h3>
            </div>

          </div>

          <p class="post-content">
            ${post.content}
          </p>
          ${isOwner ? 
            `
             <button class="edit-btn" data-id="${postId}" data-content="${post.content}">Edit</button>
            <button class="delete-btn" data-id="${postId}">  Delete  </button>` : ''}

        </div>
      
            `;
         });

         const deleteBtns = document.querySelectorAll(".delete-btn");
         deleteBtns.forEach((btn) =>{
            btn.addEventListener("click", async () => {
                const id = btn.dataset.id;
                try{
                    await deleteDoc(
                        doc(db,"posts",id)
                    );
                    getPosts();
                }
                catch (error){
                    console.log(error);
                }
            });

         });

         const editBtns = document.querySelectorAll(".edit-btn");

         editBtns.forEach((btn) =>{
            btn.addEventListener("click", async () => {
                const id = btn.dataset.id;
                const oldContent = btn.dataset.content;
                const newContent = prompt("Edit your post:",oldContent);
                if(!newContent) return;

                try{
                    await updateDoc(doc(db,"posts",id),{
                        content : newContent 
                    })
                    getPosts();
                }
                  catch (error) {

                    console.log(error);
                    }
            })
         })

    }
      catch (error) {

    console.log(error);

  }
}
getPosts();