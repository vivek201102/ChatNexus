const baseUrl = "https://localhost:7211/api";

const apis = {
    registerUser: `${baseUrl}/User`,
    loginUser: `${baseUrl}/User/Login`,
    getAllQuestions: `${baseUrl}/Question`,
    postQuestion: `${baseUrl}/Question`,
    postQuestionWithoutImage: `${baseUrl}/Question/WithoutImage`
}

export default apis;