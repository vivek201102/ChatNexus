const baseUrl = "https://localhost:7211/api";

const apis = {
    registerUser: `${baseUrl}/User`,
    loginUser: `${baseUrl}/User/Login`,
    getAllQuestions: `${baseUrl}/Question`,
    postQuestion: `${baseUrl}/Question`,
    postQuestionWithoutImage: `${baseUrl}/Question/WithoutImage`,
    getAnswer: `${baseUrl}/Answer`,
    postAnswer: `${baseUrl}/Answer`
}

export default apis;