import React, {useState} from "react";
import clsx from "clsx";
import List from "@material-ui/core/List";
import {Category, Class, MenuBook, PeopleOutline} from "@material-ui/icons";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    paddedContainer: {
        padding: theme.spacing(3)
    }
}))
export default function Wrapper(props) {
    let [state, setState] = useState({
        drawer: {
            direction: 'left',
            open: false
        }
    })

    const toggleDrawer = (open) => {
        setState(prev => {
            prev.drawer.open = open
            return JSON.parse(JSON.stringify(prev))
        })

    }
    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={() => toggleDrawer(false)}
            onKeyDown={() => toggleDrawer(false)}
        >
            <List>
                {[
                    ['Books', <Class/>, '/books'],
                    ['Categories', <Category/>, '/categories'],
                    ['Members', <PeopleOutline/>, '/members'],
                    ['Books Issued', <MenuBook/>, '/issues']
                ].map(([text, icon, link], index) => (

                    <Link href={link}>
                        <ListItem button key={text}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider/>
        </div>
    );

    const classes = useStyles()
    return (
        <div className={'container'}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={() => toggleDrawer(true)} edge="start" className={classes.menuButton}
                                color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Power House Library
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Drawer anchor={state.drawer.direction} open={state.drawer.open} onClose={() => toggleDrawer(false)}>
                {list('left')}
            </Drawer>
            <Container fixed className={classes.paddedContainer}>
                {props.children}
            </Container>
        </div>

    )
}