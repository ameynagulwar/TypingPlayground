import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useTheme } from '../Context/ThemeContext';
const TableUserData = ({data}) => {

    const {theme} = useTheme();
    const cellStyles = {color: theme.textcolor, textAlign: 'center'}
  return (
    <div className='table'>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={cellStyles}>
                          WPM
                        </TableCell>
                        <TableCell style={cellStyles}>
                          ACCURACY
                        </TableCell>
                        <TableCell style={cellStyles}>
                          CHARACTERS
                        </TableCell>
                        <TableCell style={cellStyles}>
                          DATE
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                       {
                        data.map((i) => (
                            <TableRow>
                               <TableCell style={cellStyles}>
                                  {i.wpm}
                               </TableCell>
                               <TableCell style={cellStyles}>
                                  {i.accuracy}
                               </TableCell>
                               <TableCell style={cellStyles}>
                                  {i.characters}
                               </TableCell>
                               <TableCell style={cellStyles}>
                                   {i.timeStamp.toDate().toLocaleString()}
                               </TableCell>
                           </TableRow>
                        ))
                       }
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}

export default TableUserData