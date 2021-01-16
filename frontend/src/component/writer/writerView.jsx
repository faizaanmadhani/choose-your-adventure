import { react } from '@babel/types';
import React, { Component } from 'react';
import ReactFlow, { addEdge, removeElements } from 'react-flow-renderer';
import http from '../../services/httpservice';
class WriterView extends Component {
	state = {
		nodes: [],
		title: '',
		parentId: 0,
		instanceWrap: React.createRef(),
		instance: {},
		nodeView: -1 //if -1, we are on overview, if on anything else, we are on the nodeview
	};
	componentDidMount() {
		this.setState({
			//set title and set parentid!//!
			// later to be replaced from backend
			nodes: [
				{
					id: '1',
					type: 'output', // input node
					data: { label: '1' },
					sourcePosition: 'left',
					targetPosition: 'right',
					position: { x: 0, y: 300 }
				},
				// default node
				{
					id: '2',
					// you can also pass a React component as a label
					data: { label: '2' },
					sourcePosition: 'left',
					targetPosition: 'right',
					position: { x: 300, y: 300 }
				},
				{
					id: '3',
					// you can also pass a React component as a label
					data: { label: '3' },
					sourcePosition: 'left',
					targetPosition: 'right',
					position: { x: 300, y: 425 }
				},
				{
					id: '4',
					type: 'default', // output node
					data: { label: '4' },
					sourcePosition: 'left',
					targetPosition: 'right',
					position: { x: 350, y: 550 }
				}
			]
		});
	}
	update = () => {
		//! send signal with http
		//const data = make some data to send back
	};
	handleConnect = (param) => {
		//target is parent, source is child
		//handleConnect func
		param.arrowHeadType = 'arrowclosed';
		//param.animated = 'true';
		const nodes = addEdge(param, this.state.nodes);

		console.log(`${param.target} is now parent of ${param.source}`);
		this.setState({ nodes });
	};
	handleDelete = (param) => {
		if (param[0].id != 1) {
			//! or whereever the things start{}
			const nodes = removeElements(param, this.state.nodes);
			this.setState({ nodes });
		}
	};
	handleLoad = (param) => {
		this.setState({ instance: param }); //set state instance
	};
	handleNew = () => {
		const height = this.state.instanceWrap.current.clientHeight;
		const width = this.state.instanceWrap.current.clientWidth * 0.7;
		const instanceObject = this.state.instance.toObject().position;
		const position = { x: instanceObject[0] + width / 2, y: instanceObject[1] + height / 2 };
		const nodes = [
			{
				id: this.state.nodes.length + 1,
				type: 'default',
				position,
				sourcePosition: 'left',
				targetPosition: 'right',
				data: { label: 'new' }
			},
			...this.state.nodes
		];
		this.setState({ nodes });
	};
	render() {
		return (
			<div className="flowWrapper" ref={this.state.instanceWrap}>
				{this.state.nodeView == -1 ? (
					<ReactFlow
						onNodeDragStop={(p1, p2) => {
							console.log(p1);
							console.log(p2);
						}}
						onMoveEnd={(param) => {
							console.log(`window zoom: ${param.zoom}, position: x: ${param.x}, y: ${param.y}`);
						}}
						onLoad={this.handleLoad}
						elements={this.state.nodes}
						onConnect={this.handleConnect}
						onElementsRemove={this.handleDelete}
						onElementClick={(e, node) => {
							this.setState({ nodeView: node.id });
						}}
					/>
				) : (
					<div> {this.state.nodeView} </div>
				)}
			</div>
		);
	}
}

export default WriterView;
