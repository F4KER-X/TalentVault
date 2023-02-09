
//this is for the routing, aka connecting pages together
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//importing the components
import Header from './components/Header'

//importing the pages
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";


//here i am setting up the routes, connecting the pages together
function App() {

  return (
    <>
    <div className="App">
      my app
    </div>
    </>
  );
  
}

export default App;
