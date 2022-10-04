import React, { useRef, useState, useMemo, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { Navigate } from "react-router-dom";
import { selectIsAuth } from "../../redux/slices/auth";
import { useSelector } from "react-redux";
import axios from "../../axios";

export const AddPost = () => {
    const isAuth = useSelector(selectIsAuth);

    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [value, setValue] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const inputFileRef = useRef(null);

    const handleChangeFile = async (e) => {
        try {
            const formData = new FormData();
            const file = e.target.files[0];
            formData.append("image", file);
            const { data } = await axios.post("/upload", formData);
            setImageUrl(data.url);
        } catch (error) {
            console.warn("errrr", error);
            alert("Ошибка при загрузке файл!");
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl('')
    };

    const onChange = React.useCallback((value) => {
        setValue(value);
    }, []);

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: "400px",
            autofocus: true,
            placeholder: "Введите текст...",
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        []
    );

    if (!window.localStorage.getItem("_token") && !isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <Paper style={{ padding: 30 }}>
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
            {imageUrl && (
                <>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={onClickRemoveImage}
                    >
                        Удалить
                    </Button>
                    <div>
                        <img
                            className={styles.image}
                            src={`http://localhost:5000${imageUrl}`}
                            alt="Uploaded"
                        />
                    </div>
                </>
            )}

            <br />
            <br />
            <TextField
                classes={{ root: styles.title }}
                variant="standard"
                placeholder="Заголовок статьи..."
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
                classes={{ root: styles.tags }}
                variant="standard"
                placeholder="Тэги"
                fullWidth
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />
            <SimpleMDE
                className={styles.editor}
                value={value}
                onChange={onChange}
                options={options}
            />
            <div className={styles.buttons}>
                <Button size="large" variant="contained">
                    Опубликовать
                </Button>
                <a href="/">
                    <Button size="large">Отмена</Button>
                </a>
            </div>
        </Paper>
    );
};
