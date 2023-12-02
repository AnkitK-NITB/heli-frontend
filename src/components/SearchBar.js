import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearch, fetchUsers } from '../redux/actions';
import { TextField } from '@mui/material';

const SearchBox = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.searchQuery);
  const selectedFilters = useSelector((state) => state.selectedFilters);

  const handleSearchChange = (event) => {
    dispatch(updateSearch(event.target.value));
    dispatch(fetchUsers({ ...selectedFilters, name: event.target.value }));
    console.log({ ...selectedFilters, name: event.target.value })
  };

  return (
    <TextField
      label="Search by Name"
      fullWidth
      value={searchQuery}
      onChange={handleSearchChange}
    />
  );
};

export default SearchBox;
