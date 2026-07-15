import { signOut } from 'firebase/auth';
import { db, authService } from '../firebase';
import { Button, Typography, Divider, List } from '@mui/material';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy, onSnapshot } from 'firebase/firestore';
import Comment from '../components/Comment';

function Profile() {
  const auth = authService;
  const userId = auth.currentUser.uid;

  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

  const getConmments = async () => {
    const q = query(collection(db, 'comments'), where('uid', '==', userId), orderBy('date', 'desc'));

    onSnapshot(q, (querySnapshot) => {
      const commentsArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setComments(commentsArray);
    });
  };

  useEffect(() => {
    getConmments();
  }, []);

  const onLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        // An error happened.
      });
  };
  console.log(comments);
  return (
    <>
      <h1>Profile</h1>

      <Button sx={{ mt: 2 }} type='submit' variant='contained' onClick={onLogOut}>
        로그아웃
      </Button>
      <Divider sx={{ my: 3 }} />
      <List sx={{ width: '100%' }}>
        {comments.map((item) => (
          <Comment key={item.id} item={item} isShown={userId === item.uid} />
        ))}
      </List>
    </>
  );
}

export default Profile;
