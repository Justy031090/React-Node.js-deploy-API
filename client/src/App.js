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
                <Route path="/api/users" element={<Users />} />
                <Route path="/api/user/:id" element={<User />} />
                <Route path="/api/users/transfer" element={<Transfer />} />
                <Route path="/api/users/update/:id" element={<Update />} />
                <Route path="/api/users/create" element={<CreateUser />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
