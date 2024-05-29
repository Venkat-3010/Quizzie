import axios from 'axios';
import { toast } from 'react-toastify';
const quizUrl = 'http://localhost:3010/quizapi';

const createQuiz = async (quizData) => {
    try{
        const response = await axios.post(`{$quizUrl}/createquiz`, quizData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(response.data);
        return response.data;
    } catch(error){
        console.log('error creating q', error);
        toast.warn('Error creating quiz', error.message);
    }
};

const getAllUserQuizzes = async() => {
    try{
        const response = await axios.get(`${quizUrl}/user-quizzes/${localStorage.getItem('id')}`, {
            headers: {
                'Content-Type': 'application/json',
            }
    });
        console.log(response.data);
        return response.data;
    } catch(error){
        console.log('error getting user quizzes', error);
        toast.warn('Error getting user quizzes', error.message);
    }
};

const updateQuiz = async(quizId, updateQuizData) => {
    try{
        const response = await axios.put(`${quizUrl}/quizzes/${quizId}/update`, updateQuizData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(response.data);
        return response.data;
    } catch(error){
        console.log('error updating quiz', error);
        toast.warn('Error updating quiz', error.message);
    }
}

const getQuizById = async(quizId) => {
    try{
        const response = await axios.get(`${quizId}/quizzes/${quizId}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log('response', response.data);
        return response.data;
    }catch(error){
        console.log('error getting quiz by id', error);
        toast.warn('Error getting quiz by id', error.message);
    }
};

const deleteQuiz = async(quizId) => {
    try{
        const response = await axios.delete(`${quizUrl}/quizzes/${quizId}/delete`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(response.data);
        return response.data;
    } catch(error){
        console.log('error deleting quiz', error);
        toast.warn('Error deleting quiz', error.message);
    }
};

const checkQuizAnswers = async(quizId, answers) => {
    try{
        const response = await axios.post(`${quizUrl}/quizzes/${quizId}/answers`, answers, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(response.data);
        return response.data;
    } catch(error){
        console.log('error checking quiz answers', error);
        toast.warn('Error checking quiz answers', error.message);
    }
};

const getQuizByIdForUpdate = async(quizId) => {
    try{
        const response = await axios.get(`${quizUrl}/quizzes/${quizId}/edit`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(response.data);
        return response.data;
    } catch(error){
        console.log('error getting quiz by id for update', error);
        toast.warn('Error getting quiz by id for update', error.message);
    }
}

export { createQuiz, updateQuiz, getAllUserQuizzes, deleteQuiz, getQuizById, getQuizByIdForUpdate, checkQuizAnswers };