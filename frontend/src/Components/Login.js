import { Button, Grid, TextField } from "@mui/material";
import styled from "@emotion/styled";


const ColorButton = styled(Button)(({ theme }) => ({
    borderRadius:"9999px",
    color: "#fff",
    padding:"10px",
    width:"120px",
    backgroundColor: "#4C4DF5",
    '&:hover': {
      backgroundColor: "#4C4DF5",
    },
  }));





const Login = () => {
    

    return (
        <div className="">
            <Grid container>
                <Grid item md={6} sx={{display:{xs:"none", sm: "none", md:"flex"}}} className="flex justify-center bg-primary-blue min-h-screen">
                    <img src="images/login.png" />
                </Grid>
                <Grid item md={6} sx={{display:{xs: "block", md:"none"}}} className="flex justify-center bg-primary-blue max-h-fit">
                    <img src="images/login.png" />
                </Grid>
                <Grid item md={6} xs={12} sx={{display: "flex", justifyContent:"center"}} className="min-h-screen">
                    <div style={{marginTop:"15%"}}>
                        <h1 className="font-bold text-2xl">Sign in</h1>
                        <p className="text-sm text-primary-grey">Enter your credential to access your account</p>
                        <div className="my-5">
                            <div className="border-2 p-3 rounded-full flex justify-center">
                                <img src="images/google.png" height="25" width="25" className="mx-2" />
                                Sign in with Google
                            </div>  
                        </div>
                        
                        <div className="flex text-primary-grey">
                            <hr className="w-5/12 mt-3"/>
                            <p className="mx-3">OR</p>
                            <hr className="w-5/12 mt-3" />
                        </div>

                        <div className="my-8 w-80">
                            <p className="font-bold">Email</p>
                            <TextField sx={{ marginY: "15px"}} placeholder="abc@comapny.com" variant="standard" fullWidth />
                            <p className="font-bold">Password</p>
                            <TextField sx={{ marginY:"15px"}} placeholder="Password" type="password" variant="standard" fullWidth />

                            <div className="flex justify-between align-middle">
                                <p className="text-left hover:underline hover:cursor-pointer text-right mt-3">Forgot Password?</p>
                                <ColorButton variant="contained">Login</ColorButton>
                            </div>
                            
                            
                            <p className="text-right hover:cursor-pointer mt-8 hover:text-primary-blue font-bold">Agar aap naye he to account banayie</p>

                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login;