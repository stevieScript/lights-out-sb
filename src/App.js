import Board from './Board';
import Timer from './Timer';
import './App.css';

function App() {
	return (
		<div className='App'>
			<div>
				<Board
					nrows={5}
					ncols={5}
				/>
			</div>
			<div>
				<Timer />
			</div>
		</div>
	);
}

export default App;
