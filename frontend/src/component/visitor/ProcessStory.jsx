import React from 'react'
import { Grid } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import { Button } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar'

import logo from '../../assets/storyPlusPlus.png'
import defaultImg from '../../assets/defaultImg.jpg'
import read from '../../assets/book.svg'
import write from '../../assets/writing.svg'
import './VisitorView.scss'

import search from '../../assets/search.svg'

const useStyles = makeStyles((theme) => ({
    icon: {
        width: '40px'
    },
    iconWrapper: {
        width: '40px',
        margin: '5px'
    },
    tileWrapper: {
        width: '400px'
    },
    tileImage: {
    },
    tileBar: {

    }
}));

//AXIOS:
// the 2 onclicks should connect redirect to the appropriate reader/writer flow correspoing story id. 
function ProcessStory(story) {
    const classes = useStyles();
    return (
        <GridListTile cols={3} className={classes.tileWrapper}>
            <img className={classes.tileImage} width='400px' src={defaultImg} alt={story.title} />
            <GridListTileBar 
                title={<span>{story.title}</span>}
                subtitle={<span>by: {story.author}</span>}
                actionIcon={
                    <Container>
                        <IconButton onClick={(e) => {
                            e.preventDefault();
                            window.location.href=`/read/${story.id}`;
                        }} aria-label={`read ${story.id}`} className={classes.iconWrapper}>
                            <img width='40px' className={classes.icon} src={read} alt='read' />
                        </IconButton>
                        <IconButton onClick={(e) => {
                            e.preventDefault();
                            window.location.href=`/edit/${story.id}`;
                        }} aria-label={`write ${story.id}`} className={classes.iconWrapper}>
                            <img width='40px' className={classes.icon} src={write} alt='write' />
                        </IconButton>
                    </Container>
                }
                className={classes.tileBar}
            />
        </GridListTile>
    )
}

export default ProcessStory
