import { Route, Routes } from "react-router-dom"
import { useState } from "react";

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

import { LoggedUserProvider } from "./contexts/LoggedUserContext";
import { ErrorContext } from "./contexts/ErrorMessageContext";

function App() {

  const [isOpen, setIsOpen] = useState({ state: false, target: null });

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);





  return (
    <ErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
      <LoggedUserProvider /*value={{ user, userHandler }}*/>
        < div className="App" >
          <Header />
          {/* ----------------------------------------------------------------------------------------------- */}
          <main className="App">
            <NavBar setIsOpen={setIsOpen} />

            {isOpen && isOpen.target === "logout" &&
              <Logout setIsOpen={setIsOpen}/>}
            {/* ----------------------------------------------------------------------------------------------- */}
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/auth/login" element={
                <Login setIsLoading={setIsLoading} />
              } />
              {/* ----------------------------------------------------------------------------------------------- */}
              <Route path="/auth/register" element={<Register setIsLoading={setIsLoading} />}
              />
              {/* ----------------------------------------------------------------------------------------------- */}
              <Route path="/404" element={<ErrorPage />}
              />
              {/* ----------------------------------------------------------------------------------------------- */}
              <Route path="/recipe/add" element={<AddRecipe setIsLoading={setIsLoading} />}
              />
              {/* ----------------------------------------------------------------------------------------------- */}
              <Route path="/edit/:mealId" element={<EditRecipe setIsLoading={setIsLoading} />}
              />
              {/* ----------------------------------------------------------------------------------------------- */}
              <Route path="/recipe/myRecipes" element={
                <MyRecipes isLoading={isLoading} setIsLoading={setIsLoading} />}
              />
              {/* ----------------------------------------------------------------------------------------------- */}
              <Route path="/recipe/browse" element={
                <Browse isLoading={isLoading} setIsLoading={setIsLoading} />}
              />
              {/* ----------------------------------------------------------------------------------------------- */}
              <Route path="/details/:mealId" element={
                <Details isLoading={isLoading} setIsLoading={setIsLoading} />}
              />
              {/* ----------------------------------------------------------------------------------------------- */}
              <Route path="/auth/profile" element={<Profile />} />

              <Route path="/recipe/macros" element={
                <Macronutrients isLoading={isLoading} setIsLoading={setIsLoading} />}
              />
              {/* ----------------------------------------------------------------------------------------------- */}
              <Route path="*" element={< ErrorPage />}
              />
              {/* ----------------------------------------------------------------------------------------------- */}
            </Routes>
          </main>
          {/* ----------------------------------------------------------------------------------------------- */}
          <Footer setIsOpen={setIsOpen} />
          {isOpen && isOpen.target === "about" && <About setIsOpen={setIsOpen} />}
          {isOpen && isOpen.target === "contacts" && <Contacts setIsOpen={setIsOpen} />}
        </div >
      </LoggedUserProvider>
    </ErrorContext.Provider>
  );
};

export default App;
