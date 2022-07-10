import { Route, Routes, useNavigate } from "react-router-dom"
import { Login } from "./components/Login/Login"
import { NavBar } from "./components/NavBars/Navbar"
import { Register } from "./components/Register/Register";
import { Contacts } from "./components/Contacts/Contacts";
import { About } from "./components/About/About";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import { AddRecipe } from "./components/AddRecipe/AddRecipe";
import { Browse } from "./components/Browse/Browse";
import { Details } from "./components/Details/Details";
import { MyRecipes } from "./components/MyRecipes/MyRecipes";
import { Homepage } from "./components/Homepage/Homepage";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { userLogin, userRegister } from "./services/userService";
import { useEffect, useState } from "react";
import { setSession, getSession } from "./API/api";
import { Logout } from "./components/Logout/Logout";
import { Profile } from "./components/Profile/Profile";

function App() {

  // !!!TODO - RENDER ERROR ELEMENT TO APPEAR ON EVERY PAGE!

  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = [{}];
  let navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    userLogin({ email, password })
      .then(res => {
        console.log(res);
        if (res.token) {
          setSession(res.email, res.token, res.id);
          setUser(getSession());
          navigate('/recipe/browse');
        } else {
          setErrorMessage({ error: "Username or password don't match!" });
          throw new Error("Username or password don't match!");
        }
      });
  };

  const registerHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email, password, rePassword } = Object.fromEntries(formData);

    console.log(email, password, rePassword);

    userRegister({ email, password, rePassword })
      .then(res => {
        console.log(res);
        if (res.token) {
          setSession(res.email, res.token, res.id);
          setUser(getSession());
          navigate('/recipe/browse');
        } else {
          setErrorMessage({ error: "Email or password are invalid!" });
          throw new Error("Email or password are invalid!");
        }
      });
  }

  return (

    useEffect(() => {
      return () => {
        console.log(getSession());
        setUser(user => getSession());
      }
    }, []),
    < div className="App" >
      <Header />
      <NavBar user={{ ...getSession() }} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth/login" element={<Login loginHandler={loginHandler} />} />
        <Route path="/auth/register" element={<Register registerHandler={registerHandler} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/404" element={<ErrorPage error={errorMessage} />} />
        <Route path="/recipe/add" element={<AddRecipe />} />
        <Route path="/recipe/myRecipes" element={<MyRecipes />} />
        <Route path="/recipe/browse" element={<Browse />} />
        <Route path="/details/:userId" element={<Details />} />
        <Route path="/auth/logout" element={<Logout />} />
        <Route path="/auth/profile" element={<Profile />} />;
      </Routes>
      <Footer />
    </div >
  );
};

export default App;
