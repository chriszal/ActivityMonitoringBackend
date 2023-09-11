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

const DetailsTab = ({ study, onUpdate }) => {
    const [editingField, setEditingField] = useState(null);
  
    const [originalTitle, setOriginalTitle] = useState(study.title);
    const [originalDescription, setOriginalDescription] = useState(study.description);
    const [originalAuthors, setOriginalAuthors] = useState(study.authors.join(', '));
  
    const [title, setTitle] = useState(originalTitle);
    const [description, setDescription] = useState(originalDescription);
    const [authors, setAuthors] = useState(originalAuthors);
  
    const handleEditClick = (field) => {
      setEditingField(field);
    };
  
    const handleCancelClick = () => {
      setTitle(originalTitle);
      setDescription(originalDescription);
      setAuthors(originalAuthors);
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
          case 'authors':
            updatedData = { authors: authors.split(',').map(author => author.trim()) };
            break;
          default:
            break;
        }
        onUpdate(updatedData);
      }
      setEditingField(null);
      setOriginalTitle(title);
      setOriginalDescription(description);
      setOriginalAuthors(authors);
    };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
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


            <Box display="flex" justifyContent="space-between" alignItems="center">
    {editingField === 'authors' ? (
        <TextField
            fullWidth
            variant="standard"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            InputProps={{
                endAdornment: (
                    <>
                        <IconButton onClick={() => handleUpdateClick('authors')}>
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
            <Typography variant="caption">{authors}</Typography>
            <IconButton onClick={() => handleEditClick('authors')}>
                <SvgIcon fill="#ccc"><PencilIcon /></SvgIcon>
            </IconButton>
        </>
    )}
</Box>


      <Divider sx={{ my: 2 }} />

      <Box display="flex" justifyContent="space-between" alignItems="start">
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
            </Box>
    </Box>
  );
};

export default DetailsTab;
