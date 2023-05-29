import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { useTheme } from '@emotion/react';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { CssBaseline, FormControlLabel, FormGroup, List } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const settings = ['Profile', 'Your Questions', 'Your Answers', 'Logout'];



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



const Navbar = ({Search, SearchIconWrapper, StyledInputBase, ask, setAsk}) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('Home')
    const [options, setOptions] = useState([
      {
        "name":"Home",
        "logo": <HomeRoundedIcon />,
        "tooltip": "Home"
      },
      {
        "name":"Questions",
        "logo": <QuestionMarkIcon />,
        "tooltip": "Questions"
      },
      {
        "name":"Answer",
        "logo": <QuestionAnswerRoundedIcon />,
        "tooltip": "Answers"
      },
    ]);

    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = useState(null);
  
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };


    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    

    return (
        <>
          <CssBaseline />
          <AppBar position="fixed" open={open} sx={{backgroundColor:"#fff", color:"#000"}}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              
              <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      mr: 2,
                      display: { xs: 'none', md: 'flex' },
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    Chat<span className='text-primary-red'>Nexus</span>
                  </Typography>

                  <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    
                  </Box>
                  
                  {/* For small size screen */}
                  <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                      mr: 2,
                      display: { xs: 'flex', md: 'none' },
                      flexGrow: 1,
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    Chat<span className='text-primary-red'>Nexus</span>
                  </Typography>

                  {/* large screen size */}
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: {md: 'flex-end'} }}>
                  
                  </Box>

                  <Box sx={{display: {xs: 'none', sm:'block'}}}>
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

                  <Box sx={{margin:"12px", display:{xs:"none", sm:"none", md:"flex"}, alignItems:"center"}}>
                    <Tooltip title="Ask your Question">
                    <Button sx={{borderRadius: "25px", backgroundColor: "#FF3544", color:"#fff", paddingRight:"12px", paddingLeft:"12px", ":hover":{backgroundColor:"#FF3544"}}} 
                    onClick={()=>{
                      setAsk(true)
                    }}> Add Question
                      <AddIcon sx={{":hover": {backgroundColor:"#FF3541"}, marginLeft:"4px"}} /> 
                    </Button>
                    </Tooltip>
                  </Box>

                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Vivek" src="/static/images/avatar/3.jpg" sx={{backgroundColor: "#494554"}}/>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>


            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>

              {
                options.map((item, index)=> (
                  <ListItem key={item.name} disablePadding sx={{display: 'block'}}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px:2.5
                      }}
                      >
                      <ListItemIcon
                        onClick={()=>{navigate(`/${item.name}`)}}
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          borderBottom: active == item.name ? "2px solid" : "none",
                          color: active == item.name ? "red" : "grey",
                          justifyContent: 'center'
                        }}
                        
                      >
                        <Tooltip title={item.tooltip}>
                          {item.logo}
                        </Tooltip>
                      </ListItemIcon>
                      <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0, color: active == item.name ? "red" : "grey",}} />
                    </ListItemButton>
                  </ListItem>
                ))
              }
              
              
            </List>
            <Divider />
            <Box sx={{display: "flex", alignItems:"center", minHeight: 40, px:3}}>
              <Typography variant='subtitle1'  sx={{opacity: open ? 1 : 0}}>Tags</Typography>
            </Box>

            


          </Drawer> 
        </>
    );
}

export default Navbar;