import { signOut } from 'firebase/auth';
import { authService } from '../firebase';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

function Profile() {
  const auth = authService;
  const navigate = useNavigate();

  const onLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <h1>Profile</h1>

      <Button sx={{ mt: 2 }} type='submit' variant='contained' onClick={onLogOut}>
        로그아웃
      </Button>
    </>
  );
}

export default Profile;
