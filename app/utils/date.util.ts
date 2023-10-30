import moment from 'moment';

export const getDefaultDatetimeFormatText = (date: Date): string => moment(date).format('DD/MM/YYYY hh:mm:ss');