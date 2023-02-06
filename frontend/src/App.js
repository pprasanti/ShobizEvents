// import logo from './logo.svg';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'
import { useState } from 'react';
import './App.css';
import Tasks from './components/Tasks/Tasks';

function App() {
  // Step 01: Create an instance of the Google provider object:
  const provider = new GoogleAuthProvider();

  // Step 02: Specify additional OAuth 2.0 scopes that you want to request from the authentication provider.
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

  // Step 03: Create an auth instance
  const auth = getAuth();

  const [authorizedUser,setAuthorizedUser] = useState(false || sessionStorage.getItem("accessToken"));

  // Step 04: Proceed for Authentication
  function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // Get the sogned-in user info
        const user = result.user;
        console.log(token);

        if(user){
          user.getIdToken().then((tkn) => {
            // set access token in session storage
            sessionStorage.setItem("accessToken", tkn);
            setAuthorizedUser(true);
          })
        }
        console.log(user);

      }).catch((error) => {
        // Handle errpr here
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log( error);
        console.log( error.customData.email);
        console.log(GoogleAuthProvider.credentialFromError(error));

       
        // The email of the user's account used
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      })
  }

  function logoutUser(){
    signOut(auth).then(() => {
      // clear session storage
      sessionStorage.clear();
      setAuthorizedUser(false);

      //window.location.replace("/");
      alert('Logged Out Successfully');
    }).catch((error) => {
      alert(error);
    })
  }

  return (
    <div className="App">
      {authorizedUser ? (
        <>
        <p>Authorized user</p>
        <h1>Tasks</h1>
        <Tasks token={sessionStorage.getItem('accessToken')}/>
        <button onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <><button onClick={signInWithGoogle}>Google Sign in</button></>
      )}
    </div>
  );
}

export default App;
