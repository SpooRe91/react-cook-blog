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

function App() {

  return (
    <div className="App">
      <NavBar />
      <Login />
      <Register />
      <About />
      <Contacts />
      <ErrorPage />
      <AddRecipe />
      <Browse />
      <Details/>
      <MyRecipes />
    </div>
  );
}

export default App;
