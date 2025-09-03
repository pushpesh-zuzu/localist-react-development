import styles from "./findservicelevel3.module.css";
import { handleScrollToBottom } from "../../utils/scroll";

const FindServiceLevel3 = ({ title, contentBlocks, buttonText }) => {
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
                <h3 key={index} className={styles.findAnAccountant_h3}>
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
            if (block.type === "pbold") {
              return (
                <p key={index} className={styles.findAnAccountant_paragrap}>
                  <b>{block.text}</b>
                </p>
              );
            }
            if (block.type === "uili") {
              return (
                <ul>
                  <li className={styles.findAnAccountant_paragrap}>
                    <b> {block.heading}</b>
                    {block.text}
                  </li>
                </ul>
              );
            }
            if (block.type === "li") {
              return (
                <ul>
                  <li className={styles.findAnAccountant_paragrap}>
                    {" "}
                    {block.heading}
                  </li>
                </ul>
              );
            }
            if (block.type === "libold") {
              return (
                <ul>
                  <li className={styles.findAnAccountant_paragrap}>
                    {" "}
                    <b>{block.heading}</b>
                  </li>
                </ul>
              );
            }
            if (block.type === "table") {
              return (
                <div key={index} className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        {block?.tableHeaders.map((header, i) => (
                          <th key={i}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block?.rowData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, colIndex) => (
                            <td
                              key={colIndex}
                              className={colIndex === 0 ? styles.firstCol : ""}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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

export default FindServiceLevel3;
