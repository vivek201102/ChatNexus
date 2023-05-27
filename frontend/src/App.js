import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';



function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='signup' element={<Signup />} />
      </Routes>
      <Routes>
        <Route path='home' >
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;