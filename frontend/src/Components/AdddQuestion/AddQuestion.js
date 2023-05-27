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

const steps = ['Instructions & Question Title', 'Description & Image', 'Tags'];


const AddQuestion = ({open, setOpen}) => {

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());



    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };


    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };



    const handleReset = () => {
        setActiveStep(0);
    };

    function handleSelecetedTags(items) {
        console.log(items);
      }



    return (
        <>
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
                                

                                <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Box>
                            </React.Fragment>
                        )}
                        </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default AddQuestion;