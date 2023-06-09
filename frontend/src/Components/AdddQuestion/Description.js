import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Box, Fab, Grid, TextField } from "@mui/material";
import { Card, CardActionArea, CardContent, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { AskQuestionContext } from '../Context';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  icon: {
    margin: theme.spacing(2)
  },
  cardContainer:{
     
    margin: "10px",
  },
  cardRoot: {
    paddingBottom: "14px !important"
  },
  cardRootHide: {
    paddingBottom: "14px !important",
    margin: "-16px"
  },
  input: {
    display: "none"
  },
  submit: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "120px",
  }
}));


const Description = () => {
    const classes = useStyles();
    const {onInputChange, img, setImg, inputData, setInputData, register,handleSubmit,reset, image, setImage, uploadState, handleUploadClick, handleResetClick} = useContext(AskQuestionContext);
    

    return (
        <>
            <Box mt={5}>
                <Grid container justifyContent={"center"} alignItems={"center"}>
                <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    name='description'
                    onChange={onInputChange}
                    value={inputData.description}
                    rows={4}
                    placeholder="Describe your question"
                    fullWidth
                    variant="standard"
                    />
                    <Card className={classes.cardContainer} >
                        <CardContent
                        className={
                            uploadState !== "uploaded" ? classes.cardRoot : classes.cardRootHide
                        }
                        >
                        <Grid container justify="center" alignItems="center" fullWidth>
                            <input
                            accept="image/jpeg,image/png,image/tiff,image/webp"
                            className={classes.input}
                            id="contained-button-file"
                            
                            {...register('logo', { required: true })}
                            type="file"
                            onChange={handleUploadClick}
                            />
                            <label
                            htmlFor="contained-button-file"
                            className={uploadState === "uploaded" ? classes.input : null}
                            >
                            <Fab component="span" className={classes.button}>
                                <AddAPhotoIcon />
                            </Fab>
                            </label>
                        </Grid>
                        </CardContent>
                        {uploadState === "uploaded" && (
                        <CardActionArea onClick={handleResetClick}>
                            <img className={classes.logo} src={image} alt="LOGO" />
                        </CardActionArea>
                        )}
                    </Card>
                </Grid>                                        
            </Box> 
        </>
    )
}

export default Description;