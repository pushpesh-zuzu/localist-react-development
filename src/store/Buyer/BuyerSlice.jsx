import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";

const initialState = {
  questionLoader:false,
  questionanswerData:[],
  buyerStep:1,
};

export const questionAnswerData = (questionData) => {
  return async (dispatch) => {
    dispatch(setquestionLoader(true));
    try {
      const response = await axiosInstance.post(
        `questions-answer`,
        questionData
      );

      if (response) {
        dispatch(setQuestionAnswerData(response?.data?.data));
      }
    } catch (error) {
      //   dispatch(setAuthError(error?.response?.data?.message));
    } finally {
      dispatch(setquestionLoader(false));
    }
  };
};

const buyerSlice = createSlice({
  name: "buyer",
  initialState: initialState,
  reducers: {
    setquestionLoader(state, action) {
      state.questionLoader = action.payload;
    },
    setQuestionAnswerData(state,action){
      state.questionanswerData = action.payload
    },
    setBuyerStep(state,action){
      state.buyerStep = action.payload
    }
  },
});

export const { setquestionLoader,setQuestionAnswerData,setBuyerStep } = buyerSlice.actions;

export default buyerSlice.reducer;
