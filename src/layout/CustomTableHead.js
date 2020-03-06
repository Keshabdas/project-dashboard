import React from 'react'
import {  TableHead, TableRow, TableCell, Checkbox, Tooltip } from '@material-ui/core'




function CustomTableHead(props) {
    const {headcells, onSelectAllClick, rowCount, numSelected} = props;
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    {/* <Tooltip title={numSelected > 0 ? 'Deselect all' : 'Select all'}>
                        <Checkbox 
                            indeterminate={numSelected > 0 && numSelected < rowCount }
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />  
                    </Tooltip> */}
                </TableCell>
                {headcells.map((headcell) => (
                    <TableCell key={headcell.id}>
                        {headcell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default CustomTableHead;
