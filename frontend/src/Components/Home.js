import { useEffect, useState } from "react";
import Navbar from './Navbar'
import { styled, alpha } from '@mui/material/styles';
import { Box, Typography, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddQuestion from "./AdddQuestion/AddQuestion";
import QuestionList from "./QuestionList";
import QuestionDesc from "./QuestionDesc";
import axios from "axios";
import apis from "../config/api";
import { QuestionContext } from "./Context";
import { toast } from "react-toastify";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.08),
    },
    
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
}));



const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));



const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
}));




/* 
    Component Starts 
*/
const Home = () => {
    const [active, setActive] = useState('Home');
    const [open, setOpen] = useState(false);
    const [des, setDes] = useState(false)
    const [rows, setRows] = useState([]);

    useEffect(()=>{
        axios.get(apis.getAllQuestions)
        .then((res)=>{
    
            let info = [];
            let data = res.data;
            data.forEach(element => {
              console.log(element);
              console.log(new Date(element.timeStamp));
              info.push({id: element.id, title: element.title, timeStamp: new Date(element.timeStamp).toLocaleDateString("fr-FR").toString(), asked_by: element.user.username});
            });
            setRows(info);
        })
        .catch((err)=>{
            console.log(err);
        })
      }, []);

    const clickRow = (id) => {
        setDes(true);
        
    }

    return (
        <QuestionContext.Provider value={{rows, clickRow}} >

        <div className='bg-primary-light min-h-screen'>
            <Box sx={{display:"flex"}}>
                
                <Navbar DrawerHeader={DrawerHeader} Search={Search} SearchIconWrapper={SearchIconWrapper} StyledInputBase={StyledInputBase} ask={open} setAsk={setOpen}/>
            
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Box sx={{display:{sm:"none"}}}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    />
                        </Search>
                    </Box>

                    <Box>
                        <AddQuestion open={open} setOpen={setOpen} />
                        {!des ? <QuestionList /> : null }
                        {des ? <QuestionDesc /> : null }
                    </Box>
                </Box>
            </Box>
        </div>

        </QuestionContext.Provider>
    );
}

export default Home;