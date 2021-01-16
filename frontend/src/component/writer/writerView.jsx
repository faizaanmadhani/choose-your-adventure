import React, { Component } from 'react';
import ReactFlow, { addEdge, removeElements } from 'react-flow-renderer';

class WriterView extends Component {
	state = {
		nodes: [
			{
				id: '1',
				type: 'input', // input node
				data: { label: 'Input Node' },
				position: { x: -250, y: 25 }
			},
			// default node
			{
				id: '2',
				// you can also pass a React component as a label
				data: { label: <div>Default Node</div> },
				position: { x: 0, y: 0 }
			},
			{
				id: '3',
				// you can also pass a React component as a label
				data: { label: <div>Default Node</div> },
				position: { x: 100, y: 125 }
			},
			{
				id: '4',
				type: 'output', // output node
				data: { label: 'Output Node' },
				position: { x: 250, y: 250 }
			}
		] // later to be replaced from backend
	};
	handleConnect = (param) => {
		//handleConnect func
		const nodes = addEdge(param, this.state.nodes);
		console.log(this.state.nodes);
		this.setState({ nodes });
	};
	handleDelete = (param) => {
		const nodes = removeElements(param, this.state.nodes);
		this.setState({ nodes });
	};

	render() {
		return (
			<ReactFlow
				elements={this.state.nodes}
				onConnect={this.handleConnect}
				onElementsRemove={this.handleDelete}
			/>
		);
	}
}

export default WriterView;
