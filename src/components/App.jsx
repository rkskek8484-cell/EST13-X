import './App.css';
import Button from '@mui/material/Button';
import Router from './Router';
import { useState } from 'react';
import { authService } from '../firebase';
import { Container } from '@mui/material';

function App() {
  console.log(authService.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Container>
        <h1>ESTFE-X</h1>
        <Router isLoggedIn={isLoggedIn} />
      </Container>
    </>
  );
}

export default App;
