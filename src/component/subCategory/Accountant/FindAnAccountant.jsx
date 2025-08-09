import styles from "./FindAnAccountant.module.css";
import { handleScrollToBottom } from "../../../utils/scroll";

const FindService = ({ title, contentBlocks, buttonText }) => {
  return (
    <div className={styles.findAnAccountant_container}>
      <div className={styles.findAnAccountant_container_wrap}>
        <div className={styles.findAnAccountant_content}>
          {/* {title && <h2 className={styles.findAnAccountant_heading}>{title}</h2>} */}
          {contentBlocks?.map((block, index) => {
            if (block.type === "h2") {
              return (
                <h2 key={index} className={styles.findAnAccountant_heading}>
                  {block.text}
                </h2>
              );
            }
            if (block.type === "h3") {
              return (
                <h3 key={index} className={styles.findAnAccountant_heading}>
                  {block.text}
                </h3>
              );
            }
            if (block.type === "p") {
              return (
                <p key={index} className={styles.findAnAccountant_paragrap}>
                  {block.text}
                </p>
              );
            }
            return null;
          })}
        </div>
      </div>
      {title && (
        <button
          onClick={() => handleScrollToBottom()}
          className={styles.findAnAccountant_button}
        >
          Get quotes
        </button>
      )}
      <p className={styles.btntext}>from {title}s near you</p>
    </div>
  );
};

export default FindService;
