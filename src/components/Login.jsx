import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import {Button, Typography} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useHistory} from 'react-router-dom'


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
export default function Login(props) {
    const history = useHistory()
    const classes = useStyles();
    const [state, setState] = useState({
        'email': '',
        'password': '',
        'loading': false
    })


    const handleInput = (e) => {
        setState(prevState => {
            prevState[e.target.name] = e.target.name === 'avatar' ? e.target.files[0] : e.target.value
            return {...prevState}
        })
    }

    const handleSubmit = async () => {

        // let formData = new FormData()
        // formData.append('email', state.email)
        // formData.append('password', state.password)
        setState(prevState => ({...prevState, loading: true}))

        let res = await fetch('http://localhost:3001/auth/verify', {
            method: 'POST',
            body: JSON.stringify({'password': state.password, 'email': state.email}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        let parsed = await res.json()
        console.log(parsed)
        if (parsed.success){
            localStorage.setItem('loggedInUser', parsed.loggedInUser)
            history.push('/books')
        }
        setState(prevState => ({...prevState, loading: false}))
    }

    return (
        <Paper elevation={3}>
            <Typography variant={'h4'}>Login</Typography>
            <form className={classes.root} autoComplete="off">
                <TextField id="email" label="Email" onInput={handleInput} type={'email'} name={"email"} required={true}
                           variant="outlined"/>
                <TextField id="password" label="Password" onInput={handleInput} type={'password'} name={"password"}
                           required={true}
                           variant="outlined"/>

                <Button variant={'contained'} onClick={handleSubmit}
                >{state.loading ? <CircularProgress size={28}/> : 'Login'}</Button>
            </form>
        </Paper>

    )
}