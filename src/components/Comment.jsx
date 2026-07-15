import { Box, TextField, Divider, ListItem, ListItemText, Button, Stack } from '@mui/material';
import { db, storageService } from '../firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { useState } from 'react';

export default function Comment({ item, isShown }) {
  const [edit, setEdit] = useState(false);
  const [comment, setComment] = useState(item.comment);

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제할까요?')) return;
    await deleteDoc(doc(db, 'comments', item.id));

    const storage = storageService; // storage 초기화
    const storageRef = ref(storage, item.image);
    deleteObject(storageRef);
  };

  const toggleEditMode = () => {
    setEdit((prev) => !prev);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const commentRef = doc(db, 'comments', item.id);

    await updateDoc(commentRef, {
      comment: comment,
    });
    setEdit(false);
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <ListItem key={item.id} alignItems='flex-center' divider>
      {edit ? (
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
          <Stack direction='row' spacing={1} sx={{ mt: 1 }}>
            <Button sx={{ mt: 2 }} type='submit' variant='contained' size='small'>
              글쓰기
            </Button>
            <Button variant='outlined' size='small' onClick={toggleEditMode}>
              취소
            </Button>
          </Stack>
        </Box>
      ) : (
        <>
          <ListItemText
            primary={item.comment}
            secondary={item.date?.toDate ? item.date.toDate().toLocaleString() : '작성시간 없음'}
          />
          {
            // 이미지가 있으면 이미지 출력
            item.image && (
              <Box sx={{ marginRight: '5px', mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  component='img'
                  src={item.image}
                  alt='미리보기'
                  sx={{
                    width: 50,
                    height: 50,
                    objectFit: 'cover',
                    border: 'ipx solid #ddd',
                    borderRadius: 3,
                  }}
                ></Box>
              </Box>
            )
          }
          {isShown && (
            <Stack direction='row' spacing={1}>
              <Button variant='outlined' size='small' onClick={toggleEditMode}>
                수정
              </Button>
              <Button variant='contained' color='error' size='small' onClick={handleDelete}>
                삭제
              </Button>
            </Stack>
          )}
        </>
      )}
    </ListItem>
  );
}
