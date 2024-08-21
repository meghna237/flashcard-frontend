import React from 'react';
import { BrowserRouter as Route, Routes, HashRouter } from 'react-router-dom';
import Flashcard from './components/Flashcard';
import Subjects from './components/Subject';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { UserProvider } from './context/UserContext'; // Import UserProvider

function App() {
  return (
    <UserProvider>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/questions" element={<Flashcard />} />
        </Routes>
      </HashRouter>
    </UserProvider>
  );
}

export default App;
