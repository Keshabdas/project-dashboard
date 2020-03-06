import React from 'react'
import { Toolbar, Typography, AppBar, Tooltip, IconButton } from '@material-ui/core'
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

function CustomToolbar(props) {
    const {numSelected, remove, edit, ToolbarEdit, done, cancel, totalProjects} = props;
    
    return (
        <AppBar color='primary' position="relative">
            <Toolbar >
                <div>
                    {numSelected > 0 ? (
                        <Typography variant='h6'>
                            {numSelected} Selected
                        </Typography>
                    ) : (
                        <Typography variant='h6'>
                             Project Dashboard  ( {totalProjects} )
                        </Typography>
                    )}
                </div>
                <div>
                    { numSelected > 0 ? 
                        (
                            <>
                                {
                                    ToolbarEdit ? 
                                    <Tooltip title="Done">
                                        <IconButton color="inherit" onClick={done}>
                                            <DoneIcon />
                                        </IconButton>
                                    </Tooltip>
                                    :
                                    <Tooltip title="Edit">
                                        <IconButton color="inherit" onClick={edit}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                }
                                {
                                    ToolbarEdit ? 
                                    <Tooltip title="Cancel">
                                        <IconButton color="inherit" onClick={cancel}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Tooltip>
                                    :
                                    <Tooltip title="Delete">
                                        <IconButton color="inherit" onClick={remove}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                }  
                            </>
                        ) 
                        : null 
                    }
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default CustomToolbar;
