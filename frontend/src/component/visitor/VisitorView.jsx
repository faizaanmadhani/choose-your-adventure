import React, { useState, useEffect } from 'react'
import { FormHelperText, Grid } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import { Button } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'

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
    justifyContent: 'center',
    paddingBottom: '100px',
    margin: '0'
 },
 subHeaderWrapper: {
     textAlign: 'center'
 },
 subHeader : {
     margin: 'auto',
     fontFamily: 'Nunito, sans-serif',
     fontSize: '2.5rem',
     paddingBottom: '1rem',
     paddingTop: '1rem',
     color:'#ffffff'
 },
 addButton: {
    width: '60px',
    height: '60px',
    position: 'absolute',
    bottom: '30px',
    right: '30px'
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

function mapStory (story, index) {
	return (
        <ProcessStory key={index} id={story.id} author={story.author} title={story.title}></ProcessStory>
    );
}

function VisitorView() {
    //test endpoints:
    //getStories();
    const [ids, setIds] = useState([]); //
    //const [jsxStories, setJsxStories] = useState('');
    
    const classes = useStyles(); //styles
    
    //GetStories request
    const getIds = async() => {
        const res = await http.get('http://localhost:8080/story/');
        setIds(res.data.stories);
    }

    //get stories on mount
    useEffect(()=>{
        getIds();
    }, []);
    
    console.log('Ids')
    console.log(ids); //setStories is working.
    let jsxStories = ids.map(mapStory);
    
    return (
        <Grid>
            <Grid style={{backgroundColor: '#292c2e', paddingBottom:'25px'}}container spacing={0}>

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
                <Grid className={classes.subHeaderWrapper} container maxWidth='md'>
                    <div className={classes.subHeader}>Stories</div>
                </Grid>
                <GridList className={classes.storiesWrapper}>
                    {jsxStories}
                </GridList>
            </Grid>
            <Fab color="primary" aria-label="add" className={classes.addButton}>
                <AddIcon />
            </Fab>
        </Grid>

        
    )
}

export default VisitorView
