import React, { Component, useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import { Button } from '@material-ui/core'
import homeIcon from "../../assets/white-home.svg"
import logo from "../../assets/storyPlusPlus.png"

//http service
import http from '../../services/httpservice.js'
import './ReaderView.scss'

const useStyles = makeStyles({
	grid: {
		textAlign: 'center'
	},
	storyTitle: {
		color: 'white',
		fontFamily: "'Montserrat', sans-serif ",
		fontSize: '2em'
	},
	header: {
		backgroundColor: '#292c2e'
	},
	homeIcon: {
		fill: 'white'
	},
	mainContentWrapper: {
		paddingTop: '3rem',
		paddingBottom: '3rem',
		backgroundColor: '#3a3c45',
		fontFamily: "'Quicksand', sans-serif;",
		lineHeight:  '2em',
		fontSize: '1.2em'
	},
	mainContent: {
		textAlign: 'left',
		color: '#ffffff'
	},
	chapterTitle: {
		color: '#FFFFFF',
		fontWeight: '1000',
		fontSize: '2.5em'
	},
	footer: {
		backgroundColor: '#292c2e',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		paddingLeft: '15px',
		paddingRight: '15px',
		paddingTop: '3rem',
		paddingBottom: '3rem',
	}
});

//AXIOS: on page load, send a get request for all children nodes and store it.
function fetchNodes () {
	//Temporary
	return ['Communist 1', 'Communist 2', 'Communist 3']
}

//map helper function
//AXIOS: the onclick event fires a get request for the next page. 
function processNode (node) {
	return (
		<Button style={{
			flexGrow: '2',
			border: '1px solid white',
			marginLeft: '15px',
			marginRight: '15px',
			fontFamily: "'Nunito', sans-serif",
			fontWeight: '600',
			color: '#ffffff',
			fontSize: '1.05em'
		}} onClick={() => alert('do something')}> 
			{node}
		</Button>
	);
}

//AXIOS: get request for story content 
//pass page id as prop
function ReaderView(props) {

	//set ids
	const id = props.location.state.id
	console.log(id); //id successfully parsed

	const [story, SetStory] = useState([]);

	const useMountEffect = () => useEffect(()=>{
		//GetStory request
		const getStory = async(id) => {
			//console.log(`http://localhost:8080/story/${id}`);
			//'localhost:8080/story/_bizxm6h2u'
			const res = await http.get('localhost:8080/story/_bizxm6h2u');
				console.log('setting story');
				console.log(res.data.story);
			SetStory(res.data.story);
		}
        getStory(id);
	}, [id]);

	useMountEffect();

	console.log(story);

	//this is the config document. 
	const config = story.find((choice) => {
		return(choice.id === 'config')});
	console.log(config);

	const classes = useStyles();
	let nodes = fetchNodes();
	let jsxNodes = nodes.map(processNode);
	
	return (
		<Grid container spacing={0}>
                <Grid className={classes.header} container item sm={12} spacing={0}>
					<Grid className={classes.logo} style={{textAlign: 'center'}}container item sm={2}>
						<img style={{margin: 'auto', width: '100px', padding: '15px'}} src={logo} alt='LOGO GOES HERE' />
					</Grid>
                    <Grid className={classes.grid} style={{paddingTop: '1rem', paddingBottom: '1rem' }}container item sm={8}>
                        <h2 style={{margin: 'auto'}} className={classes.storyTitle} >The Communist Manifesto</h2>
                    </Grid>
                    <Grid className={classes.grid} container item sm={2}>
						<IconButton style={{margin: 'auto'}} aria-label="home" color="primary"  
							onClick={(e) => {
                            e.preventDefault();
                            window.location.href='/';
                            }} >
                            <img className={classes.homeIcon} style={{margin: 'auto'}} src={homeIcon} alt='home' height='25px' width='25px'/>
                        </IconButton>
                    </Grid>
                </Grid> 
                <Grid className={classes.mainContentWrapper} container item sm={12} spacing={0}>
					<Container style={{paddingBottom: '2rem'}} className={classes.grid} maxWidth="lg">
						<h1 className={classes.chapterTitle} style={{margin: 'auto'}}>Chapter 1</h1>
					</Container>
					
					<Container className={classes.mainContent} maxWidth="lg">
						<p>
						The Communist League, an international association of workers, which could of course be only a secret one, under conditions obtaining at the time, commissioned us, the undersigned, at the Congress held in London in November 1847, to write for publication a detailed theoretical and practical programme for the Party. Such was the origin of the following Manifesto, the manuscript of which travelled to London to be printed a few weeks before the February [French] Revolution [in 1848]. First published in German, it has been republished in that language in at least twelve different editions in Germany, England, and America. It was published in English for the first time in 1850 in the Red Republican, London, translated by Miss Helen Macfarlane, and in 1871 in at least three different translations in America. The french version first appeared in Paris shortly before the June insurrection of 1848, and recently in Le Socialiste of New York. A new translation is in the course of preparation. A Polish version appeared in London shortly after it was first published in Germany. A Russian translation was published in Geneva in the sixties [A]. Into Danish, too, it was translated shortly after its appearance.

However much that state of things may have altered during the last twenty-five years, the general principles laid down in the Manifesto are, on the whole, as correct today as ever. Here and there, some detail might be improved. The practical application of the principles will depend, as the Manifesto itself states, everywhere and at all times, on the historical conditions for the time being existing, and, for that reason, no special stress is laid on the revolutionary measures proposed at the end of Section II. That passage would, in many respects, be very differently worded today. In view of the gigantic strides of Modern Industry since 1848, and of the accompanying improved and extended organization of the working class, in view of the practical experience gained, first in the February Revolution, and then, still more, in the Paris Commune, where the proletariat for the first time held political power for two whole months, this programme has in some details been antiquated. One thing especially was proved by the Commune, viz., that “the working class cannot simply lay hold of the ready-made state machinery, and wield it for its own purposes.” (See The Civil War in France: Address of the General Council of the International Working Men’ s Association, 1871, where this point is further developed.) Further, it is self-evident that the criticism of socialist literature is deficient in relation to the present time, because it comes down only to 1847; also that the remarks on the relation of the Communists to the various opposition parties (Section IV), although, in principle still correct, yet in practice are antiquated, because the political situation has been entirely changed, and the progress of history has swept from off the earth the greater portion of the political parties there enumerated.

But then, the Manifesto has become a historical document which we have no longer any right to alter. A subsequent edition may perhaps appear with an introduction bridging the gap from 1847 to the present day; but this reprint was too unexpected to leave us time for that.
						</p>
						<p>
						The first Russian edition of the Manifesto of the Communist Party, translated by Bakunin [A], was published early in the ’sixties by the printing office of the Kolokol [reference to the Free Russian Printing House]. Then the West could see in it (the Russian edition of the Manifesto) only a literary curiosity. Such a view would be impossible today.

What a limited field the proletarian movement occupied at that time (December 1847) is most clearly shown by the last section: the position of the Communists in relation to the various opposition parties in various countries. Precisely Russia and the United States are missing here. It was the time when Russia constituted the last great reserve of all European reaction, when the United States absorbed the surplus proletarian forces of Europe through immigration. Both countries provided Europe with raw materials and were at the same time markets for the sale of its industrial products. Both were, therefore, in one way of another, pillars of the existing European system.

How very different today. Precisely European immigration fitted North American for a gigantic agricultural production, whose competition is shaking the very foundations of European landed property — large and small. At the same time, it enabled the United States to exploit its tremendous industrial resources with an energy and on a scale that must shortly break the industrial monopoly of Western Europe, and especially of England, existing up to now. Both circumstances react in a revolutionary manner upon America itself. Step by step, the small and middle land ownership of the farmers, the basis of the whole political constitution, is succumbing to the competition of giant farms; at the same time, a mass industrial proletariat and a fabulous concentration of capital funds are developing for the first time in the industrial regions.

And now Russia! During the Revolution of 1848-9, not only the European princes, but the European bourgeois as well, found their only salvation from the proletariat just beginning to awaken in Russian intervention. The Tsar was proclaimed the chief of European reaction. Today, he is a prisoner of war of the revolution in Gatchina [B], and Russia forms the vanguard of revolutionary action in Europe.

The Communist Manifesto had, as its object, the proclamation of the inevitable impending dissolution of modern bourgeois property. But in Russia we find, face-to-face with the rapidly flowering capitalist swindle and bourgeois property, just beginning to develop, more than half the land owned in common by the peasants. Now the question is: can the Russian obshchina, though greatly undermined, yet a form of primeval common ownership of land, pass directly to the higher form of Communist common ownership? Or, on the contrary, must it first pass through the same process of dissolution such as constitutes the historical evolution of the West?

The only answer to that possible today is this: If the Russian Revolution becomes the signal for a proletarian revolution in the West, so that both complement each other, the present Russian common ownership of land may serve as the starting point for a communist development.
						</p>
					</Container>
                </Grid> 
                <Grid className={classes.footer} container item sm={12} spacing={0}>
					{jsxNodes}
                </Grid> 
        </Grid>
	)
}

export default ReaderView
