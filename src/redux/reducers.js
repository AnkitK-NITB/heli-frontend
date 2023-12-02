const initialState = {
  users: [],
  searchQuery: '',
  selectedFilters: {
    domain: [],
    gender: [],
    availability: [],
  },
  selectedTeamMembers: [],
  allTeams: [],
  selectedTeamDetails: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS':
      return {
        ...state,
        users: action.payload,
      };

    case 'SEARCH_USERS':
      return {
        ...state,
        searchQuery: action.payload,
      };

    case 'UPDATE_FILTERS':
      return {
        ...state,
        selectedFilters: action.payload,
      };

    case 'UPDATE_SEARCH':
      return {
        ...state,
        searchQuery: action.payload,
      };

    case 'SELECT_USER':
      const user = action.payload;
      const userId = user.id;
      return {
        ...state,
        selectedTeamMembers: state.selectedTeamMembers.map(x=>x.id).includes(userId)
          ? state.selectedTeamMembers.filter((Ruser) => Ruser.id !== userId)
          : [...state.selectedTeamMembers, user],
      };

    case 'CREATE_TEAM':
      return {
        ...state,
        selectedTeamMembers: [],
        allTeams: [action.payload, ...state.allTeams]
      };

      case 'FETCH_ALL_TEAMS':
      return {
        ...state,
        allTeams: action.payload,
      };

    case 'FETCH_TEAM_DETAILS':
      return {
        ...state,
        selectedTeamDetails: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;