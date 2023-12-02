import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../redux/actions';
import { Grid, Card, CardContent, Typography, CardMedia, Checkbox} from '@mui/material';
import { styled } from '@mui/system'; 

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

const UserList = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleUserSelect = (user) => {
    dispatch(selectUser(user));
  };

  return (
    <Grid my={4} container spacing={3}>
      {users.map((user) => (
        
        <Grid item key={user.id} xs={12} sm={12} md={6}>
          <StyledCard>
          <Checkbox onChange={() => handleUserSelect(user)} />
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
  );
};

export default UserList;
