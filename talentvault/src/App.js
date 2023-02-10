
//this is for the routing, aka connecting pages together
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//importing the components
import Header from './components/Header'

//importing the pages
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from './pages/Profile';

//here i am setting up the routes, connecting the pages together


// localhost will open up the about page, all you will see is the header (no css yet)
//localhost:3000/login will open login page
//localhost:3000/register will open register page
//localhost:3000/dashboard will open dashboard page
function App() {

  return (
    <>
    <Router>
      <div className='container'>

        {/*  this header tag is how you import and use your component!!
        basically, you just made your own html tag! and you can call it like this.
        mind blown, right ?*/}
        <Header />
        
        {/* here are the routes */}
        <Routes>
          <Route path='/' element={<About />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Register/>} />
        </Routes>
      </div>
    </Router>
  </>

  )
  
}

export default App;
