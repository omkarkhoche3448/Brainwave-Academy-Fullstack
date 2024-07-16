import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  enrolledCourses: [],
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setEnrolledCourses(state, action) {
      state.enrolledCourses = action.payload;
    },
    addEnrolledCourse(state, action) {
      state.enrolledCourses.push(action.payload);
    },
  },
});

export const { setUser, setLoading, setEnrolledCourses, addEnrolledCourse } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
