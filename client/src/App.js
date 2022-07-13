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
import { Footer } from "./components/common/Footer";
import { Header } from "./components/common/Header";
import { useState } from "react";
import { getSession } from "./API/api";
import { Profile } from "./components/Profile/Profile";
import { Logout } from "./components/Logout/Logout";
import Cookies from 'universal-cookie';
function App() {
  // !!!TODO - RENDER ERROR ELEMENT TO APPEAR ON EVERY PAGE!

  const [user, setUser] = useState(getSession());
  const [errorMessage, setErrorMessage] = useState({});

  const [isOpen, setIsOpen] = useState({ state: false, target: null });
  const [isLoading, setIsLoading] = useState(true);

  const cookies = new Cookies();

  if (user) {
    cookies.set('user-session', user.token, { path: "/", maxAge: 36000 });
  }

  const clientCookie = cookies.get('user-session');

  return (
    < div className="App" >
      <Header />
      <NavBar user={user} setUser={setUser} setIsOpen={setIsOpen} clientCookie={clientCookie} />
      {isOpen && isOpen.target === "logout" && <Logout setIsOpen={setIsOpen} setUser={setUser} cookies={cookies} user={user} />}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth/login" element={<Login setUser={setUser} setErrorMessage={setErrorMessage} isLoading={isLoading} setIsLoading={setIsLoading} />} />
        <Route path="/auth/register" element={<Register setUser={setUser} setErrorMessage={setErrorMessage} />} />
        <Route path="/404" element={<ErrorPage error={errorMessage} />} />
        <Route path="/recipe/add" element={<AddRecipe setErrorMessage={setErrorMessage} setIsLoading={setIsLoading} />} />
        <Route path="/recipe/myRecipes" element={<MyRecipes isLoading={isLoading} setIsLoading={setIsLoading} setErrorMessage={setErrorMessage} />} />
        <Route path="/recipe/browse" element={<Browse isLoading={isLoading} setIsLoading={setIsLoading} setErrorMessage={setErrorMessage} />} />
        <Route path="/details/:userId" element={<Details isLoading={isLoading} setIsLoading={setIsLoading} setErrorMessage={setErrorMessage} />} />
        <Route path="/auth/profile" element={<Profile />} />;
      </Routes>

      <Footer setIsOpen={setIsOpen} user={user} />
      {isOpen && isOpen.target === "about" && <About setIsOpen={setIsOpen} />}
      {isOpen && isOpen.target === "contacts" && <Contacts setIsOpen={setIsOpen} />}
    </div >
  );
};

export default App;
