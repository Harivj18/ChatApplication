import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import SocketConnection from './Components/socket';
import ChatApp from './Components/chatApp';
import Login from './pages/login'
import SignUp from './pages/signUp';
import ForgotPassword from './Components/forgot_password';
import ResetPassword from './Components/reset_password';
import Home from './pages/home';
import ProtectedRoutes from './Components/protectedRoutes';
import { AuthContext } from './Components/AuthContext';


function App() {
  return (
    <div className="App">
      {/* <AuthContext> */}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login></Login>}></Route>
            <Route path='/login' element = {<Login></Login>}></Route>
            <Route path='/signup' element = {<SignUp></SignUp>}></Route>
            <Route path='/forgot-password' element = {<ForgotPassword></ForgotPassword>}></Route>
            <Route path='/reset-password' element = {<ResetPassword></ResetPassword>}></Route>
            {/* <Route element={<ProtectedRoutes></ProtectedRoutes>}> */}
              <Route path='/home' element={<Home></Home>}></Route>
              <Route path='/chatApp' element={<ChatApp></ChatApp>} exact></Route>
              <Route path='/createJoinRoom' element={<SocketConnection></SocketConnection>} exact></Route>
            {/* </Route> */}
          </Routes>
        </BrowserRouter>
      {/* </AuthContext> */}

    </div>
  );
}

export default App;
