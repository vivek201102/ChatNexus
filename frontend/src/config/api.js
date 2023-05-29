const baseUrl = "https://localhost:7211/api";

const apis = {
    registerUser: `${baseUrl}/User`,
    loginUser: `${baseUrl}/User/Login`,
    getAllQuestions: `${baseUrl}/Question`
}

export default apis;