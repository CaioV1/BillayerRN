import moment from 'moment';

export const getDefaultDateFormat = (date: Date): string => moment(date).format('DD/MM/YYYY');
export const getCurrentMonthYear = (): string => moment(new Date()).format('MM/YYYY');

export const isDateSameOrAfterToday = (date: string): boolean => {
  const formatedDate = moment(date, 'DD/MM/YYYY');
  return moment(new Date()).isSameOrAfter(formatedDate);
}

export const getDateToRenewBalance = (dayToRenew: string, oldDate: string): string => {
  const todayDate = new Date()
  const formatedOldDate = moment(oldDate, 'DD/MM/YYYY');
  const newRenewDate = formatedOldDate.add(1, 'month');

  if(moment(todayDate).isSameOrAfter(newRenewDate)){
    return `${dayToRenew}/${moment(todayDate).add(1, 'month').format('DD/MM/YYYY')}`;;
  }
  return newRenewDate.format('DD/MM/YYYY');
}