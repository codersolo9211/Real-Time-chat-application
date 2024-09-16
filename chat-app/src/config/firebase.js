
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyC9dXGc6nuKsGm04qnNeMErM37EsY0rovI",
  authDomain: "chat-app-gs-91836.firebaseapp.com",
  projectId: "chat-app-gs-91836",
  storageBucket: "chat-app-gs-91836.appspot.com",
  messagingSenderId: "596106255574",
  appId: "1:596106255574:web:d8af8397e27f61964c7d77"
};


const app = initializeApp(firebaseConfig);
const  auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username,email,password) => {
    
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey, there i am busy right now",
            lastSeen:Date.now()
        });
        await setDoc(doc(db,"chats",user.uid),{
            chatsData:[]
        });
        toast.success("signup successful!")
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

const login = async (email,password) => {

    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

const logout = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

export { signup,login, logout,auth,db}