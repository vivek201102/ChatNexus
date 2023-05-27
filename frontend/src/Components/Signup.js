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



const Signup = () => {
    return (
        <div className="">
            <Grid container>
                <Grid item md={6} sx={{display:{xs:"none", sm: "none", md:"flex"}}} className="flex justify-center bg-primary-blue min-h-screen">
                    <img src="images/login.png" />
                </Grid>
                <Grid item md={6} sx={{display:{xs: "block", md:"none"}}} className="flex justify-center bg-primary-blue max-h-fit">
                    <img src="images/login.png" />
                </Grid>
                <Grid item md={6} sm={12} sx={{display: "flex", justifyContent:"center"}} className="min-h-screen">
                        {/* <p className="mt-5 font-bold text-3xl">Disc<span className="text-primary-red">Us</span></p> */}
                    <div style={{marginTop:"15%"}}>
                        <h1 className="font-bold text-2xl">Sign Up</h1>
                        <p className="text-sm text-primary-grey">Fill up your details to create account</p>
                       

                        <div className="my-8 w-80">
                            <p className="font-bold">Name</p>
                            <TextField sx={{ marginY: "12px"}} variant="standard" placeholder="John Wick" fullWidth />
                            
                            <p className="font-bold">Username</p>
                            <TextField sx={{ marginY: "12px"}} variant="standard" placeholder="John Wick" fullWidth />
                            
                            <p className="font-bold">Email</p>
                            <TextField sx={{ marginY: "12px"}} variant="standard" placeholder="abc@comapny.com" fullWidth />
                            
                            <p className="font-bold">Password</p>
                            <TextField sx={{ marginY:"12px"}} variant="standard" placeholder="Password" type="password" fullWidth />
                            

                            <div className="flex  justify-between mt-8">

                            <ColorButton variant="contained">Register</ColorButton>
                            <span className="mt-3 text-right hover:cursor-pointer hover:text-primary-blue">Already User?</span>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Signup;