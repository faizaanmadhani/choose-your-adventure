import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import { Button } from '@material-ui/core'
import homeIcon from "../../assets/white-home.svg"
import logo from "../../assets/storyPlusPlus.png"
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
	return ['some chooooiiiiice node1', 'some choiiiiice node2', 'some choiiiiccce node3']
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
                        <h2 style={{margin: 'auto'}} className={classes.storyTitle} >Story Title</h2>
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
						<h1 className={classes.chapterTitle} style={{margin: 'auto'}}>Chapter $(Depth+1)</h1>
					</Container>
					
					<Container className={classes.mainContent} maxWidth="lg">
						<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				 		Cras in nisi vel mi fermentum viverra nec sed leo. Nunc ornare in neque ut hendrerit. 
						Nunc pharetra sed tellus quis ornare. Donec neque magna, vehicula in justo vel, molestie dignissim orci. Curabitur porttitor velit efficitur elementum dapibus. Donec convallis lorem et consectetur egestas. Duis eget blandit metus. Proin nibh risus, bibendum tristique lobortis a, blandit eu erat. In tincidunt eu massa non tincidunt. Suspendisse mollis semper velit, feugiat mollis nulla viverra sit amet. Cras commodo auctor neque, at feugiat mi hendrerit eget.
						Cras pharetra magna sed est iaculis commodo. Duis et dui finibus, lobortis dui id, gravida metus. Aenean porttitor tristique sapien vel vestibulum. Aliquam orci turpis, varius ac mi vel, lacinia tempor nibh. Praesent nisi odio, rutrum ac sollicitudin at, tincidunt at tortor. Aenean nec nunc ut lectus eleifend cursus. Vestibulum tellus arcu, blandit vel orci sed, facilisis commodo tellus. Praesent commodo eros eu massa faucibus posuere. Sed blandit velit mauris.
						Cras eget purus sed tellus bibendum feugiat. Sed pharetra quam quam, non scelerisque nulla laoreet in. Pellentesque non dolor diam. Vestibulum laoreet faucibus est, nec tristique libero aliquam eu. Fusce feugiat elit eu leo congue, volutpat posuere justo dignissim. Vivamus eu quam ut justo convallis maximus at vitae ex. Cras lobortis mauris ac sapien elementum, eget ultrices lorem ornare. Interdum et malesuada fames ac ante ipsum primis in faucibus. 
						Integer maximus risus eu leo gravida, ut congue dui faucibus. Phasellus enim felis, gravida quis nisi in, tincidunt mollis quam. Nullam tempus magna augue, ut sagittis enim auctor at. Vestibulum orci nisi, tempus non orci at, dapibus ultricies arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu nunc commodo, blandit purus non, vehicula eros. Praesent gravida urna facilisis, dignissim massa a, auctor purus.
						</p>
						<p>
						In augue eros, porta in metus nec, rhoncus suscipit lacus. Integer iaculis condimentum ante, eget viverra mauris. In ipsum magna, suscipit quis sapien ac, fermentum ornare mauris. Suspendisse mattis mattis quam ac egestas. Ut tincidunt libero leo, vitae viverra risus sollicitudin in.
						Etiam eros enim, posuere commodo metus et, aliquet suscipit odio. Sed a sagittis risus. Etiam non lectus tempor, tempus diam id, sodales lectus.
						Mauris fermentum convallis risus, id iaculis mauris varius eu. Integer ac tempor justo. Donec vel ultricies arcu. Nullam eu augue arcu. 
						Sed placerat vehicula mauris, eget venenatis eros. Donec vel sollicitudin nulla. Aenean gravida felis eu aliquam tincidunt. Quisque sed enim suscipit, feugiat erat consectetur, vulputate dui. Vivamus pharetra augue ac nisi fermentum ultrices.
						</p>
						<p>
						In augue eros, porta in metus nec, rhoncus suscipit lacus. Integer iaculis condimentum ante, eget viverra mauris. In ipsum magna, suscipit quis sapien ac, fermentum ornare mauris. Suspendisse mattis mattis quam ac egestas. Ut tincidunt libero leo, vitae viverra risus sollicitudin in.
						Etiam eros enim, posuere commodo metus et, aliquet suscipit odio. Sed a sagittis risus. Etiam non lectus tempor, tempus diam id, sodales lectus.
						Mauris fermentum convallis risus, id iaculis mauris varius eu. Integer ac tempor justo. Donec vel ultricies arcu. Nullam eu augue arcu. 
						Sed placerat vehicula mauris, eget venenatis eros. Donec vel sollicitudin nulla. Aenean gravida felis eu aliquam tincidunt. Quisque sed enim suscipit, feugiat erat consectetur, vulputate dui. Vivamus pharetra augue ac nisi fermentum ultrices.
						</p>
						<p>
						In augue eros, porta in metus nec, rhoncus suscipit lacus. Integer iaculis condimentum ante, eget viverra mauris. In ipsum magna, suscipit quis sapien ac, fermentum ornare mauris. Suspendisse mattis mattis quam ac egestas. Ut tincidunt libero leo, vitae viverra risus sollicitudin in.
						Etiam eros enim, posuere commodo metus et, aliquet suscipit odio. Sed a sagittis risus. Etiam non lectus tempor, tempus diam id, sodales lectus.
						Mauris fermentum convallis risus, id iaculis mauris varius eu. Integer ac tempor justo. Donec vel ultricies arcu. Nullam eu augue arcu. 
						Sed placerat vehicula mauris, eget venenatis eros. Donec vel sollicitudin nulla. Aenean gravida felis eu aliquam tincidunt. Quisque sed enim suscipit, feugiat erat consectetur, vulputate dui. Vivamus pharetra augue ac nisi fermentum ultrices.
						</p>
						<p>
						In augue eros, porta in metus nec, rhoncus suscipit lacus. Integer iaculis condimentum ante, eget viverra mauris. In ipsum magna, suscipit quis sapien ac, fermentum ornare mauris. Suspendisse mattis mattis quam ac egestas. Ut tincidunt libero leo, vitae viverra risus sollicitudin in.
						Etiam eros enim, posuere commodo metus et, aliquet suscipit odio. Sed a sagittis risus. Etiam non lectus tempor, tempus diam id, sodales lectus.
						Mauris fermentum convallis risus, id iaculis mauris varius eu. Integer ac tempor justo. Donec vel ultricies arcu. Nullam eu augue arcu. 
						Sed placerat vehicula mauris, eget venenatis eros. Donec vel sollicitudin nulla. Aenean gravida felis eu aliquam tincidunt. Quisque sed enim suscipit, feugiat erat consectetur, vulputate dui. Vivamus pharetra augue ac nisi fermentum ultrices.
						</p>
						<p>
						In augue eros, porta in metus nec, rhoncus suscipit lacus. Integer iaculis condimentum ante, eget viverra mauris. In ipsum magna, suscipit quis sapien ac, fermentum ornare mauris. Suspendisse mattis mattis quam ac egestas. Ut tincidunt libero leo, vitae viverra risus sollicitudin in.
						Etiam eros enim, posuere commodo metus et, aliquet suscipit odio. Sed a sagittis risus. Etiam non lectus tempor, tempus diam id, sodales lectus.
						Mauris fermentum convallis risus, id iaculis mauris varius eu. Integer ac tempor justo. Donec vel ultricies arcu. Nullam eu augue arcu. 
						Sed placerat vehicula mauris, eget venenatis eros. Donec vel sollicitudin nulla. Aenean gravida felis eu aliquam tincidunt. Quisque sed enim suscipit, feugiat erat consectetur, vulputate dui. Vivamus pharetra augue ac nisi fermentum ultrices.
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
