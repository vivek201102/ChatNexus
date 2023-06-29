import { forwardRef, useEffect, useState } from "react";
import Navbar from './Navbar'
import { styled, alpha } from '@mui/material/styles';
import { Box, Typography, InputBase, AppBar, Toolbar, IconButton, List, ListItem, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddQuestion from "./AdddQuestion/AddQuestion";
import QuestionList from "./QuestionList";
import QuestionDesc from "./QuestionDesc";
import axios from "axios";
import apis from "../config/api";
import { QuestionContext } from "./Context";
import { toast } from "react-toastify";
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

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
    const [check, setCheck] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [id, setId] = useState();
    const [question, setQuestion] = useState();

    useEffect(()=>{
        axios.get(apis.getAllQuestions)
        .then((res)=>{
    
            let info = [];
            let data = res.data;
            data.forEach(element => {
              console.log(element);
              console.log(new Date(element.timeStamp));
              info.push({id: element.id, title: element.title, timeStamp: new Date(element.timeStamp).toLocaleDateString("fr-FR").toString(), asked_by: element.user.username, description: element.description, tags: element.tags});
            });
            setRows(info);
        })
        .catch((err)=>{
            console.log(err);
        })
      }, [check]);

    const clickRow = (id, rowIndex) => {
        setId(id);
        setQuestion(rows[rowIndex]);
        setOpenDialog(true);
        
    }
    const handleClickOpen = () => {
        setOpenDialog(true);
      };
    
      const handleClose = () => {
        setOpenDialog(false);
      };

    return (
        <QuestionContext.Provider value={{rows, clickRow, check, setCheck}} >

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
                        <QuestionList />
                    </Box>
                </Box>
            </Box>
        </div>
            <Dialog
            fullScreen
            open={openDialog}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative', backgroundColor:"#FCF7FF", color:"black" }}>
            <Toolbar>
                <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                >
                <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                </Typography>
            </Toolbar>
            </AppBar>
            <Box sx={{ margin:'2%' }}>

                <QuestionDesc id={id} question={question}/>
            </Box>
            
        </Dialog>
        </QuestionContext.Provider>
    );
}

export default Home;