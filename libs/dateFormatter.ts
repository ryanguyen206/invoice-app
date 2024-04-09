export const dateFormatter = (pDate: Date)  => {
const date = new Date(pDate)
const dateString = date.toDateString();

const parts = dateString.split(' ').slice(1);
const formattedDate = parts.join(' ');

return formattedDate
}   
