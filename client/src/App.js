import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Transfer from './components/Transfer';
import NotFound from './components/NotFound';
import Users from './components/Users';
import User from './components/User';
import Update from './components/Update';
import CreateUser from './components/CreateUser';
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/user/:id" element={<User />} />
                <Route path="/users/transfer" element={<Transfer />} />
                <Route path="/users/update/:id" element={<Update />} />
                <Route path="/users/create" element={<CreateUser />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
