import './App.css'
import Home from './components/Home/Home';
import Navbar from "./components/Navbar";
import CircleForm from "./components/CircleForm";
import CircleList from "./components/CircleList";
import FriendsList from "./components/FriendsList";
function App() {
  return( <>
    <Home/>
    <Navbar/>
    <CircleList/>
    <FriendsList/>
    <CircleForm/>
    </>
  );
}

export default App
