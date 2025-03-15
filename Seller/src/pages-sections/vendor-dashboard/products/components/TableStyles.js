import { styled } from '@mui/material/styles';
import { TableCell, TableRow, tableCellClasses } from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
      color: theme.palette.common.white,
      textAlign: 'center',
      color: 'white', // White text color for the header
      textAlign: 'center',
      fontFamily: 'Elemental End', // Custom font family
      textTransform: 'lowercase', // Lowercase text
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: 2,
      color: 'white',
    },
}));
  
export const tableContainerStyles = {
mt: 2,
background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
backdropFilter: 'blur(12px)',
borderRadius: '15px',
};
  
export  const tableFooterTextStyles = {
color: 'white',
fontSize:'16px'
};
  
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '& td, & th': {
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));