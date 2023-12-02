import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilters, fetchUsers } from '../redux/actions';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText} from '@mui/material';
import { styled } from '@mui/system';

const StyledFormControl = styled(FormControl)({
  marginTop: '8px',
  minWidth: '120px',
});

const domainsOptions = ['Sales', 'Finance', 'Marketing', 'IT', 'Management', 'UI Designing', 'Business Development'];
const gendersOptions = ['Female', 'Male', 'Agender', 'Bigender', 'Polygender', 'Non-binary', 'Genderfluid', 'Genderqueer'];
const availabilityOptions = [true, false];

const FilterOptions = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.searchQuery);

  const [filters, setFilters] = useState({
    domain: [],
    gender: [],
    availability: [],
  });

  useEffect(() => {
    dispatch(updateFilters(filters))
    dispatch(fetchUsers({...filters, name:searchQuery}));

  }, [dispatch, filters, searchQuery]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div>
      <StyledFormControl fullWidth>
        <InputLabel id="domain-label">Domain</InputLabel>
        <Select
          labelId="domain-label"
          id="domain"
          name="domain"
          multiple
          value={filters.domain}
          onChange={handleChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {domainsOptions.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={filters.domain.indexOf(option) > -1} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>

      <StyledFormControl fullWidth>
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          id="gender"
          name="gender"
          multiple
          value={filters.gender}
          onChange={handleChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {gendersOptions.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={filters.gender.indexOf(option) > -1} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>

      <StyledFormControl fullWidth>
        <InputLabel id="availability-label">Availability</InputLabel>
        <Select
          labelId="availability-label"
          id="availability"
          name="availability"
          multiple
          value={filters.availability}
          onChange={handleChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {availabilityOptions.map((option) => (
            <MenuItem key={String(option)} value={option}>
              <Checkbox checked={filters.availability.indexOf(option) > -1} />
              <ListItemText primary={option ? 'Available' : 'Not Available'} />
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </div>
  );
};

export default FilterOptions;
