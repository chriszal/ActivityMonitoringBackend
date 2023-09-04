import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField
} from '@mui/material';
import React, { useState } from 'react';

import PencilIcon from '@heroicons/react/24/solid/PencilIcon';

export const StudyDetails = (props) => {
  const { study, sx } = props;
  const [editingField, setEditingField] = useState(null);

  const handleEditClick = (field) => {
    setEditingField(field);
  };

  const handleUpdateClick = () => {
    // Add API call or state update here
    setEditingField(null);
  };

  return (
    <Card sx={sx}>
      <CardHeader title={study.id} />
      <List>
        <ListItem>
          <IconButton edge="start" onClick={() => handleEditClick('description')}>
            <PencilIcon />
          </IconButton>
          {editingField === 'description'
            ? <TextField fullWidth multiline defaultValue={study.description} />
            : <ListItemText primary="Description" secondary={study.description} />
          }
        </ListItem>

        <ListItem>
          <IconButton edge="start" onClick={() => handleEditClick('authors')}>
            <PencilIcon />
          </IconButton>
          {editingField === 'authors'
            ? <TextField fullWidth defaultValue={study.authors.join(', ')} />
            : <ListItemText primary="Authors" secondary={study.authors.join(', ')} />
          }
        </ListItem>

        <ListItem>
          <IconButton edge="start" onClick={() => handleEditClick('ownerEmail')}>
            <PencilIcon />
          </IconButton>
          <ListItemText primary="Owner Email" secondary={study.ownerEmail} />
        </ListItem>

        <ListItem>
          <IconButton edge="start" onClick={() => handleEditClick('coordinators')}>
            <PencilIcon />
          </IconButton>
          {editingField === 'coordinators'
            ? <TextField fullWidth defaultValue={study.coordinators.join(', ')} />
            : <ListItemText primary="Coordinators" secondary={study.coordinators.join(', ')} />
          }
        </ListItem>

        <ListItem>
          <IconButton edge="start" onClick={() => handleEditClick('assistants')}>
            <PencilIcon />
          </IconButton>
          {editingField === 'assistants'
            ? <TextField fullWidth defaultValue={study.assistants.join(', ')} />
            : <ListItemText primary="Assistants" secondary={study.assistants.join(', ')} />
          }
        </ListItem>

        {editingField && (
          <>
            <Divider />
            <CardActions>
              <Button color="primary" variant="contained" onClick={handleUpdateClick}>
                Update
              </Button>
            </CardActions>
          </>
        )}
      </List>
    </Card>
  );
};

StudyDetails.propTypes = {
  study: PropTypes.object.isRequired,
  sx: PropTypes.object
};