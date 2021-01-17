import React, { useState, useEffect } from 'react'
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
import ProcessStory from './ProcessStory.jsx'

import logo from '../../assets/storyPlusPlus.png'
import defaultImg from '../../assets/defaultImg.jpg'
import './VisitorView.scss'

import search from '../../assets/search.svg'

//http service
import http from '../../services/httpservice.js'

const useStyles = makeStyles((theme) => ({
 logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh'
 },
 logo: {
    width: '20vw',
    minWidth: '200px'
 },
 searchBarWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10vh',
    minWidth: '200px'
 },
 searchBar: {
    position: 'relative',
    display: 'flex',
    minWidth: '200px'
 },
 searchIcon: {
    position: 'absolute',
    top: '8px',
    left: '8px',
    width: '17px'
 },
 search: {
    border: '1px solid grey',
    bordeRadius: '5px',
    height: '30px',
    width: '20vw',
    minWidth: '200px',
    padding: '2px 23px 2px 30px',
    outline: '0',
    backgroundColor: '#f5f5f5'
 },
 storiesWrapper: {
    display: 'flex',
    justifyContent: 'center'
 }
}));

//AXIOS: on page load, send a get request for all story objects and store it.
function fetchTestStories () {
	//Temporary
    return [{id: 'The Communist Manifesto', author: 'Karl Marx'},
            {id: 'Harry Potter', author: 'J.K. Rowling'},
            {id: 'Winnie the Pooh', author: 'Anderson'},
            {id: 'Introduction to Java', author: 'Sun Microsystems'},
            {id: 'Introduction to C++', author: 'Unknown'},
            {id: 'Introduction to JavaScript', author: 'Oracle'}]
}

function mapStory (story) {
	return (
        <ProcessStory id={story.id} author={story.author}></ProcessStory>
    );
}

function VisitorView() {
    //test endpoints:
    //getStories();
    const [ids, setIds] = useState(null); //
    
    const classes = useStyles(); //styles
    
    //GetStories request
    const getIds = async() => {
        const res = await http.get('http://localhost:3002/');
        setIds(res.data.stories);
    }

    //get stories on mount
    useEffect(()=>{
        getIds();
    }, []);
    
    console.log(ids); //setStories is working.
    let stories = fetchTestStories();
    let jsxStories = stories.map(mapStory);
    
    /*
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });
    */
    
    return (
        <Grid>
            <Grid style={{backgroundColor: '#292c2e' }}container spacing={0}>

            {/* Logo */}
            <Container className={classes.logoWrapper} maxWidth='lg'>
                <img className={classes.logo} src={logo} alt='logo' />
            </Container>

            {/* searchBar */}
            <Container className={classes.searchBarWrapper} maxWidth='md'>
            <div className={classes.searchBar}>
                <img className={classes.searchIcon} src={search} alt='searchIcon'/>
                <input className={classes.search} type="text" placeholder="Search..."></input>
            </div>
            </Container>
            </Grid>
            <Grid style={{backgroundColor: '#3a3c45'}} container spacing={0}>
                <GridList className={classes.storiesWrapper}>
                    <GridListTile key="Subheader" cols={3} style={{ height: 'auto'}}>
                        <ListSubheader component="div">Stories</ListSubheader>
                    </GridListTile>
                    {jsxStories}
                </GridList>

            </Grid>
        </Grid>
    )
}

export default VisitorView
