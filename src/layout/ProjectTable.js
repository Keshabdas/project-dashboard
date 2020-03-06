import React, {useState, useEffect} from 'react'
import { Paper,Table, TableHead, TableBody,TableRow, TableCell, Checkbox,  Fab, TextField, Typography } from '@material-ui/core'
import CustomToolbar from './CustomToolbar';
import CustomTableHead from './CustomTableHead';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles'
import CustomizedDialogs from '../layout/CustomModal'
import MultilineTextFields from './SelectInputField';
import * as Constants from "./constants"


function createData(id, project, client, contact,category,priority, status, addedOn, time, remarks, isEdit){
    return {id, project, client, contact,category, priority, status,  addedOn, time, remarks, isEdit};
}

const useStyles = makeStyles( theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },
    redColor: {
        color: '#d50000'
    },
    greenColor: {
        color: 'green'
    },
    orangeColor: {
        color: '#ef6c00'
    },
    blueColor: {
        color: '#03a9f4'
    },
    info: {
        padding: theme.spacing(4),
    },
    bgColor: {
        backgroundColor: 'rgba(0, 0, 0, 0.07)',
    }
    
}));

const formattedTime = () => {
    let current_datetime = new Date();
    const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    function appendLeadingZeroes(n){
        if(n <= 9){
            return "0" + n;
        }
        return n
    }
    let formatted_Date_Time = 
    appendLeadingZeroes(current_datetime.getHours()) + ":" + appendLeadingZeroes(current_datetime.getMinutes()) + ", " +
    appendLeadingZeroes(current_datetime.getDate()) + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear()  ;
    return formatted_Date_Time;
}


