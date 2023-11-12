import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "https://school-management-d6sj.onrender.com";

// Async thunk to fetch all students
export const fetchAllStudents = createAsyncThunk(
  "students/fetchAll",
  async () => {
    const response = await fetch(`${API_BASE}/students`);
    const data = await response.json();
    return data.data;
  }
);

// Async thunk to add a student
export const createStudent = createAsyncThunk(
  "students/add",
  async (student) => {
    const response = await fetch(`${API_BASE}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
    const data = await response.json();
    return data.data;
  }
);

// Async thunk to update a student
export const updateStudent = createAsyncThunk(
  "students/update",
  async ({ studentId, data }) => {
    const response = await fetch(`${API_BASE}/students/${studentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result.data;
  }
);

// Async thunk to delete a student
export const deleteStudent = createAsyncThunk(
  "students/delete",
  async (studentId) => {
    const response = await fetch(`${API_BASE}/students/${studentId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data.data;
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    data: [],
    status: "idle", // can be 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // When any async action starts, we set status to 'loading'
      .addCase(fetchAllStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteStudent.pending, (state) => {
        state.status = "loading";
      })

      // On successful completion of fetchAllStudents, set the state
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })

      // When create, update, or delete is fulfilled, refresh the entire student list
      .addCase(createStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [...state.data, action.payload]; // Append new student to the list
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedStudentIndex = state.data.findIndex(
          (student) => student._id === action.payload._id
        );
        if (updatedStudentIndex !== -1) {
          state.data[updatedStudentIndex] = action.payload;
        }
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [...state.data].filter(
          (student) => student._id !== action.payload._id
        ); // Remove deleted student
      })

      // Handle potential errors
      .addCase(fetchAllStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default studentsSlice.reducer;
