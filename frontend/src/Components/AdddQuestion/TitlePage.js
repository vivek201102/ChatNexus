import { Box, TextField } from "@mui/material";

const TitlePage = () => {

    return (
        <>
            <Box mt={5} ml={3} fullWidth>
                <div className="m-5 bg-primary-pink p-5">
                    <p className="font-bold text-lg">Tips on getting good answer quickly</p>
                    <ul className="text-sm p-2">
                        <li> - Make sure your question has not been asked already</li>
                        <li> - Keep your question short and to the point</li>
                        <li> - Double-check grammer and spelling</li>
                    </ul>
                </div>

                

                <div className="flex justify-center mt-10">
                        <TextField variant="standard" fullWidth placeholder='Start your question with "What", "Why", "How", etc.'/>
                </div>
                <div className="h-40">

                </div>
            </Box> 
        </>
    );
}

export default TitlePage;