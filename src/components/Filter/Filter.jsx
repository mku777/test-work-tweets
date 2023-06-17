import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/Users/usersSlice";

import { selectFilter } from "../../redux/Users/selectors";

import { Select, MenuItem } from "@mui/material";


export const Filter = ({ options, onSelect }) => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleSelect = (e) => {
    dispatch(setFilter(e.target.value));
    onSelect();
  };

  return (
    <Select
      value={filter}
      onChange={handleSelect}
      variant="outlined"
      sx={{ width: 120, backgroundColor: "white", borderRadius: '15px' }}>
      {options.map((o) => (
        <MenuItem key={o} value={o}>
          {o.toUpperCase()}
        </MenuItem>
      ))}
    </Select>
  );
};

Filter.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired),
  onSelect: PropTypes.func,
};
