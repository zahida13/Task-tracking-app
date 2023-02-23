import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import UserTasks from './components/UserTasks';
import AddNewUser from './components/AddNewUser';
import AllUsers from './components/AllUsers';
import { useSelector } from 'react-redux';
import AllTasks from './components/AllTasks'

import {  
  BrowserRouter as Router,  
  Routes,  
  Route,  
  Link  
}   
from 'react-router-dom';  
function App() {
  // const { user } = useSelector(state => state.auth)
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    
        <Router>
    <div className="App">
        {!user ? <Login /> :
          user?.isAdmin  == false ? <>
          <Routes>
              <Route path='/' element={<UserTasks />}/>
        </Routes>
        </> :
          <>
      <Navbar />
        <Routes>
          <Route path="/" element={<AllTasks />} /> 
          <Route path='/add' element={<AddNewUser />} />
          <Route path='/users' element={<AllUsers />} />

</Routes>
       
          </>
           }
        
        
    </div>
    </Router>
  );
}

export default App;
