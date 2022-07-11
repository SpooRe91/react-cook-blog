import { Route, Routes } from "react-router-dom"
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
import { useEffect, useState } from "react";
import { getSession } from "./API/api";
import { Profile } from "./components/Profile/Profile";
import { Logout } from "./components/Logout/Logout";
import Cookies from 'universal-cookie';
function App() {
  // !!!TODO - RENDER ERROR ELEMENT TO APPEAR ON EVERY PAGE!


  const [user, setUser] = useState(getSession());
  const [errorMessage, setErrorMessage] = useState({});

  const [isOpen, setIsOpen] = useState({ state: false, target: null });

  const cookies = new Cookies();

  if (user) {
    cookies.set('user-session', user.token, { path: "/", maxAge: 36000 })
  }

  useEffect(() => {
    return () => {
      setUser(getSession());
    }
  }, []);

  const clientCookie = cookies.get('user-session');

  return (
    < div className="App" >
      <Header />
      <NavBar user={user} setUser={setUser} setIsOpen={setIsOpen} clientCookie={clientCookie} />
      {isOpen && isOpen.target === "logout" && <Logout setIsOpen={setIsOpen} setUser={setUser} cookies={cookies} />}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth/login" element={<Login setUser={setUser} setErrorMessage={setErrorMessage} cookies={cookies} />} />
        <Route path="/auth/register" element={<Register setUser={setUser} setErrorMessage={setErrorMessage} />} />
        <Route path="/404" element={<ErrorPage error={errorMessage} />} />
        <Route path="/recipe/add" element={<AddRecipe />} />
        <Route path="/recipe/myRecipes" element={<MyRecipes />} />
        <Route path="/recipe/browse" element={<Browse />} />
        <Route path="/details/:userId" element={<Details />} />
        <Route path="/auth/profile" element={<Profile />} />;
      </Routes>

      <Footer setIsOpen={setIsOpen} user={user} />
      {isOpen && isOpen.target === "about" && <About setIsOpen={setIsOpen} />}
      {isOpen && isOpen.target === "contacts" && <Contacts setIsOpen={setIsOpen} />}
    </div >
  );
};

export default App;
