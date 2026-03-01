import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import DashBoard from './pages/DashBoard';
import NavBar from './components/NavBar';
import JobDetail from './pages/JobDetail';
import AddJob from './pages/AddJob'


function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
        <Route path='/jobdetail/:id' element={<JobDetail/>}/>
        <Route path='/addjob' element={<AddJob/>}/>
      </Routes>
    </>
  );
}

export default App;
