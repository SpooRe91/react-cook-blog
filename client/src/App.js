import { useState } from "react";
import { Route, Routes } from "react-router-dom"

import { Login } from "./components/Login/Login"
import { About } from "./components/About/About";
import { NavBar } from "./components/NavBars/Navbar"
import { Browse } from "./components/Browse/Browse";
import { Footer } from "./components/common/Footer";
import { Logout } from "./components/Logout/Logout";
import { Profile } from "./components/Profile/Profile";
import { Details } from "./components/Details/Details";
import { Contacts } from "./components/Contacts/Contacts";
import { Register } from "./components/Register/Register";
import { Homepage } from "./components/Homepage/Homepage";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import { AddRecipe } from "./components/AddRecipe/AddRecipe";
import { MyRecipes } from "./components/MyRecipes/MyRecipes";
import { EditRecipe } from "./components/Edit/EditRecipe";
import { NoUserGuard } from "./components/common/NoUserGuard";
import { Macronutrients } from "./components/Macronutrients/Macronutrients";
import { LoggedUserGuard } from "./components/common/LoggedUserGuard";
import { LoggedUserProvider } from "./contexts/LoggedUserContext";
import { ErrorContextProvider } from "./contexts/ErrorMessageContext";


function App() {

  const [isOpen, setIsOpen] = useState({ state: false, target: null });
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ErrorContextProvider>
      <LoggedUserProvider>
        <NavBar setIsOpen={setIsOpen} />
        <div className="App">

          {isOpen && isOpen.target === "logout" &&
            <Logout isLoading={isLoading} setIsLoading={setIsLoading} setIsOpen={setIsOpen} />}

          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route element={<LoggedUserGuard />} >
              <Route path="/auth/login" element={<Login isLoading={isLoading} setIsLoading={setIsLoading} />} />
              <Route path="/auth/Register" element={<Register isLoading={isLoading} setIsLoading={setIsLoading} />} />
            </Route>

            <Route path="/404"
              element={<ErrorPage />}
            />
            <Route element={<NoUserGuard />} >
              <Route path="/auth/profile/:id"
                element={<Profile isLoading={isLoading} setIsLoading={setIsLoading} />} />
              <Route path="/recipe/myRecipes"
                element={<MyRecipes isLoading={isLoading} setIsLoading={setIsLoading} />}
              />
              <Route path="/edit/:mealId"
                element={<EditRecipe isLoading={isLoading} setIsLoading={setIsLoading} />}
              />
              <Route path="/recipe/add"
                element={<AddRecipe isLoading={isLoading} setIsLoading={setIsLoading} />}
              />
            </Route>

            <Route path="/recipe/browse" element={
              <Browse isLoading={isLoading} setIsLoading={setIsLoading} />}
            />
            <Route path="/details/:mealId" element={
              <Details isLoading={isLoading} setIsLoading={setIsLoading} />}
            />
            <Route path="/recipe/macros" element={
              <Macronutrients isLoading={isLoading} setIsLoading={setIsLoading} />}
            />
            <Route path="*" element={< ErrorPage />} />

          </Routes>
        </div>

        {/* ---------------------------------------Footer------------------------------------------------------*/}
        <Footer setIsOpen={setIsOpen} />
        {/* ---------------------------------------About-------------------------------------------------------*/}
        {isOpen && isOpen.target === "about" && <About setIsOpen={setIsOpen} />}
        {/* ---------------------------------------Contacts----------------------------------------------------*/}
        {isOpen && isOpen.target === "contacts" && <Contacts setIsOpen={setIsOpen} />}
        {/* ---------------------------------------------------------------------------------------------------*/}
      </LoggedUserProvider>
    </ErrorContextProvider >
  );
};

export default App;
