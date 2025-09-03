import PropTypes from "prop-types";
import styles from "./getquoteslevel3.module.css";
import { handleScrollToBottom } from "../../utils/scroll";

const GetQuotesLevel3 = ({ message,needSString=true }) => {
  return (
    <div className={styles.container}>
      <button onClick={() => handleScrollToBottom()} className={styles.button}>
        Get Quotes
      </button>

      {message && (
        <p className={styles.text}>
          from {message}{needSString?'s':''} today
        </p>
      )}
    </div>
  );
};

// GetQuotes.propTypes = {
//   message: PropTypes.string.isRequired,
// };
export default GetQuotesLevel3;
