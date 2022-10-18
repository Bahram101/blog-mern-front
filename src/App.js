import React, { useEffect } from "react";
import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

function App() {
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.auth.data);

    useEffect(() => {
        dispatch(fetchAuthMe());
    }, []);

    console.log("loggedIn", loggedIn);

    return (
        <>
            <Header />
            <Container maxWidth="lg">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts/:id" element={<FullPost />} />
                    <Route path="/add-post" element={<AddPost />} />
                    <Route path="/posts/:id/edit" element={<AddPost />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
