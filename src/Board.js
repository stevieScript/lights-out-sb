import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import './Board.css';

const Board = ({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) => {
	const [board, setBoard] = useState(createBoard());
	const [hasWon, setHasWon] = useState(false);

	useEffect(() => {
		setHasWon(board.every((row) => row.every((cell) => !cell)));
	}, [board]);

	function createBoard() {
		let newBoard = [];
		for (let y = 0; y < nrows; y++) {
			let row = [];
			for (let x = 0; x < ncols; x++) {
				row.push(Math.random() < chanceLightStartsOn);
			}
			newBoard.push(row);
		}
		return newBoard;
	}

	function flipCellsAround(coord) {
		setBoard((oldBoard) => {
			const newBoard = oldBoard.map((row) => [...row]);
			const [y, x] = coord.split('-').map(Number);

			function flipCell(y, x) {
				if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
					newBoard[y][x] = !newBoard[y][x];
				}
			}

			flipCell(y, x);
			flipCell(y, x - 1);
			flipCell(y, x + 1);
			flipCell(y - 1, x);
			flipCell(y + 1, x);

			return newBoard;
		});
	}

	function makeTable() {
		let tblBoard = [];
		for (let y = 0; y < nrows; y++) {
			let row = [];
			for (let x = 0; x < ncols; x++) {
				let coord = `${y}-${x}`;
				row.push(
					<Cell
						key={coord}
						isLit={board[y][x]}
						flipCellsAroundMe={() => flipCellsAround(coord)}
					/>
				);
			}
			tblBoard.push(<tr key={y}>{row}</tr>);
		}
		return (
			<table className='Board'>
				<tbody>{tblBoard}</tbody>
			</table>
		);
	}

	return (
		<div>
			{hasWon ? (
				<div className='winner'>
					<span className='neon-orange'>YOU</span>
					<span className='neon-blue'>WIN!</span>
				</div>
			) : (
				<div>
					<div className='Board-title'>
						<div className='neon-orange'>Lights</div>
						<div className='neon-blue'>Out</div>
					</div>
					{makeTable()}
				</div>
			)}
		</div>
	);
};

export default Board;
