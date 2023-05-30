import { Avatar, Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import TagsInput from "./TagInput";
import TitlePage from "./TitlePage";
import Description from "./Description";
import { AskQuestionContext, QuestionContext } from "../Context";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import apis from "../../config/api";
import axios from "axios";
const steps = ['Instructions & Question Title', 'Description & Image', 'Tags'];


const AddQuestion = ({open, setOpen}) => {

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [inputData, setInputData] = useState({
        title: "",
        description:"",
    });
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const {check, setCheck} = React.useContext(QuestionContext);
    const { register,handleSubmit,reset } = useForm();
    const [uploadState, setUploadState] = useState("initial");
    const [image, setImage] = useState();

    const handleUploadClick = (event) => {
        var file = event.target.files[0];
        const reader = new FileReader();
        if (file) {
          reader.readAsDataURL(file);
          reader.onloadend = function (e) {
            setImage(reader.result);
            setUploadState("uploaded");
          };
          setImg(file);
        }
      };
    
      const handleResetClick = (event) => {
        setImage(null);
        setImg(null);
        setUploadState("initial");
        reset({ logo: null });
      };

    const [img, setImg] = useState(null);
    const [tags, setTags] = useState([]);

    

    const handleNext = () => {
        if(activeStep == 0){
            if(inputData.title == ""){
                toast.error("Title can't be empty")
            }
            else{
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        }
        else if(activeStep == 1){
            if(inputData.description == ""){
                toast.error("Description can't be empty")
            }
            else{
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        }
        else{
            console.log(inputData);
            console.log(img);
            console.log(tags);

        }
        
        
    };

    const handleFinish = () => {
        console.log(inputData);
            console.log(img);
            console.log(tags);
            if(user == null){
                toast.error("Please login to ask question");
            }
            else if(img == null){
                console.log("without image")
                console.log(user)
                axios.post(apis.postQuestionWithoutImage, 
                    {
                        title: inputData.title,
                        description: inputData.description,
                        tags : tags.toString(),
                        userId: user.id
                    })
                    .then((res)=>{
                        setOpen(false);
                        if(check)
                            setCheck(false);
                        else
                            setCheck(true);
                        
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            }
            else{
                var formData = new FormData();
                formData.append("title", inputData.title);
                formData.append("description", inputData.description);
                formData.append("tags", tags.toString());
                formData.append("image", img);
                formData.append("userId", user.id);
                
                axios.post(apis.postQuestion, formData, {headers:{"Content-Type":"multipart/form-data"}})
                .then((res)=>{
                    setOpen(false);
                    if(check)
                        setCheck(false);
                    else
                        setCheck(true);
                })
                .catch((err)=>{
                    console.log(err);
                })
            }
    }


    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };



    const handleReset = () => {
        setActiveStep(0);
    };

    function handleSelecetedTags(items) {
        setTags(items);
        console.log(tags)
      }

    const onInputChange = (e) => {
        setInputData(values => ({...values, [e.target.name]: e.target.value}))
        
    }


    return (
        <AskQuestionContext.Provider value={{onInputChange, img, setImg, inputData, setInputData, register,handleSubmit,reset, image, setImage, uploadState, handleUploadClick, handleResetClick}}>
            <Dialog open={open} fullWidth>
                <DialogTitle >
                    <div className="flex justify-between">
                        <div>
                            Ask Question
                        </div>
                        <div>
                            <CloseIcon className="hover:cursor-pointer" onClick={()=>{ setOpen(false); }}/>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        
                    </DialogContentText>

                    <Box sx={{ width: '100%', marginY:'5%' }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            
                            return (
                                <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                            })}
                        </Stepper>
                        
                        {activeStep === steps.length ? (
                            <React.Fragment>
                            <Typography sx={{ mt: 5, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                            
                            {
                                activeStep == 0 ? 
                                    <TitlePage />
                                : activeStep == 1 ? 
                                    <Description />
                                :
                                <Box mt={5}>
                                    <TagsInput 
                                            selectedTags={handleSelecetedTags}
                                            fullWidth
                                            variant="outlined"
                                            id="tags"
                                            name="tags"
                                            placeholder="add Tags"
                                            tags={tags}
                                            label="tags" />
                                </Box>
                            }

                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                                >
                                Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                
                                {activeStep === steps.length - 1 ?
                                <Button onClick={handleFinish}>
                                 Finish
                                </Button>
                                :
                                <Button onClick={handleNext}>Next</Button>
                                 }
                            </Box>
                            </React.Fragment>
                        )}
                        </Box>
                </DialogContent>
            </Dialog>
            <ToastContainer />
        </AskQuestionContext.Provider>
    );
}

export default AddQuestion;