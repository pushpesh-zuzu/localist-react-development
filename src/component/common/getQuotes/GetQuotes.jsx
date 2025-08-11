import PropTypes from "prop-types";
import styles from "./GetQuotes.module.css";
import { handleScrollToBottom } from "../../../utils/scroll";

const GetQuotes = ({ message }) => {
  return (
    <div className={styles.container}>
      <button onClick={() => handleScrollToBottom()} className={styles.button}>
        Get quotes
      </button>

      {message && (
        <p className={styles.text}>
          from {message.toLowerCase()}s professionals today
        </p>
      )}
    </div>
  );
};

// GetQuotes.propTypes = {
//   message: PropTypes.string.isRequired,
// };
export default GetQuotes;
