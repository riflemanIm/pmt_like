import "moment/locale/ru"; // without this line it didn't work
import moment from "moment";
const dateFormat = (val, format = "DD.MM.YYYY", lang = { ru }) => {
  moment.locale(lang);
  return moment(val).format(format);
};
export default dateFormat;
