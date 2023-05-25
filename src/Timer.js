import React, { useState, useEffect } from 'react';
import './Timer.css';
const Timer = () => {
	const [time, setTime] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setTime((time) => time + 1);
		}, 1000);

		// cleanup function
		return () => {
			clearInterval(interval);
		};
	}, []);

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	};

	return <div className='Timer'>{formatTime(time)}</div>;
};

export default Timer;
