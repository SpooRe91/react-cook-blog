import { useState } from "react";
import { Route, Routes } from "react-router-dom"

import * as components from "./allComponents";

import { LoggedUserProvider } from "./contexts/LoggedUserContext";
import { ErrorContextProvider } from "./contexts/ErrorMessageContext";


function App() {

  const [isOpen, setIsOpen] = useState({ state: false, target: null });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ErrorContextProvider>
      <LoggedUserProvider>
        <components.NavBar setIsOpen={setIsOpen} />
        <div className="App">

          {isOpen && isOpen.target === "logout" &&
            <components.Logout {...{ isLoading, setIsLoading, setIsOpen }} />}

          <Routes>
            <Route path="/" element={<components.Homepage />} />
            <Route element={<components.LoggedUserGuard />} >
              <Route path="/auth/login" element={<components.Login {...{ isLoading, setIsLoading }} />} />
              <Route path="/auth/Register" element={<components.Register {...{ isLoading, setIsLoading }} />} />
            </Route>

            <Route path="/404"
              element={<components.ErrorPage />}
            />
            <Route element={<components.NoUserGuard />} >
              <Route path="/auth/profile/:id"
                element={<components.Profile {...{ isLoading, setIsLoading }} />} />
              <Route path="/recipe/myRecipes"
                element={<components.MyRecipes {...{ isLoading, setIsLoading }} />}
              />
              <Route path="/edit/:mealId"
                element={<components.EditRecipe {...{ isLoading, setIsLoading }} />}
              />
              <Route path="/recipe/add"
                element={<components.AddRecipe {...{ isLoading, setIsLoading }} />}
              />
            </Route>

            <Route path="/recipe/browse" element={
              <components.Browse {...{ isLoading, setIsLoading }} />}
            />
            <Route path="/details/:mealId" element={
              <components.Details {...{ isLoading, setIsLoading }} />}
            />
            <Route path="/recipe/macros" element={
              <components.Macronutrients {...{ isLoading, setIsLoading }} />}
            />
            <Route path="*" element={<components.ErrorPage />} />

          </Routes>
        </div>

        {/* ---------------------------------------Footer------------------------------------------------------*/}
        <components.Footer setIsOpen={setIsOpen} />
        {/* ---------------------------------------About-------------------------------------------------------*/}
        {isOpen && isOpen.target === "about" && <components.About setIsOpen={setIsOpen} />}
        {/* ---------------------------------------Contacts----------------------------------------------------*/}
        {isOpen && isOpen.target === "contacts" && <components.Contacts setIsOpen={setIsOpen} />}
        {/* ---------------------------------------------------------------------------------------------------*/}
      </LoggedUserProvider>
    </ErrorContextProvider >
  );
};

export default App;
