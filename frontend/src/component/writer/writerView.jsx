import { react } from '@babel/types';
import React, { Component } from 'react';
import ReactFlow, { addEdge, removeElements } from 'react-flow-renderer';
import http from '../../services/httpservice';
import PageDetail from './pageDetail';
import { backendURL } from '../../config.json';
class WriterView extends Component {
	state = {
		nodes: [],
		title: '',
		storyId: 0,
		parentId: 0,
		instanceWrap: React.createRef(),
		instance: {},
		nodeView: -1, //if -1, we are on overview, if on anything else, we are on the nodeview,
		nodeViewTitle: '',
		nodeViewValue: ''
	};
	handleNodeViewValueChange = (param) => {
		this.setState({ nodeViewValue: param });
	};
	handleNodeTitleChange = (param) => {
		this.setState({ nodeViewTitle: param.target.value });
	};
	async componentDidMount() {
		this.state.storyId = this.props.storyId;
		const { data: { story } } = await http.get(`${backendURL}story/${this.state.storyId}`);
		const config = story.filter((elem) => {
			return elem.id == 'config';
		});
		const pages = story.filter((elem) => {
			return elem.id != 'config';
		});
		const parentNodeId = config[0].parent;
		const nodes1 = pages.map((elem) => {
			//generate the nodes
			if (elem.id != 'config') {
				//not a config node
				const tmp = {
					id: elem.id,
					type: elem.id == parentNodeId ? 'output' : 'default',
					data: { label: elem.choice },
					sourcePosition: 'left',
					targetPosition: 'right',
					position: { x: elem.position.x, y: elem.position.y }
				};
				return tmp;
			}
		});
		pages.map((elem) => {
			//generate the links
			if (elem.links) {
				elem.links.map((childId) => {
					nodes1.push({
						arrowHeadType: 'arrowclosed',
						id: `reactflow__edge-${childId}-${elem.id}`,
						source: childId,
						sourceHandle: null,
						target: elem.id,
						targetHandle: null
					});
				});
			}
		});

		this.setState({
			parentId: parentNodeId,
			nodes: [ ...nodes1 ]
		});
	}
	updateStory = (obj) => {
		//! const res = http.post('url', obj);
		console.log(obj);
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
	handleDeleteHelper = async (id) => {
		await http.post(`${backendURL}story/delete/${this.state.storyId}/${id}`);
	};
	handleDelete = (param) => {
		//remove if its not parent

		if (param[0].id != this.state.parentId) {
			//! or whereever the things start{}
			this.handleDeleteHelper(param[0].id);
			const nodes = removeElements(param, this.state.nodes);
			this.setState({ nodes });
		}
	};
	handleLoad = async (param) => {
		this.setState({ instance: param }); //set state instance
	};
	handleNewStory = async () => {
		//!save first, wipe state.

		const data = await http.post('http://localhost:3002/story/create', {
			title: 'titletest',
			author: 'authortest'
		});
		// const data1 = await http.get('http://localhost:3002/story');
		// console.log(data1);
	};
	handleNewHelper = async (position) => {
		const tmp = {
			choice: 'new',
			position,
			content: ''
		};
		const { data } = await http.post(`${backendURL}story/add/${this.state.storyId}`, tmp);
		const nodes = [
			{
				id: data.id,
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
	handleNew = () => {
		//make new node
		const height = this.state.instanceWrap.current.clientHeight;
		const width = this.state.instanceWrap.current.clientWidth * 0.7;
		const toObject = this.state.instance.toObject();
		const instanceObject = toObject.position;
		const position = {
			x: -1 * (1 / toObject.zoom) * instanceObject[0] + width / 2,
			y: -1 * (1 / toObject.zoom) * instanceObject[1] + height / 2
		};
		this.handleNewHelper(position);
	};
	quickTest = async () => {
		const { data: { story: all } } = await http.get(`${backendURL}story/${this.state.storyId}`);
		console.log(all);
	};
	render() {
		return (
			<div className="flowWrapper" ref={this.state.instanceWrap}>
				{this.state.nodeView == -1 ? (
					<ReactFlow
						onNodeDragStop={(p1, p2) => {
							console.log(p1);
							console.log(p2);
							//! storyupdate here!
						}}
						onMoveEnd={(param) => {
							console.log(this.state);
							this.quickTest();
							console.log(`window zoom: ${param.zoom}, position: x: ${param.x}, y: ${param.y}`);

							//!storyupdate here!
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
					<PageDetail
						nodeId={this.state.nodeView}
						value={this.state.nodeViewValue}
						setValue={this.handleNodeViewValueChange}
						title={this.state.nodeViewTitle}
						setTitle={this.handleNodeTitleChange}
						moveBack={() => {
							this.setState({ nodeView: -1 });
						}}
						// doSave={}
					/>
				)}
			</div>
		);
	}
}

export default WriterView;
