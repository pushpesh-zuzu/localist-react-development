import PropTypes from "prop-types";
import styles from "./GetQuotes.module.css";
import { handleScrollToBottom } from "../../../utils/scroll";

const GetQuotesLocation = ({ service,needSString=true,location }) => {
  return (
    <div className={styles.container}>
      <button onClick={() => handleScrollToBottom()} className={styles.button}>
        Get quotes
      </button>

      {service && (
        <p className={styles.text}>
          from {service}{needSString?'s':''} in {location}
        </p>
      )}
    </div>
  );
};

// GetQuotes.propTypes = {
//   service: PropTypes.string.isRequired,
// };
export default GetQuotesLocation;