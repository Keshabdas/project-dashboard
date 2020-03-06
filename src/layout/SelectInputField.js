import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { InputLabel } from '@material-ui/core';



const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    // width: 200,
  },
//   menu: {
//     width: 200,
//   },
}));

export default function MultilineTextFields({status, onChangeHandle,formattedTime, options, inputLabel}) {
  const classes = useStyles();
  const [option, setOption] = React.useState(status);

  const handleChange = event => {
    setOption(event.target.value);
    let newValue = event.target.value;
    // let CurrentTime = formattedTime();
    onChangeHandle(newValue);
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <div>
        <InputLabel>{inputLabel}</InputLabel>
        <TextField
          id="standard-select"
          select
          className={classes.textField}
          value={option}
          onChange={handleChange}
        //   SelectProps={{
        //     MenuProps: {
        //       className: classes.menu,
        //     },
        //   }}
          margin='dense'
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        
      </div>
    </form>
  );
}
