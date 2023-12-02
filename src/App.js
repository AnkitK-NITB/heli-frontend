// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import UserList from './components/UserList';
import SearchBar from './components/SearchBar';
import FilterOptions from './components/FilterOptions';
import TeamCreation from './components/TeamCreation';
import TeamDetails from './components/TeamDetails';
import { Grid } from '@mui/material';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
};

const HomePage = () => {
  return (
    <div>
      <Grid columnSpacing={4} container>
        <Grid item xs={12} sm={6} md={6}>
          <SearchBar />
          <FilterOptions />
          <UserList />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TeamCreation />
          <TeamDetails />
        </Grid>
      </Grid>
    </div>
  );
};

export default connect()(App);
