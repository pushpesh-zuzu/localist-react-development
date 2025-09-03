import PropTypes from "prop-types";
import styles from "./GetQuotes.module.css";
import { handleScrollToBottom } from "../../../utils/scroll";

const GetQuotes = ({ message,needSString=true }) => {
  return (
    <div className={styles.container}>
      <button onClick={() => handleScrollToBottom()} className={styles.button}>
        Get Quotes
      </button>

      {message && (
        <p className={styles.text}>
          from {message}{needSString?'s':''} service providers today
        </p>
      )}
    </div>
  );
};

// GetQuotes.propTypes = {
//   message: PropTypes.string.isRequired,
// };
export default GetQuotes;
