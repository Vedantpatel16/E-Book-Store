import logo from './logo.svg';
import './App.css';
import { Routes,Route,Link, BrowserRouter } from 'react-router-dom';
import {HomePage} from './Components/HomePage';
import {Apple} from './Components/Apple';
import {NotFound} from './Components/NotFound';
const App=() => {
  return(
    <BrowserRouter>
    <div>
      <Link to='/'
      style={{
        marginLeft: 5,
      }}>
        Home</Link>
      <Link to='/apple'
      style={{
        marginLeft: 10,
      }}>
        Apple</Link>
        <Link to='/applet'
      style={{
        marginLeft: 15,
      }}>
        Applet</Link>
    </div>
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/apple' element={<Apple/>}></Route>
      <Route path='*' element={<NotFound/>}></Route>
    </Routes>
  </BrowserRouter>
  );
};

export default App;
