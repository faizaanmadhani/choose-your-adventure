import { Switch, Route } from 'react-router-dom';
import VisitorView from './component/visitor/VisitorView';
import WriterPage from './component/writer/writerPage';
import ReaderView from './component/reader/ReaderView.jsx';

/*
Pages:
writerview 
readerview
visitor page (home)
*/
function App() {
	return (
		<div className="App">
			<Switch>
				<Route path="/read/:id" component={ReaderView} />
				<Route
					path="/edit/:id"
					render={(props) => {
						return <WriterPage {...props} />;
					}}
				/>
				<Route exact path="/" component={VisitorView} />
			</Switch>
		</div>
	);
}

export default App;
