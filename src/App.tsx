import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/LoginPage/Login';
import { ItemProvider } from './Context/ItemContext';
import PrivateRoute from './Components/PrivateRoute';
import Admin from './Pages/Admin/Admin';


function App() {
  return (
      <Router>
        <ItemProvider>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route
                  path="/admin"
                  element={
                      <PrivateRoute>
                          <Admin />
                      </PrivateRoute>
                  }
              />
          </Routes>
        </ItemProvider>
      </Router>
  );
}

export default App;
