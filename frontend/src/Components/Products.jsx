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
import {useNavigate,useLocation,useParams} from 'react-router-dom'

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

function Products() {
    const history=useNavigate()
    const [categorys,setCategorys]=useState([])
    var pathcheck= useLocation()
    var {id}=useParams()
    // console.log()
    useEffect(()=>{
        
        const fetchData=async()=>{
            if(pathcheck.pathname.includes('subCategory')){
                await axios.get(server + "/getProducts",{params:{limit:"10",skip:"0",subCategoryId:id}},{}).then((response)=>{
                    if(response.data.code===200){
                        toast.success(response.data.message)
                        setCategorys(response.data.data);
                    }
                }) 
            }
            else
            if(pathcheck.pathname.includes('mainCategory')){
                await axios.get(server + "/getProducts",{params:{limit:"10",skip:"0",mainCategoryId:id}},{}).then((response)=>{
                    if(response.data.code===200){
                        toast.success(response.data.message)
                        setCategorys(response.data.data);
                    }
                }) 
            }else
            {
                await axios.get(server + "/getProducts",{params:{limit:"10",skip:"0"}},{params:{}}).then((response)=>{
                    if(response.data.code===200){
                        toast.success(response.data.message)
                        setCategorys(response.data.data);
                    }
                })
            }
         
        };
        fetchData()

    },[])

    const viewMainCategorys=(id)=>{
        history(`/mainCategorys/${id}`)
    }
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Products</StyledTableCell>
            {/* <StyledTableCell align="center">Products count</StyledTableCell> */}
            {/* <StyledTableCell align="center"></StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {categorys.map((row) => (
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                {row.productName}
              </StyledTableCell>
              {/* <StyledTableCell align="right">{row.productCount}</StyledTableCell>
              <StyledTableCell align="right">
              <Tooltip title="View the subcategory">
                <IconButton onClick={()=>viewMainCategorys(row._id)}>
                    <PageviewIcon />
                </IconButton>
                </Tooltip>
              </StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>  )
}

export default Products

