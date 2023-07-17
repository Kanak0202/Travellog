import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeadSection from './components/HeadSection';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import AddDestination from './components/AddDestination';
import ViewDEstination from './components/ViewDestination';
import LocationVisited from './components/LocationVisited';
import Profile from './components/Profile';
import PrivateComponent from './components/PrivateComponent';
import MyUploads from './components/MyUploads';
import UpdateLocationUpload from './components/UpdateLocationUpload';
import ReadReview from './components/ReadReview';


function App() {
  return (
    <div>
      <BrowserRouter>
    <Nav />
      <div id="mainBody">
      <Routes>
        <Route path="/" element={<HeadSection />} />
        <Route path="/view" element={<ViewDEstination />} />
        <Route path="/blog" element={<h1>Become a creator</h1>} />
        <Route element={<PrivateComponent />}>
        <Route path="/add" element={<AddDestination />} />
        <Route path="/update" element={<h1>Update destinations</h1>} />
        <Route path="/logout" element={<h1>Logout</h1>} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/my-uploads" element={<MyUploads />} />
        <Route path="/get-upload/:id" element={<UpdateLocationUpload />} />
        <Route path="/read-review/:id" element={<ReadReview />} />
      </Route>
      <Route path="/location/:name" element={<LocationVisited />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </div>
    </BrowserRouter>
    <Footer />
    
    </div>
  );
}

export default App;
