import PropTypes from "prop-types";
import styles from "./GetQuotes.module.css";
import { handleScrollToBottom } from "../../../utils/scroll";

const GetQuotes = ({ message,needSString=true }) => {
  return (
    <div className={styles.container}>
      <button onClick={() => handleScrollToBottom()} className={styles.button}>
        Get quotes
      </button>

      {message && (
        <p className={styles.text}>
          from {message.toLowerCase()}{needSString?'s':''} professionals today
        </p>
      )}
    </div>
  );
};

// GetQuotes.propTypes = {
//   message: PropTypes.string.isRequired,
// };
export default GetQuotes;
