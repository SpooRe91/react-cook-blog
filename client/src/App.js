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
import { ErrorContextProvider } from "./contexts/ErrorMessageContext";
import { NoUserGuard } from "./components/common/NoUserGuard";
import { LoggedUserGuard } from "./components/common/LoggedUserGuard";

function App() {

  const [isOpen, setIsOpen] = useState({ state: false, target: null });
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ErrorContextProvider>
      <LoggedUserProvider>
        < div className="App" >
          <Header />
          {/* --------------------------------------NavBar----------------------------------------------- */}
          <main className="App">
            <NavBar setIsOpen={setIsOpen} />
            {/* -------------------------------------Logout------------------------------------------------- */}
            {isOpen && isOpen.target === "logout" &&
              <Logout setIsOpen={setIsOpen} />}
            {/* -------------------------------------Homepage------------------------------------------------- */}
            <Routes>
              <Route path="/" element={<Homepage />} />
              {/* --------------------------------------Login-------------------------------------------------- */}
              <Route path="/auth/login" element={(
                <LoggedUserGuard>
                  <Login setIsLoading={setIsLoading} />
                </LoggedUserGuard>
              )}
              />
              {/* ---------------------------------Register---------------------------------------------------- */}
              <Route path="/auth/register" element={(
                <LoggedUserGuard>
                  <Register setIsLoading={setIsLoading} />
                </LoggedUserGuard>
              )}
              />
              {/* ------------------------------------ErrorPage------------------------------------------------- */}
              <Route path="/404" element={<ErrorPage />}
              />
              {/* ----------------------------------AddRecipe-------------------------------------------------- */}
              <Route path="/recipe/add" element={(
                <NoUserGuard>
                  <AddRecipe setIsLoading={setIsLoading} />
                </NoUserGuard>
              )}
              />
              {/* -----------------------------------EditRecipe----------------------------------------------- */}
              <Route path="/edit/:mealId" element={(
                <NoUserGuard>
                  <EditRecipe setIsLoading={setIsLoading} />
                </NoUserGuard>
              )}
              />
              {/* ------------------------------------MyRecipes------------------------------------------------- */}
              <Route path="/recipe/myRecipes" element={(
                <NoUserGuard >
                  <MyRecipes isLoading={isLoading} setIsLoading={setIsLoading} />
                </NoUserGuard>
              )}
              />
              {/* ------------------------------------Browse------------------------------------------------- */}
              <Route path="/recipe/browse" element={
                <Browse isLoading={isLoading} setIsLoading={setIsLoading} />}
              />
              {/* -----------------------------------Details-------------------------------------------------- */}
              <Route path="/details/:mealId" element={
                <Details isLoading={isLoading} setIsLoading={setIsLoading} />}
              />
              {/* ------------------------------------Profile-------------------------------------------------- */}
              <Route path="/auth/profile/:id" element={(
                <NoUserGuard >
                  <Profile />
                </NoUserGuard>
              )} />
              {/* ---------------------------------Macronutrients------------------------------------------------- */}
              <Route path="/recipe/macros" element={
                <Macronutrients isLoading={isLoading} setIsLoading={setIsLoading} />}
              />
              {/* ----------------------------------If route is not valid - ErrorPage-----------------------------*/}
              <Route path="*" element={< ErrorPage />} />
              {/* ----------------------------------------------------------------------------------------------- */}
            </Routes>
          </main>
          {/* ---------------------------------------Footer------------------------------------------- */}
          <Footer setIsOpen={setIsOpen} />
          {/* ---------------------------------------About------------------------------------------- */}
          {isOpen && isOpen.target === "about" && <About setIsOpen={setIsOpen} />}
          {/* ---------------------------------------Contacts------------------------------------------- */}
          {isOpen && isOpen.target === "contacts" && <Contacts setIsOpen={setIsOpen} />}
          {/* ---------------------------------------------------------------------------------- */}
        </div >
      </LoggedUserProvider>
    </ErrorContextProvider >
  );
};

export default App;