//  Main Component 
function ProjectTable() {
    const classes =  useStyles();
    
    const [selected, setSelected] = React.useState([]);

    const [data, setData] = React.useState({
        rows : []
    });

    const AddRow = (RowData) => {
        let name = RowData;
        let id = data.rows.length;
        let project = name.ProjectName;
        let contact = name.ContactPerson;
        let client= name.ClientName;
        let category = name.category;
        let Priority = name.Priority;
        let addedOn = formattedTime();
        let time = formattedTime();
        let remarks = name.remarks;
        let newData = createData( id, project, client, contact,category, Priority, 'Work in Progress', addedOn, time,  remarks , false)
        let newRows = data.rows.slice();
        newRows.push(newData)
        setData({rows: newRows})
        let Data = JSON.parse(localStorage.getItem('Data'));
        // Add bookmark to array
        Data.push(newData);
        // Re-set back to localStorage
        localStorage.setItem('Data', JSON.stringify(Data));
        setOpen(false);
        // console.log(newRows);
    }


    const remove = () => {
        var Data = [...data.rows];
     
        // approach 1   
        // for(let i = selected.length-1; i>=0; i--){
        //     newData.splice(selected[i],1);
        // }

        // approach 2
        // newData = newData.filter(function(value, index){
        //     return selected.indexOf(index) == -1;
        // });

        let newData = Data.filter(item => item.id !== selected[0]);

        setData({rows: newData});
        UpdateLS(newData);
        setSelected([]);
    }

    // Edit Functionalities 
    const [ ToolbarEdit, setToolbarEdit] = useState(false);
    const [changeValue, setChangeValue] = useState({
        priority: '',
        status: '',
    });
    const [NewTime, setNewTime] = useState('');

    const Edit = () => {
        setToolbarEdit(true)
        let newData = [...data.rows];
        let currentIndex = newData.findIndex(el => el.id == selected[0])
        newData[currentIndex].isEdit = true;
        setData({rows: newData});
    }

    const Done = () => {
        setToolbarEdit(false)
        let newData = [...data.rows];
        let currentIndex = newData.findIndex(el => el.id == selected[0]);
        newData[currentIndex].isEdit = false;
        newData[currentIndex].priority = changeValue.priority || newData[currentIndex].priority;
        newData[currentIndex].status = changeValue.status ||  newData[currentIndex].status;
        newData[currentIndex].time = NewTime || newData[currentIndex].time;
        newData[currentIndex].remarks = document.getElementById('remarks').value || newData[currentIndex].remarks;
        setData({rows: newData})
        UpdateLS(newData);
    }
    
    const Cancel = () => {
        setToolbarEdit(false)
        let newData = [...data.rows];
        let currentIndex = newData.findIndex(el => el.id == selected[0]);
        newData[currentIndex].isEdit = false;
        setData({rows: newData})
    }


    const onChangeHandle = (Value) => {
        if(Value === Constants.PriorityValues[0].value || Value === Constants.PriorityValues[1].value || Value === Constants.PriorityValues[2].value){
            setChangeValue({
                priority: Value
            })
        }
        if(Value === Constants.StatusValues[0].value || Value === Constants.StatusValues[1].value || Value === Constants.StatusValues[2].value){
            setChangeValue({
                status: Value
            })
        }
        setNewTime(formattedTime());
    };
    


    const onCheckHandle = (name) => {
        let newSelected = [...selected];
        if(newSelected.length == 0){
            newSelected.push(name);
            setSelected(newSelected);
        } else {
            setSelected([]);
        }
    }

    const isSelected = value => selected.indexOf(value) !== -1;


    

    // Modal Functionality
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const fetchData =() => {
        if(localStorage.getItem('Data') === null){
            // Init array
            let Data = [];
            // Add to array
            Data.push(data.rows);
            // Set to localStorage
            localStorage.setItem('Data', JSON.stringify(data.rows));
        } 
        else {
            // Get data from localStorage
            let Data = JSON.parse(localStorage.getItem('Data'));
            // Add data to state
            setData({rows: Data})
        }
    }

    const UpdateLS = (updatedData) => {
        let Data = JSON.parse(localStorage.getItem('Data'));
        // Add bookmark to array
        Data = updatedData;
        // Re-set back to localStorage
        localStorage.setItem('Data', JSON.stringify(Data));
    }


    useEffect(() => {
        fetchData();
    }, [])
    


    return (
        <div>
           <Paper>
                <CustomToolbar numSelected={selected.length} remove={remove} edit={Edit} ToolbarEdit={ToolbarEdit} done={Done}  cancel={Cancel} totalProjects={data.rows.length}/>
                {data.rows.length == 0 ? 
                    <Typography variant='h5' component='h5' align='center' color='primary' className={classes.info}>
                        No Data Found. 
                        <br/>
                        <br/>
                        Click on the Add Icon to Add Project.
                    </Typography>
                    :
                    <Table >
                        <CustomTableHead 
                            headcells={Constants.headcells}
                            numSelected={selected.length}
                            // onSelectAllClick={handleSelectAllClick}
                            rowCount={data.rows.length}
                        />
                        <TableBody>
                            {data.rows.map((data,index) => {
                                const isItemSelected = isSelected(data.id);
                                return(
                                    <TableRow hover key={index} className={isItemSelected ? classes.bgColor : null}>
                                        <TableCell padding="checkbox">
                                            <Checkbox 
                                                checked={isItemSelected}
                                                onChange={event => onCheckHandle(data.id)}
                                            />
                                        </TableCell>
                                        <TableCell>{data.project}</TableCell>
                                        <TableCell >{data.client}</TableCell>
                                        <TableCell >{data.contact}</TableCell>
                                        <TableCell >{data.category}</TableCell>
                                        <TableCell className={data.priority === 'High' ? classes.redColor : data.priority === 'Medium' ? classes.greenColor : classes.orangeColor}>
                                            {data.isEdit ? <MultilineTextFields status={data.priority} onChangeHandle={onChangeHandle} formattedTime={formattedTime} options={Constants.PriorityValues} /> : <b>{data.priority}</b> }
                                        </TableCell>
                                        <TableCell className={data.status === 'Work in Progress' ? classes.blueColor : data.status === 'On Hold' ? classes.redColor : classes.greenColor }>
                                            {data.isEdit ? <MultilineTextFields status={data.status} onChangeHandle={onChangeHandle} formattedTime={formattedTime} options={Constants.StatusValues} /> : <b>{data.status}</b> }
                                        </TableCell>
                                        <TableCell >{data.addedOn}</TableCell>
                                        <TableCell >{data.time}</TableCell>
                                        <TableCell >
                                            {data.isEdit ? <TextField
                                                id="remarks"
                                                
                                                multiline
                                                rows="2"
                                                defaultValue={data.remarks}
                                                margin="normal"
                                            /> :
                                                <>{data.remarks}</>
                                            }
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                }
                
                <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
                    <AddIcon />
                </Fab>
                <CustomizedDialogs handleClose={handleClose} open={open} AddRow={AddRow} PriorityValues={Constants.PriorityValues}  Catergories={Constants.CatergoryValues}  formattedTime={formattedTime}/>
           </Paper> 
        </div>
    )
}

export default ProjectTable;
