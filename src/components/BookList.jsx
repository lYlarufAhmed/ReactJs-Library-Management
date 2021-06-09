import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete'
import ConfirmDialog from "./ConfirmDialog";
import FeedbackDialog from "./FeedbackDialog";


export default function BookList(props) {
    let [state, setState] = useState({
        loading: true, books: [], openDialog: false,
        currentBook: null,
        openFeedback: false, feedback: ''
    })
    useEffect(() => {
        const getBooks = async () => {
            let res = await fetch('http://localhost:3001/books/api')
            let books = await res.json()
            setState(prev => {
                prev.loading = false
                prev.books = books
                return JSON.parse(JSON.stringify(prev))
            })
            console.log(books)
        }
        getBooks()
    }, [])
    const handleClickOpen = (id) => {
        setState(prevState => {
            prevState.openDialog = true
            prevState.currentBook = prevState.books.filter(book => book._id === id)[0]
            return {...prevState}
        })
    }
    const handleClose = () => {
        setState(prevState => {
            prevState.openDialog = false
            return {...prevState}
        })
    }

    const handleFeedbackClose = () => setState(prevState => ({...prevState, openFeedback: false}))

    const handleConfirm = async (id) => {
        setState(prevState => {
            return {...prevState, loading: true}
        })
        try {

            await deleteBook(id)
        } catch (e) {
            setState(prevState => ({...prevState, feedback: 'Fialed!', openFeedback: true}))
        }
        handleClose()
        setState(prevState => {
            return {...prevState, loading: false}
        })
    }
    const deleteBook = async (id) => {
        let reqStatus = await fetch(`http://localhost:3001/books/api/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        let parsed = await reqStatus.json()
        console.log(parsed)
        setState(prev => {
            prev.openFeedback = true
            if (parsed.success) {
                prev.books = prev.books.filter((book) => book._id !== id)
                prev.feedback = 'Success!'
                prev.openFeedback = true
                // open the openFeedback dialog
            } else {
                prev.feedback = 'Failed!'
                // open the failed dialog
            }
            return JSON.parse(JSON.stringify(prev))
        })

    }
    return (
        <Paper elevation={3}>
            {state.loading ? <CircularProgress/> : (
                <React.Fragment>
                    <List>
                        {state.books.map(book =>
                            <ListItem key={book._id}>
                                <ListItemText primary={book.title} secondary={book.authors.name.join(', ')}/>
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete"
                                                onClick={() => handleClickOpen(book._id)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )}
                    </List>
                    {state.openDialog &&
                    <ConfirmDialog open={state.openDialog} book={state.currentBook} handleClose={handleClose}
                                   handleConfirm={handleConfirm}/>}
                    <FeedbackDialog open={state.openFeedback} handleClose={handleFeedbackClose}
                                    feedback={state.feedback}/>
                </React.Fragment>
            )}

        </Paper>
    )
}