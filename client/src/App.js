import { Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';

import { getSession } from "./API/api";

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
import { Profile } from "./components/Profile/Profile";
import { Logout } from "./components/Logout/Logout";
import { Macronutrients } from "./components/Macronutrients/Macronutrients";
import { EditRecipe } from "./components/Edit/EditRecipe";
import { LoggedUserContext } from "./contexts/LoggedUserContext";

function App() {

  const cookies = new Cookies();

  const [user, setUser] = useState(getSession());
  const [clientCookie, setClientCookie] = useState(cookies.get('user-session'));

  useEffect(() => {
    if (user !== null) {
      cookies.set('user-session', user, { path: "/", maxAge: 48000 });
      setClientCookie(cookies.get('user-session'));
    }
  }, [user, setClientCookie])

  const [isOpen, setIsOpen] = useState({ state: false, target: null });
  const [products, setProducts] = useState([]);

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoggedUserContext.Provider value={user}>
      < div className="App" >
        <Header />
        {/* ----------------------------------------------------------------------------------------------- */}
        <main className="App">
          <NavBar setUser={setUser} setIsOpen={setIsOpen}
            clientCookie={clientCookie}
          />

          {isOpen && isOpen.target === "logout" &&
            <Logout setIsOpen={setIsOpen} setUser={setUser}
              cookies={cookies} user={user} />}
          {/* ----------------------------------------------------------------------------------------------- */}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/auth/login" element={
              <Login setUser={setUser}
                setErrorMessage={setErrorMessage} errorMessage={errorMessage}
                setIsLoading={setIsLoading} />
            } />
            {/* ----------------------------------------------------------------------------------------------- */}
            <Route path="/auth/register" element={<Register setUser={setUser}
              setErrorMessage={setErrorMessage} errorMessage={errorMessage}
              setIsLoading={setIsLoading} />}
            />
            {/* ----------------------------------------------------------------------------------------------- */}
            <Route path="/404" element={<ErrorPage error={errorMessage} />}
            />
            {/* ----------------------------------------------------------------------------------------------- */}
            <Route path="/recipe/add" element={<AddRecipe errorMessage={errorMessage}
              setErrorMessage={setErrorMessage} setIsLoading={setIsLoading} />}
            />
            {/* ----------------------------------------------------------------------------------------------- */}
            <Route path="/edit/:mealId" element={<EditRecipe errorMessage={errorMessage}
              setErrorMessage={setErrorMessage} setIsLoading={setIsLoading} />}
            />
            {/* ----------------------------------------------------------------------------------------------- */}
            <Route path="/recipe/myRecipes" element={
              <MyRecipes isLoading={isLoading} setIsLoading={setIsLoading}
                setErrorMessage={setErrorMessage} errorMessage={errorMessage} />}
            />
            {/* ----------------------------------------------------------------------------------------------- */}
            <Route path="/recipe/browse" element={
              <Browse isLoading={isLoading} setIsLoading={setIsLoading}
                setErrorMessage={setErrorMessage} errorMessage={errorMessage} />}
            />
            {/* ----------------------------------------------------------------------------------------------- */}
            <Route path="/details/:mealId" element={
              <Details  isLoading={isLoading} setIsLoading={setIsLoading}
                setErrorMessage={setErrorMessage} errorMessage={errorMessage} />}
            />
            {/* ----------------------------------------------------------------------------------------------- */}
            <Route path="/auth/profile" element={<Profile />} />

            <Route path="/recipe/macros" element={
              <Macronutrients isLoading={isLoading} setIsLoading={setIsLoading}
                setErrorMessage={setErrorMessage} errorMessage={errorMessage}
                products={products} setProducts={setProducts} />}
            />
            {/* ----------------------------------------------------------------------------------------------- */}
            <Route path="*" element={< ErrorPage errorMessage={errorMessage}
              setErrorMessage={setErrorMessage} />}
            />
            {/* ----------------------------------------------------------------------------------------------- */}
          </Routes>
        </main>
        {/* ----------------------------------------------------------------------------------------------- */}
        <Footer setIsOpen={setIsOpen} user={user} />
        {isOpen && isOpen.target === "about" && <About setIsOpen={setIsOpen} />}
        {isOpen && isOpen.target === "contacts" && <Contacts setIsOpen={setIsOpen} />}
      </div >
    </LoggedUserContext.Provider>
  );
};

export default App;
