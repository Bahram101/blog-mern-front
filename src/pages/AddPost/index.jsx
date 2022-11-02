import React, { useRef, useState, useEffect } from "react";
import { Box, Button, TextareaAutosize, TextField } from "@mui/material";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { selectIsAuth } from "../../redux/slices/auth";
import { useSelector } from "react-redux";
import axios from "../../axios";

export const AddPost = () => {
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const { id } = useParams();
  const initialState = {
    title: "",
    tags: "",
    text: "",
    imageUrl: "",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState(initialState);
  const inputFileRef = useRef(null);
  const isEditing = Boolean(id);

  useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then(({ data }) => {
        setState(data);
      });
    }
  }, []);

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/uploads", formData);
      setState({ ...state, imageUrl: data.url });
    } catch (error) {
      console.warn("errrr", error);
      alert("Ошибка при загрузке файл!");
    }
  };

  const onClickRemoveImage = () => {
    setState({ ...state, imageUrl: "" });
  };

  if (!window.localStorage.getItem("_token") && !isAuth) {
    return <Navigate to="/" />;
  }

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, state)
        : await axios.post("/posts", state);

      const _id = isEditing ? id : data._id;

      navigate(`/posts/${_id}`);
      
    } catch (error) {
      console.log(error);
      alert("Ошибка при создания файла");
    }
  };

  console.log("state", state);

  return (
    <Box style={{ padding: 30 }}>
      <Button
        variant="outlined"
        onClick={() => inputFileRef.current.click()}
        size="large"
      >
        Загрузить превью
      </Button>
      <input
        type="file"
        ref={inputFileRef}
        onChange={handleChangeFile}
        hidden
      />
      {state.imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <div style={{ width: "200px" }}>
            <img
              width="200"
              className={styles.image}
              src={`http://localhost:5000${state.imageUrl}`}
              alt="Uploaded"
            />
          </div>
        </>
      )}

      <br />
      <br />
      <TextField
        className={styles.title}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={state.title}
        onChange={(e) => setState({ ...state, title: e.target.value })}
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
        value={state.tags}
        onChange={(e) => setState({ ...state, tags: e.target.value })}
      />
      <TextareaAutosize
        aria-label="minimum height"
        minRows={10}
        onChange={(e) => setState({ ...state, text: e.target.value })}
        value={state.text}
        style={{
          border: "none",
          marginTop: "10px",
          width: "100%",
          marginBottom: "10px",
          padding: "10px",
          outline: "none",
          fontSize: "21px",
        }}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? "Сохранить" : "Опубликовать"}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Box>
  );
};
