import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Select, MenuItem, Grid, Card, CardContent, CardMedia, InputLabel, FormControl} from '@mui/material';
import { styled } from '@mui/system';
import { fetchAllTeams, fetchTeamDetails } from '../redux/actions';
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


const Details = () => {
  const dispatch = useDispatch();
  const allTeams = useSelector((state) => state.allTeams);
  const selectedTeamDetails = useSelector((state) => state.selectedTeamDetails);

  const [selectedTeamId, setSelectedTeamId] = useState('');

  useEffect(() => {
    dispatch(fetchAllTeams());
  }, [dispatch]);
  useEffect(() => {
    if (selectedTeamId) {
      dispatch(fetchTeamDetails(selectedTeamId));
    }
  }, [dispatch,selectedTeamId]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Team Details
      </Typography>

      <div style={{ marginBottom: '16px' }}>
          <FormControl fullWidth>

      <InputLabel id="demo-simple-select-label">Select a Team</InputLabel>

        <Select value={selectedTeamId} label="Select a Team" onChange={(e) => setSelectedTeamId(e.target.value)}>
          {allTeams.map((team) => (
            <MenuItem key={team._id} value={team._id}>
              {team.name}
            </MenuItem>
          ))}
        </Select>
          </FormControl>
      </div>

      {selectedTeamDetails && (
        <div>
          <Typography variant="subtitle1" gutterBottom>
            Team Members:
          </Typography>
          <Grid container spacing={3}>
        {selectedTeamDetails.members.map((user) => (
          <Grid item key={user.id} xs={12} sm={12} md={6}>
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
      )}
    </div>
  );
};

export default Details;
