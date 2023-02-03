import { ReactElement, useContext, useState } from 'react';
import { FormControl, Grid, IconButton, List, ListItem, ListItemText, TextField, Box, Typography, Dialog, DialogTitle, Button, DialogActions, DialogContent } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import Message from './Message';
import { DataMessage } from '../../../../utils/Type';

import { Context } from "../../../Context/context";


function ChatComponentDialogBox(): ReactElement {

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);




  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files![0]);
  };

  const handleUpload = () => {
    // Perform the image upload logic here
    console.log('File:', file);
    setOpen(false);
  };


  const dataMessage: DataMessage[] = [
    {
      currentUser: true,
      message: 'Это первое сообщение Евгения',
      imgSrc: 'https://avatars.githubusercontent.com/u/107023048?v=4',
      imgMassage: '',   
      timeOfCreateMassage: (new Date(2023, 1, 2, 21, 0, 0, 0)).getTime()
    },
    {
      currentUser: false,
      message: 'Это первый ответ Ильи',
      imgSrc: 'https://avatars.githubusercontent.com/u/38877564?v=4',
      imgMassage: '',
      timeOfCreateMassage: (new Date(2023, 1, 2, 21, 5, 0, 0)).getTime()
    },
    {
      currentUser: true,
      message: 'Давай работай, хватит сидеть чаты читать',
      imgSrc: 'https://avatars.githubusercontent.com/u/107023048?v=4',
      imgMassage: '',
      timeOfCreateMassage: (new Date(2023, 1, 2, 21, 8, 0, 0)).getTime()
    },
    {
      currentUser: false,
      message: 'Да я как папо Карло работаю',
      imgSrc: 'https://avatars.githubusercontent.com/u/38877564?v=4',
      imgMassage: '',
      timeOfCreateMassage: (new Date(2023, 1, 2, 21, 50, 0, 0)).getTime()
    },
    {
      currentUser: true,
      message: 'Ну тогда Ок. Значт больше отдыхай',
      imgSrc: 'https://avatars.githubusercontent.com/u/107023048?v=4',
      imgMassage: '',
      timeOfCreateMassage: (new Date(2023, 1, 2, 22, 8, 0, 0)).getTime()
    },
    {
      currentUser: false,
      message: 'Ага это правлиьно.',
      imgSrc: 'https://avatars.githubusercontent.com/u/38877564?v=4',
      imgMassage: '',
      timeOfCreateMassage: (new Date(2023, 1, 3, 10, 35, 0, 0)).getTime()
    },
    {
      currentUser: true,
      message: 'А как у тебя твоя девка. Ты её добавил?',
      imgSrc: 'https://avatars.githubusercontent.com/u/107023048?v=4',
      imgMassage: 'https://cdn.forbes.ru/forbes-static/750x422/new/2021/12/GettyImages-1204843675-61c4216fd8046.jpg',
      timeOfCreateMassage: (new Date(2023, 1, 2, 22, 18, 0, 0)).getTime()
    }
  ]

  // const messages = dataMessage.map((el) => {
  //   return <Message key={el.timeOfCreateMassage.toString()} dataMessage={el} />
  // })

  return (
    <Box sx={{ display: 'flex', flexDirection: "column", height: '60vh', width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: "column", flexGrow: 1, height: 300, overflow: "auto", width: '100%' }}>
        {dataMessage.map((el) => {
    return <Message key={el.timeOfCreateMassage.toString()} dataMessage={el} />
  })}
      </Box>
      <Grid container alignItems="center" sx={{ pl: 1 }}>
        <Grid sm={10} xs={8} item>
          <FormControl fullWidth>
            <TextField label="Ваш текст..." variant="outlined" />
          </FormControl>
        </Grid>
        <Grid sm={1} xs={2} item>


          {/* <TextField
            name="upload-photo"
            type="file"
          /> */}
          <IconButton aria-label="send" color="primary" onClick={handleClickOpen}>
            <InsertPhotoOutlinedIcon />
          </IconButton>

        </Grid>
        <Grid sm={1} xs={2} item>
          <IconButton aria-label="send" color="primary">
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} sx={{maxWidth: '90%', margin: '0 auto'}} >
        <DialogTitle>Загрузить изображение</DialogTitle>
        <DialogContent>
          {file && (
            <img src={URL.createObjectURL(file)} alt="Preview" style={{ maxWidth: '100%' }} />
          )}
          <TextField
            type="file"
            onChange={handleFileChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleUpload}>Загрузить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ChatComponentDialogBox;
