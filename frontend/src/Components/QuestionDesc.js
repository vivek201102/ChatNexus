import { Box, Button, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import apis from "../config/api";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const QuestionDesc = ({id, question}) => {
    const [answers, setAnswers] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [alreadyAnswer, setAlreadyAnswer] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [ans, setAns] = useState();
    const [check, setCheck] = useState(false);

    useEffect(()=>{
        console.log(id);
        console.log(question);
        axios.get(`${apis.getAnswer}/${id}`).then((res) => {
            setAnswers(res.data);
            res.data.map((item)=>{
                if(item.userId == user.id){
                    setAns(item.answer)
                    setAlreadyAnswer(true);
                }
            })
        })
        .catch((err)=>{
            console.log(err);

        })
    },[check])

    const submitAns = () => {
        axios.post(`${apis.postAnswer}`, {answer: ans, userId: user.id, questionId: question.id})
        .then((res)=>{
            console.log(res.data);
            if(check) setCheck(false);
            else setCheck(true);
        })
        .catch((err)=>{
            console.log(err);
        })
    }


    return (
        <Box sx={{display: {md:"flex"}, justifyContent:"space-between"}}>
            <Paper style={{ padding: '20px', width:"74%"}}>
                <Typography variant="h4">{question.title}</Typography>
                <Typography variant="body1" style={{ margin: '10px 0' }}>
                    {question.description}
                </Typography>
               
                <div>
                    {question.tags.split(',').map((item) => (
                        <span className="mx-2 bg-primary-lightblueshade text-primary-lighblue p-2">{item}</span>
                    ))}
                    
                </div>
                <div className="flex justify-end mt-3 ">
                    <div>
                        <Typography variant="body2">Posted by:  {question.asked_by}</Typography>
                        <Typography variant="body2">Date: {question.timeStamp}</Typography>
                    </div>

                </div>
                {
                    alreadyAnswer ? null :
                <div className="m-5">
                    <TextField fullWidth multiline rows={5} placeholder="Your Answer" value={ans} onChange={(e)=>{setAns(e.target.value)}}/>
                    <Button variant="contained" sx={{marginY: "15px", float:"right"}} onClick={submitAns}>Submit</Button>
                </div>
                }
                <div>
                    <Typography variant="h6" style={{ marginTop: '20px' }}>Answers</Typography>
                    {
                        answers.map((item, index) => (
                            <div>
                                <div className="flex justify-between">
                                    <Typography variant="subtitle1">Answer {index+1}</Typography>
                                    {
                                        user.id == item.userId ? isEdit ? <CloseIcon onClick={()=>{setIsEdit(false)}} /> :
                                        <EditIcon onClick ={() => {setIsEdit(true)}} /> : null
                                    
                                    
                                    }
                                </div>
                                {
                                    isEdit ? 
                                    <>
                                       <div className="m-5">
                                            <TextField 
                                                fullWidth 
                                                multiline 
                                                rows={5} 
                                                placeholder="Your Answer" 
                                                value={ans} 
                                                onChange={(e)=>{setAns(e.target.value); }}
                                                />
                                            <Button variant="contained" sx={{marginY: "15px", float:"right"}}>Submit</Button>
                                        </div> 
                                    </> :
                                    <div>
                                    <Typography variant="body1">
                                        {item.answer}
                                    </Typography>
                                    <div className="flex justify-end mt-3">
                                        <div>
                                            <Typography variant="body2">Answered by: {item.user.username}</Typography>
                                            <Typography variant="body2">Date: {item.timeStamp.substr(0,10)}</Typography>
                                        </div>
                                    </div>
                                    </div>
                                }

                            </div>
                        ))
                    }
                </div>
            </Paper>
            <Paper sx={{width:"24%"}} >
                <Typography variant="h6" className="text-center">More Questions</Typography>
                <List className="text-primary-lighblue">
                    <ListItem sx={{":hover": {cursor: "pointer"}}}>How to use for-loops, if-else statements, and regex to iteratively run a software on command line</ListItem>
                    <ListItem sx={{":hover": {cursor: "pointer"}}}>Not able to manage Bootstrap components by extending base.html in Django</ListItem>
                    <ListItem sx={{":hover": {cursor: "pointer"}}}>Where can I see my pull requests on GitHub?</ListItem>
                </List>
            </Paper>
        </Box>
    );
}

export default QuestionDesc;