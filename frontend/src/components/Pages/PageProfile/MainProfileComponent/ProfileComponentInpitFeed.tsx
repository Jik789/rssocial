import { TextField, Button, Typography, Box } from '@mui/material';
import React, { useState } from 'react';
import { partText } from '../../../../utils/utils';
import { CustomCreatePost } from '../../../Common/CustomStyleComponents';
import CloseIcon from '@mui/icons-material/Close';
import { useAddPostMutation } from '../../../../redux/features/service/postsService';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

function ProfileComponentInputFeed() {
  const [sendPost, { isLoading }] = useAddPostMutation();
  const [text, setText] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleImageAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      if (event.target.files[0].size < 5 * 1024 * 1024) setImage(event.target.files[0]);
      else enqueueSnackbar(t('snacks.largeFileSize'), { variant: 'warning' });
    }
    event.target.value = '';
  };

  const handleImageRemove = () => setImage(null);

  const handleTextAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    event.target.value = '';
  };

  const handleSubmith = () => {
    const formData = new FormData();
    formData.append('text', text);
    if (image) formData.append('image', image);
    sendPost(formData)
      .unwrap()
      .catch(() => enqueueSnackbar(t('snacks.addFailed'), { variant: 'error' }));

    handleImageRemove();
    setText('');
  };

  return (
    <CustomCreatePost sx={{ flexDirection: { xs: 'column' } }}>
      <TextField
        multiline
        rows={2}
        id="outlined-basic"
        label={t('profileLng.inputPostText')}
        variant="outlined"
        value={text}
        sx={{ flexGrow: '1', width: { xs: '240px', sm: '100%' } }}
        onChange={handleTextAdd}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Box>
          <input
            style={{ display: 'none', width: '80%' }}
            type="file"
            name="file"
            id="file"
            accept=".jpg, .jpeg, .png"
            onInput={handleImageAdd}
          />
          <Button sx={{ width: '100%', padding: 0 }}>
            <label style={{ cursor: 'pointer', width: '100%' }} htmlFor="file">
              {t('profileLng.btnAddPhoto')}
            </label>
          </Button>
          <Box sx={{ display: 'flex' }}>
            <Typography variant="subtitle2">{image?.name && partText(image?.name)}</Typography>
            {image?.name && (
              <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleImageRemove}></CloseIcon>
            )}
          </Box>
        </Box>
        <Button
          variant="outlined"
          onClick={handleSubmith}
          disabled={isLoading || (!text && !image)}
        >
          {t('profileLng.btnAddPost')}
        </Button>
      </Box>
    </CustomCreatePost>
  );
}

export default ProfileComponentInputFeed;
