import React, { useState } from 'react';
import {
  TextField,
  Box,
  IconButton,
  Divider,SvgIcon,
  Typography
} from '@mui/material';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import CheckIcon from '@heroicons/react/24/solid/CheckIcon';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import { Scrollbar } from 'src/components/scrollbar';


const DetailsTab = ({ study, onUpdate }) => {
    const [editingField, setEditingField] = useState(null);
  
    const [originalTitle, setOriginalTitle] = useState(study.title);
    const [originalDescription, setOriginalDescription] = useState(study.description);
  
    const [title, setTitle] = useState(originalTitle);
    const [description, setDescription] = useState(originalDescription);
  
    const handleEditClick = (field) => {
      setEditingField(field);
    };
  
    const handleCancelClick = () => {
      setTitle(originalTitle);
      setDescription(originalDescription);
      setEditingField(null);
    };
  
    const handleUpdateClick = (field) => {
      if (onUpdate && field) {
        let updatedData = {};
        switch (field) {
          case 'title':
            updatedData = { title };
            break;
          case 'description':
            updatedData = { description };
            break;
          default:
            break;
        }
        onUpdate(updatedData);
      }
      setEditingField(null);
      setOriginalTitle(title);
      setOriginalDescription(description);
    };
  return (
    <Box>
      <Box display="flex"  alignItems="center">
                {editingField === 'title' ? (
                    <TextField
                        fullWidth
                        variant="standard"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <><IconButton onClick={() => handleUpdateClick('title')}>
                                <SvgIcon><CheckIcon /></SvgIcon>
                            </IconButton>
                            <IconButton onClick={() => handleCancelClick()}>
                                <SvgIcon><XMarkIcon /></SvgIcon>
                            </IconButton></>
                                    
                            )
                        }}
                    />
                ) : (
                    <>
                        <Typography variant="h5">{title}</Typography>
                        <IconButton onClick={() => handleEditClick('title')}>
                            <SvgIcon ><PencilIcon /></SvgIcon>
                        </IconButton>
                    </>
                )}
            </Box>


            <Box display="flex"  alignItems="center">
   
</Box>


      <Divider sx={{ my: 2 }} />

      <Box display="flex" alignItems="start">
      <Scrollbar
                            sx={{
                                maxHeight: '240px', 
                                width: '100%', 
                                '& .simplebar-content': {
                                    height: '100%'
                                },
                                '& .simplebar-scrollbar:before': {
                                    background: 'neutral.400'
                                }
                            }}
                        >
                {editingField === 'description' ? (
                    <TextField
                        fullWidth
                        multiline
                        variant="standard"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <>
                                    <IconButton onClick={() => handleUpdateClick('description')}>
                                        <SvgIcon><CheckIcon /></SvgIcon>
                                    </IconButton>
                                    <IconButton onClick={() => handleCancelClick()}>
                                        <SvgIcon><XMarkIcon /></SvgIcon>
                                    </IconButton>
                                </>
                            )
                        }}
                    />
                ) : (
                    <>
                        <Typography color="textSecondary">{description}</Typography>
                        <IconButton onClick={() => handleEditClick('description')}>
                            <SvgIcon fill="#ccc"><PencilIcon /></SvgIcon>
                        </IconButton>
                    </>
                )}
                </Scrollbar>
            </Box>
            
    </Box>
  );
};

export default DetailsTab;
