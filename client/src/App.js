import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route , Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import Addpost from "./pages/Addpost";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector , useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllPosts } from "./redux/actions/postActions";
import { getAllUsers } from "./redux/actions/userActions";
import AllUsers from "./pages/AllUsers";
import Editprofile from "./pages/Editprofile";


function App() {
  const { loading , likeOrUnlikeLoading} = useSelector((state) => state.alertsReducer);

  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(getAllPosts())
    dispatch(getAllUsers())
   
  }, [])

  return (
    <div className="App">
      
      {(loading || likeOrUnlikeLoading ) && (<div className="spinner-border " role="status" style={{borderWidth:5 }}>
        <span class="sr-only" >Loading...</span>
      </div>)}

      <BrowserRouter>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <ProtectedRoute path="/" exact component={Home} />
        <ProtectedRoute path="/profile/:userid" exact component={Profile} />
        <ProtectedRoute path="/addpost" exact component={Addpost} />
        <ProtectedRoute path="/allusers" exact component={AllUsers} />
        <ProtectedRoute path="/editprofile" exact component={Editprofile} />
      </BrowserRouter>
    </div>
  );
}

export default App;


export const ProtectedRoute=(props)=>{

    if(localStorage.getItem('user')){

      return <Route {...props}/>

    }else{
      return <Redirect to='/login'/>
    }

}
