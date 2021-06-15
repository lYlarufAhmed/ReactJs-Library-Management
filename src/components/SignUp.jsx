import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import {Button} from "@material-ui/core";
import UploadButton from "./UploadButton";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
}));
export default function SignUp(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        'name': '',
        'email': '',
        'password': '',
        'confirm-password': '',
        'loading': false
    })

    const handleInput = (e) => {
        setState(prevState => {
            prevState[e.target.name] = e.target.name === 'avatar' ? e.target.files[0] : e.target.value
            return {...prevState}
        })
    }

    const handleSubmit = async () => {

        setState(prev => ({...prev, 'loading': true}))
        let formData = new FormData()
        formData.append('email', state.email)
        formData.append('name', state.name)
        formData.append('password', state.password)
        formData.append('confirm-password', state["confirm-password"])
        formData.append('avatar', state.avatar)

        let res = await fetch('http://localhost:3001/auth', {
            method: 'POST',
            body: formData,
        })

        let parsed = await res.json()
        console.log(parsed)
        setState(prev => ({...prev, 'loading': false}))
    }

    return (
        <Paper elevation={3}>
            <form className={classes.root} autoComplete="off">
                <TextField id="name" onInput={handleInput} label="Name" type={'name'} name={"name"} required={true}
                           variant="outlined"/>
                <TextField id="email" label="Email" onInput={handleInput} type={'email'} name={"email"} required={true}
                           variant="outlined"/>
                <TextField id="password" label="Password" onInput={handleInput} type={'password'} name={"password"}
                           required={true}
                           helperText={state.password !== state["confirm-password"] && 'Password does not match'}
                           variant="outlined"/>
                <TextField id="confirm-password" label="Confirm Password" onInput={handleInput}
                           name={"confirm-password"}
                           helperText={state.password !== state["confirm-password"] && 'Password does not match'}
                           type={'password'}
                           required={true}
                           variant="outlined"/>
                <div>
                    <UploadButton inputHandler={handleInput} name={'avatar'}/>
                    <br/>
                    <Typography variant={'body2'}>{state.avatar && state.avatar.name} </Typography>
                </div>
                <Button variant={'contained'} onClick={handleSubmit}
                        disabled={!(state.name && state.password && state["confirm-password"] && (
                            state.password === state["confirm-password"]
                        ) && !state.loading && state.email)}>{state.loading ?
                    <CircularProgress size={28}/> : 'Sign Up'}</Button>
            </form>
        </Paper>

    )
}