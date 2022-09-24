import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuth, fetchRegister } from "../../redux/slices/auth";

import styles from "./Login.module.scss";

export const Registration = () => {
    const isAuth = useSelector(selectIsAuth);
    const errMes = useSelector(state=>state.auth.data);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
        mode: "onChange",
    });

 
    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values));

        if (!data.payload) {
            return alert("Не удалось зарегистрироваться");
        }
        if ("token" in data.payload) {
            window.localStorage.setItem("_token", data.payload.token);
        }
    };

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Создание аккаунта
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{ width: 100, height: 100 }} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="Полное имя"
                    fullWidth
                    error={errors.fullName?.message}
                    helperText={Boolean(errors.fullName?.message)}
                    {...register("fullName", {
                        required: "Укажите полное имя",
                    })}
                />
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    fullWidth
                    error={errors.email?.message}
                    helperText={Boolean(errors.email?.message)}
                    {...register("email", { required: "Укажите почту" })}
                />
                <TextField
                    className={styles.field}
                    label="Пароль"
                    fullWidth
                    error={errors.password?.message}
                    helperText={Boolean(errors.password?.message)}
                    {...register("password", { required: "Укажите пароль" })}
                />
                <Button
                    disabled={!isValid}
                    type="submit"
                    size="large"
                    variant="contained"
                    fullWidth
                >
                    Зарегистрироваться
                </Button>
            </form>
        </Paper>
    );
};
