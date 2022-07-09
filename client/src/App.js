import { Route, Routes } from "react-router-dom"
import { Login } from "./components/Login/Login"
import { NavBar } from "./components/NavBars/Navbar"
import { Register } from "./components/Register/Register";
import { About } from "./components/About/About";
import { Contacts } from "./components/Contacts/Contacts";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import { AddRecipe } from "./components/AddRecipe/AddRecipe";
import { Browse } from "./components/Browse/Browse";
import { Details } from "./components/Details/Details";
import { MyRecipes } from "./components/MyRecipes/MyRecipes";
import { Homepage } from "./components/Homepage/Homepage";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { userLogin } from "./services/userService";
import { useEffect, useState } from "react";
import { setSession, getSession } from "./API/api";
import { Logout } from "./components/Logout/Logout";

function App() {

  const [user, setUser] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    userLogin({ email, password })
      .then(res => {
        console.log(res);
        if (res.token) {
          setSession(res.email, res.token, res.id);
        };
      });
  };

  return (
    useEffect(() => {
      setUser(getSession());
      console.log(getSession());
    }, []),
    < div className="App" >
      <Header />
      <NavBar user={{ ...user }} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth/login" element={<Login loginHandler={handleSubmit} />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/404" element={<ErrorPage />} />
        <Route path="/recipe/add" element={<AddRecipe />} />
        <Route path="/recipe/myRecipes" element={<MyRecipes />} />
        <Route path="/recipe/browse" element={<Browse />} />
        <Route path="/details/:userId" element={<Details />} />
        <Route path="/auth/logout" element={<Logout />} />
      </Routes>
      <Footer />
    </div >
  );
};

export default App;
