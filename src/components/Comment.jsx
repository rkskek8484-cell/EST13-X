import { Divider, ListItem, ListItemText, Button, Stack } from '@mui/material';

export default function Comment({ key, item }) {
  return (
    <ListItem key={item.id} alignItems='flex-center' divider>
      <ListItemText
        primary={item.comment}
        secondary={item.date?.toDate ? item.date.toDate().toLocaleString() : '작성시간 없음'}
      />
      <Stack direction='row' spacing={2}>
        <Button variant='outlined' size='small'>
          수정
        </Button>
        <Button variant='contained' color='error' size='small'>
          삭제
        </Button>
      </Stack>
    </ListItem>
  );
}
