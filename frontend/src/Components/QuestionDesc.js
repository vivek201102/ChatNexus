import { Box, Button, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

const QuestionDesc = () => {
    return (
        <Box sx={{display: {md:"flex"}, justifyContent:"space-between"}}>
            <Paper style={{ padding: '20px', width:"74%"}}>
                <Typography variant="h4">Question Title</Typography>
                <Typography variant="body1" style={{ margin: '10px 0' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum metus lectus, vitae auctor quam sollicitudin a. Ut semper
                    varius mi, id laoreet neque iaculis id. Vivamus eget fringilla ligula. Mauris vel lacus id ante viverra dictum. Integer lobortis
                    efficitur nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque sollicitudin
                    convallis nibh ac lacinia.
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '20px' }}>
                    Donec sollicitudin mi eget condimentum sagittis. Nam at maximus enim. Fusce nec gravida felis. Morbi aliquet volutpat massa, a
                    tristique turpis blandit eget. Nullam eleifend, metus non vestibulum commodo, est metus congue ipsum, vel lacinia nisi velit eu
                    elit. Fusce vestibulum dui id nulla bibendum, ut vulputate purus dignissim. Praesent eu scelerisque tellus.lacinia nisi velit eu
                    elit. Fusce vestibulum dui id nulla bibendum, ut vulputate purus dignissim. Praesent eu scelerisque tellus.
                </Typography>
                <div>
                    <span className="mx-2 bg-primary-lightblueshade text-primary-lighblue p-2">React</span>
                    <span className="mx-2 bg-primary-lightblueshade text-primary-lighblue p-2">React</span>
                    <span className="mx-2 bg-primary-lightblueshade text-primary-lighblue p-2">React</span>
                </div>
                <div className="flex justify-end mt-3 ">
                    <div>
                        <Typography variant="body2">Posted by: Vivek Patel</Typography>
                        <Typography variant="body2">Date: May 24, 2023</Typography>
                    </div>

                </div>
                <Typography variant="h6" style={{ marginTop: '20px' }}>Answers</Typography>
                <div>
                    <Typography variant="subtitle1">Answer 1</Typography>
                    <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum metus lectus, vitae auctor quam sollicitudin a. Ut semper
                        varius mi, id laoreet neque iaculis id. Vivamus eget fringilla ligula. Mauris vel lacus id ante viverra dictum. Integer lobortis
                        efficitur nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque sollicitudin
                        convallis nibh ac lacinia.
                    </Typography>
                    <div className="flex justify-end mt-3">
                        <div>
                            <Typography variant="body2">Answered by: Jane Smith</Typography>
                            <Typography variant="body2">Date: May 24, 2023</Typography>
                        </div>
                    </div>
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