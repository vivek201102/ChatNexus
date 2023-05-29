import { Button, Grid, TextField } from "@mui/material";
import styled from "@emotion/styled";
import {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import apis from "../config/api";
import {redirect, useNavigate} from "react-router-dom";

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
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({
        Name: "",
        Username: "",
        Email: "",
        Password: "",
        Mobile: ""
    });
    const [error, setError] = useState(false);

    const onInputChange = (e) => {
        setError(false);
        setInputData(value => ({...value, [e.target.name]: e.target.value}));
    }

    const checkError = () => {
        if(inputData.Name == "" || inputData.Username == "" || inputData.Email == "" || inputData.Password == "" || inputData.Mobile == ""){
            setError(true);
            toast.error("Fill all required fields");
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        checkError();
        console.log(inputData);
        if(!error){
            axios.post(apis.registerUser, inputData)
                .then((res)=>{
                    toast.success("registered successfully");
                    navigate("/");
                })
                .catch((err)=>{
                    console.log(err);
                    toast.error(err.response.data);
                });
        }

    }

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
                            <p className="font-bold">Name*</p>
                            <TextField sx={{ marginY: "12px"}}
                                       variant="standard"
                                       placeholder="John Wick"
                                       name="Name"
                                       onChange={onInputChange}
                                       required
                                       fullWidth
                            />
                            
                            <p className="font-bold">Username*</p>
                            <TextField sx={{ marginY: "12px"}}
                                       variant="standard"
                                       placeholder="John@20"
                                       name="Username"
                                       onChange={onInputChange}
                                       required
                                       fullWidth />
                            
                            <p className="font-bold">Email*</p>
                            <TextField sx={{ marginY: "12px"}}
                                       variant="standard"
                                       placeholder="abc@comapny.com"
                                       required
                                       name="Email"
                                       onChange={onInputChange}
                                       fullWidth />

                            <p className="font-bold">Mobile*</p>
                            <TextField sx={{ marginY: "12px"}}
                                       variant="standard"
                                       placeholder="+91 0000000000"
                                       required
                                       name="Mobile"
                                       onChange={onInputChange}
                                       fullWidth />
                            
                            <p className="font-bold">Password*</p>
                            <TextField sx={{ marginY:"12px"}}
                                       variant="standard"
                                       placeholder="Password"
                                       type="password"
                                       required
                                       name="Password"
                                       onChange={onInputChange}
                                       fullWidth />
                            

                            <div className="flex  justify-between mt-8">

                            <ColorButton variant="contained" onClick={onSubmit}>Register</ColorButton>
                            <span className="mt-3 text-right hover:cursor-pointer hover:text-primary-blue"
                                onClick={()=>{
                                    navigate("/");
                                }}
                            >Already User?</span>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <ToastContainer />
        </div>
    );
}

export default Signup;