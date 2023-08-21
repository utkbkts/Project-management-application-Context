import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Project from "./pages/project/Project";
import Create from "./pages/create/Create";
import Notfound from "./pages/notfound/Notfound";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import {useAuthContext} from "./hooks/useAuthContext"
import Onlineuser from "./components/Onlineuser";
function App() {
  const {user,authIsready}=useAuthContext()
  return (
    <div className="App">
     {authIsready && (
       <BrowserRouter>
      {user&&<Sidebar />}
       <div className="container">
         <Navbar />
         <Routes>
           <Route path="/" element={user?<Dashboard />:
           <Navigate to="/login"/>}/>
           <Route path="/create" element={user ? <Create />:<Navigate to="/login"/>} />
           <Route path="/login" element={!user?<Login />:<Navigate to="/"/>} />
           <Route path="/register" element={!user?<Signup />:<Navigate to="/"/>} />
           <Route path="/project/:id" element={user?<Project />:<Navigate to="/login"/>} />
           <Route path="*" element={<Notfound />} />
         </Routes>
       </div>
      {user && <Onlineuser/>}
     </BrowserRouter>
     )}
    </div>
  );
}

export default App;
