import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await fetch("https://dummyjson.com/todos?limit=3&skip=10");
    const result = await response.json()
    return result.todos
})
const initialState = {
    todos: [],
    status: "idle", // To manage loading state
    error: null, // To store any error that occurs during fetching
};
export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTask = {
                id: nanoid(),
                todo: action.payload,
                completed: false
            }
            state.todos.push(newTask)
        },
        deleteTodo: (state, action) => {
            const id = action.payload
            state.todos = state.todos.filter((todo) => todo.id !== id)
        },
        editTodo: (state, action) => {
            const id = action.payload.id;
            const itemToEdit = state.todos.find((todo) => todo.id === id)
            if (itemToEdit) {
                itemToEdit.todo = action.payload.todo
            }
        },
        toggleComplete: (state, action) => {
            const id = action.payload;
            state.todos = state.todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed }
                }
                return todo
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state, action) => {
            state.status = 'Loading'
        }).addCase(fetchTodos.fulfilled, (state, action) => {
            state.status = 'Success'
            state.todos = action.payload
        }).addCase(fetchTodos.rejected, (state, action) => {
            state.status = 'Error'
            state.error = action.error.message
        })
    }
})

export default todoSlice.reducer
export const { addTodo, deleteTodo, toggleComplete, editTodo } = todoSlice.actions