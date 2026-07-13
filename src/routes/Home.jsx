import { Box, Typography, TextField, Button, Divider, List, ListItem, ListItemText } from '@mui/material';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import Comment from '../components/Comment';

function Home({ userId }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  /*
  useEffect로 데이터 조회 결과를 변수명 comments에 할당
  */
  const getConmments = async () => {
    const q = query(collection(db, 'comments'), orderBy('date', 'desc'), limit(5));

    onSnapshot(q, (querySnapshot) => {
      const commentsArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setComments(commentsArray);
    });
  };

  useEffect(() => {
    getConmments();
  }, []);

  console.log(comments);

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'comments'), {
        // comment: comment,
        comment,
        date: serverTimestamp(),
        uid: userId,
      });
      setComment('');
      // getConmments();
    } catch (e) {
      console.error('글 등록 시 에러가 발생했습니다', e);
    }
  };

  return (
    <>
      <Typography variant='h2' component='h2'>
        Home{''}
      </Typography>

      <Box component='form' sx={{ mt: 2 }} onSubmit={onSubmit}>
        <TextField
          fullWidth
          label='Comment'
          placeholder='글을 입력해주세요.'
          type='text'
          name='Comment'
          variant='outlined'
          multiline
          rows={5}
          value={comment}
          onChange={handleChange}
        />
        <Button sx={{ mt: 2 }} type='submit' variant='contained'>
          글쓰기
        </Button>
      </Box>
      <Divider sx={{ my: 3 }} />
      <List sx={{ width: '100%' }}>
        {comments.map((item) => (
          <Comment key={item.id} item={item} isShown={userId === item.uid} />
        ))}
      </List>
    </>
  );
}

export default Home;
