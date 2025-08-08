import PropTypes from "prop-types";
import styles from "./GetQuotes.module.css";
import { handleScrollToBottom } from "../../../utils/scroll";

const GetQuotes = ({message}) => {
  return (
    <div className={styles.container}>
      <button onClick={()=> handleScrollToBottom()} className={styles.button}>Get quotes</button>
      <p className={styles.text}>{message}</p>
    </div>
  );
};

GetQuotes.propTypes = {
  message:  PropTypes.string.isRequired,
};
export default GetQuotes;
