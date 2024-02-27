import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import AuthUser from "./components/auth/AuthUser";
import Guest from "./components/nabvar/guest";
import Auth from "./components/nabvar/auth";


function App() {
  const {getToken} = AuthUser();

  if(!getToken()) {
    return <Guest/>
  }
  if (getToken()) {
    return (
     <Auth/>
    );
  }
 
}

export default App;
