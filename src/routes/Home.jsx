import { Box, Typography, TextField, Button, Divider } from '@mui/material';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useState } from 'react';

function Home() {
  const [comment, setComment] = useState('');

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
      });
      console.log('다음글이 추가되었습니다.: ', docRef.id);
    } catch (e) {
      console.error('글 등록시 에러가 발생했습니다', e);
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
          onChange={handleChange}
        />
        <Button sx={{ mt: 2 }} type='submit' variant='contained'>
          글쓰기
        </Button>
      </Box>
      <Divider sx={{ my: 3 }} />
    </>
  );
}

export default Home;
