import axios from "axios";
import { toast } from "react-toastify";
const quizUrl = "http://localhost:4000/quizapi";

const createQuiz = async (quizData) => {
  try {
    const response = await axios.post(`${quizUrl}/createquiz`, quizData, {
      headers: {
        'Authorization': localStorage.getItem('token')
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error creating q", error);
    toast.warn("Error creating quiz", error.message);
  }
};

const getAllUserQuizzes = async (userId) => {
  try {
    const response = await axios.get(`${quizUrl}/user-quizzes/${userId}`,{
      headers: {
        'Authorization': localStorage.getItem('token')
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error getting user quizzes", error);
    toast.warn("Error getting user quizzes", error.message);
  }
};

const quizAnalysis = async (quiz_Id) => {
  try {
    const response = await axios.get(`${quizUrl}/quizzes/${quiz_Id}/analysis`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error updating quiz", error);
    toast.warn("Error updating quiz", error.message);
  }
};

const getQuizById = async (quiz_Id) => {
  try {
    const response = await axios.get(`${quizUrl}/quizzes/${quiz_Id}`);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.log("error getting quiz by id", error);
    toast.warn("Error getting quiz by id", error.message);
  }
};

const deleteQuiz = async (quiz_id, userId) => {
  try {
    const response = await axios.delete(`${quizUrl}/${quiz_id}/delete`, userId, {
      headers: {
        'Authorization': localStorage.getItem('token')
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error deleting quiz", error);
    toast.warn("Error deleting quiz", error.message);
  }
};

const checkQuizAnswers = async (answers) => {
  try {
    const response = await axios.patch(
      `${quizUrl}/quizzes/submit`,
      answers
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error checking quiz answers", error);
    toast.warn("Error checking quiz answers", error.message);
  }
};

const getQuizByIdForUpdate = async (quiz_Id, quizData) => {
  try {
    const response = await axios.patch(
      `${quizUrl}/quizzes/${quiz_Id}/update`,
      quizData,
      {
        headers: {
          'Authorization': localStorage.getItem('token')
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error getting quiz by id for update", error);
    toast.warn("Error getting quiz by id for update", error.message);
  }
};

export {
  createQuiz,
  quizAnalysis,
  getAllUserQuizzes,
  deleteQuiz,
  getQuizById,
  getQuizByIdForUpdate,
  checkQuizAnswers,
};
