import { Login } from "./Components/Login/Login"
import { NavBar } from "./Components/NavBars/Navbar"
import { Register } from "./Components/Register/Register";
import { About } from "./Components/About/About";
import { Contacts } from "./Components/Contacts/Contacts";
import { ErrorPage } from "./Components/ErrorPage/ErrorPage";
import { AddRecipe } from "./Components/AddRecipe/AddRecipe";
import { Browse } from "./Components/Browse/Browse";
import { Details } from "./Components/Details/Details";
import { MyRecipes } from "./Components/MyRecipes/MyRecipes";

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
