import moment from 'moment';

export const getDefaultDateFormat = (date: Date): string => moment(date).format('DD/MM/YYYY');
export const getCurrentMonthYear = (): string => moment(new Date()).format('MM/YYYY');

export const isDateSameOrAfterToday = (date: string): boolean => {
  const formatedDate = moment(date, 'DD/MM/YYYY');
  return formatedDate.isSameOrAfter(moment(new Date()));
}

export const getNextMonthDate = (): string => {
  return moment(new Date()).add(1, 'month').format('DD/MM/YYYY');
}

export const getListMonths = (): string[] => {
  return moment.months();
}

export const getListYears = (dateParam?: string): number[] => {
  const year = new Date().getFullYear();
  const date = dateParam ? moment(dateParam, 'DD/MM/YYYY') : moment();

  //Count of years since the first transaction
  const countYears = moment().year() - (date.year() - 1);

  return Array.from({length: countYears}, (v, i) => year - countYears + i + 1).reverse();
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