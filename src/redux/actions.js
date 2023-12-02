import axios from 'axios';

// Action types
export const FETCH_USERS = 'FETCH_USERS';
export const SEARCH_USERS = 'SEARCH_USERS';
export const UPDATE_FILTERS = 'UPDATE_FILTERS';
export const UPDATE_SEARCH = 'UPDATE_SEARCH';

export const SELECT_USER = 'SELECT_USER';
export const CREATE_TEAM = 'CREATE_TEAM';

export const FETCH_ALL_TEAMS = 'FETCH_ALL_TEAMS';
export const FETCH_TEAM_DETAILS = 'FETCH_TEAM_DETAILS';


// Action creators
export const fetchUsers = (filters) => async (dispatch) => {
  try {
    const response = await axios.get('api/users', {
      params: filters,
    });

    dispatch({
      type: FETCH_USERS,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    // todo: handling errors
  }
};

export const searchUsers = (query) => ({
  type: SEARCH_USERS,
  payload: query,
});

export const updateFilters = (filters) => ({
  type: UPDATE_FILTERS,
  payload: filters,
});

export const updateSearch = (searchQuery) => ({
  type: UPDATE_SEARCH,
  payload: searchQuery,
});

export const selectUser = (userId) => ({
  type: SELECT_USER,
  payload: userId,
});

export const createTeam = (teamName, selectedUser) => async (dispatch) => {
  try {
    const response = await axios.post('api/teams', { name: teamName, members: selectedUser});
    dispatch({
      type: CREATE_TEAM,
      payload: response.data,
    })
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};


export const fetchAllTeams = () => async (dispatch) => {
  try {
    const response = await axios.get('api/teams');
    dispatch({
      type: FETCH_ALL_TEAMS,
      payload: response.data,
    })
  } catch (error) {
    console.error('Error fetching Teams:', error);
  }
};

export const fetchTeamDetails = (teamId) => async (dispatch) => {
  try {
    const response = await axios.get('api/teams/'+teamId);
    
    dispatch({
      type: FETCH_TEAM_DETAILS,
      payload: response.data,
    })
  } catch (error) {
    console.error('Error fetching Teams:', error);
  }
};


