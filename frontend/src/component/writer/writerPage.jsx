import React, { Component } from 'react';
import WriterView from './writerView';
import './writerPage.scss';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
class writerPage extends Component {
	state = {};
	render() {
		return (
			<div className="pageContainer">
				<div className="sideBarContainer">
					<Button>create story</Button>
					<Button>add page</Button>
					<Button>delete story</Button>
				</div>
				<div className="share">
					<Button variant="contained" color="primary">
						<p>Share me</p>
					</Button>
				</div>
				<div className="flowContainer">
					<WriterView />
				</div>
			</div>
		);
	}
}

export default writerPage;
