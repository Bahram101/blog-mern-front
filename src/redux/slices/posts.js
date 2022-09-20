import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

<<<<<<< HEAD
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ()=>{
    const {data} = await axios.get('/posts');
    console.log('data',data)
    return data
})
 
=======
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const { data } = await axios.get("/posts");
    return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
    const { data } = await axios.get("/tags");
    return data;
});

export const fetchOnePost = createAsyncThunk(
    "post/fetchOnePost",
    async (id) => {
        const { data } = await axios.get(`/post/${id}`);
        return data;
    }
);
>>>>>>> 88d4a71 (added FullPost, TagsBlock, authSlice)

const initialState = {
    posts: {
        items: [],
        status: "loading",
    },
    tags: {
        items: [],
        status: "loading",
    }, 
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducer: {},
    extraReducers: {
        //posts
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = "loading";
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = "loaded";
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = "error";
        },
        //tags
        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = "loading";
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = "loaded";
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = "error";
        },
   
    },
});

export const postsReducer = postsSlice.reducer;
