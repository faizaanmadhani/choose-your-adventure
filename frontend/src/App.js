import './App.css';
import { Switch, Route } from 'react-router-dom';
import EditView from './component/visitor/editView';
import writerPage from './component/writer/writerPage';
function App() {
	return (
		<div className="App">
			<Switch>
				<Route path="/view/:id" component={EditView} />
				<Route path="/" component={writerPage} />
			</Switch>
		</div>
	);
}

export default App;
