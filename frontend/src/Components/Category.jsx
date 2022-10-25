import React,{useEffect,useState} from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Server, { server } from './Server';
import { toast } from 'react-toastify';
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PageviewIcon from '@mui/icons-material/Pageview';
import {useNavigate} from 'react-router-dom'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

function Category() {
    const history=useNavigate()
    const [categorys,setCategorys]=useState([])
    useEffect(()=>{
        const fetchData=async()=>{
            await axios.get(server + "/getCategory",{params:{limit:"10",skip:"0"}},{}).then((response)=>{
                if(response.data.code===200){
                    toast.success(response.data.message)
                    setCategorys(response.data.data);
                }
            })
        };
        fetchData()
    },[])

    const viewMainCategorys=(id,count)=>{
        if(count>0){
            history(`/mainCategorys/${id}`)
        }else{
            toast.warn("No products found")
        }
      
    }
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Categories</StyledTableCell>
            <StyledTableCell align="center">Products count</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categorys.map((row) => (
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                {row.categoryName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.productCount}</StyledTableCell>
              <StyledTableCell align="right">
              <Tooltip title="View the subcategory">
                <IconButton onClick={()=>viewMainCategorys(row._id,row.productCount)}>
                    <PageviewIcon />
                </IconButton>
                </Tooltip>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>  )
}

export default Category

