import PropTypes from "prop-types";
import styles from "./GetQuotes.module.css";
import { handleScrollToBottom } from "../../../utils/scroll";

const GetQuotes = ({ message, title }) => {
  return (
    <div className={styles.container}>
      {title ? (
        <button
          onClick={() => handleScrollToBottom()}
          className={styles.button}
        >
         Get quotes from {title} near you
        </button>
      ) : (
        <button
          onClick={() => handleScrollToBottom()}
          className={styles.button}
        >
          Get quotes
        </button>
      )}
      {message && <p className={styles.text}>{message}</p>}
    </div>
  );
};

// GetQuotes.propTypes = {
//   message: PropTypes.string.isRequired,
// };
export default GetQuotes;
