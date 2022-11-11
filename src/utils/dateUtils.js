import moment from 'moment/moment';

export const daysLeftToCloseProde = () => {
	const now = moment();
	const endOfProde = moment(process.env.REACT_APP_CLOSE_PRODE_DATE);
	console.log('now', now);
	console.log('endOfProde', endOfProde);

	return endOfProde.diff(now, 'days');
};

export const daysLefToOpenProde = () => (daysLeftTo(process.env.REACT_APP_OPEN_PRODE_DATE));

/***
 * @param {string} date
 */
export const daysLeftTo = date => {
	const now = moment();
	const endOfProde = moment(date);
	return endOfProde.diff(now, 'days');
};