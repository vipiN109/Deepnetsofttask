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
import {useNavigate,useParams} from "react-router-dom"

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

function MainCategory() {
    const history=useNavigate();
    const [categorys,setCategorys]=useState([])
    const { id } = useParams();
    var categoryId=id
    useEffect(()=>{
        const fetchData=async()=>{
            await axios.get(server + "/get_mainCategory",{params:{limit:"10",skip:"0",categoryId:id}},{}).then((response)=>{
                if(response.data.code===200){
                    toast.success(response.data.message)
                    setCategorys(response.data.data);
                }
            })
        };
        fetchData()
    },[])

    const viewSubcategorys=async (mainCategoryId,count)=>{
      if(count>0){
        const data =await axios.get(server + "/get_subCategory",{params:{limit:"10",skip:"0",mainCategoryId:mainCategoryId}},{})
        if(data.data.data.length===0){
          history(`/products/mainCategory/${mainCategoryId}`)        
        }else if(data.data.data.length>0){
          history(`/subCategorys/${mainCategoryId}`)
          // var link=`/products/mainCategory/${mainCategoryId}`
          // console.log("we are here",link)
          
        }else{
          history(`/mainCategorys/${id}`)
        }
        
      }else{
        toast.warn("No products we found")
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
                {row.mainCategory}
              </StyledTableCell>
              <StyledTableCell align="center">{row.productCount}</StyledTableCell>
              <StyledTableCell align="right">
              <Tooltip title="View the subcategory">
                <IconButton onClick={()=>viewSubcategorys(row._id,row.productCount)}>
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

export default MainCategory

