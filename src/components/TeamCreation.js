import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, CardContent, Typography, CardMedia, Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { createTeam } from '../redux/actions';

const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  alignItems: 'center',
  padding: '8px',
});

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  paddingLeft: '8px',
});

const StyledCardMedia = styled(CardMedia)({
  width: '50px',
  height: '50px',
});

const TeamCreation = () => {
  const dispatch = useDispatch();
  const selectedTeamMembers = useSelector((state) => state.selectedTeamMembers);

  const [teamName, setTeamName] = useState('');

  const handleCreateTeam = () => {
    if (teamName.trim() && selectedTeamMembers.length > 0) {
      dispatch(createTeam(teamName, selectedTeamMembers));
      // todo additional logic here, e.g., clear form fields, show a success message, etc.
    } else {
      // todo Handle errors or inform the user
    }
  };


  return (
    <div>
       <TextField
        label="Name your Team"
        fullWidth
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        InputProps={{endAdornment: <Button variant="outline" size='large' color="primary" onClick={handleCreateTeam}>
        Create
      </Button>}}
      />

      {(selectedTeamMembers.size > 0) && <Typography variant="h6" gutterBottom>
        Selected Team Members
      </Typography>}

      <Grid mb={6} container spacing={3}>
        {selectedTeamMembers.map((user) => (
          <Grid item key={user.id} xs={12} sm={6} md={6}>
            <StyledCard>
              <StyledCardMedia
                image={user.avatar}
                title={`${user.first_name} ${user.last_name}`}
              />
              <StyledCardContent>
                <Typography variant="h6" gutterBottom>
                  {`${user.first_name} ${user.last_name}`}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {user.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Gender: {user.gender}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Domain: {user.domain}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Availability: {user.available ? 'Available' : 'Not Available'}
                </Typography>
              </StyledCardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TeamCreation;
