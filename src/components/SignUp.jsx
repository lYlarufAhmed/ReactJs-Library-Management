import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import {Button} from "@material-ui/core";
import UploadButton from "./UploadButton";
import Typography from "@material-ui/core/Typography";

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
        'confirm-password': ''
    })

    const handleInput = (e) => {
        setState(prevState => {
            prevState[e.target.name] = e.target.value
            return {...prevState}
        })
    }

    const handleSubmit = async () => {
        let res = await fetch('http://localhost:3001/auth', {
            method: 'POST',
            body: JSON.stringify(state),
            headers: {
                'Content-Type': 'multipart/form-data'
            }

        })

        let parsed = await res.json()
        console.log(parsed)
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
                    <UploadButton inputHandler={handleInput}/>
                    <br/>
                    <Typography variant={'body2'}>{state.upload} </Typography>
                </div>
                <Button variant={'contained'} onClick={handleSubmit}
                        disabled={!(state.name && state.password && state["confirm-password"] && ( state.password === state["confirm-password"] ) && state.email)}>Submit</Button>
            </form>
        </Paper>

    )
}