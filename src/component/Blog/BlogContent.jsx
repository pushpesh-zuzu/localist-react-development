import styles from "./BlogContent.module.css";
import { handleScrollToBottom } from "../../utils/scroll";

const BlogContent = ({ title, contentBlocks, buttonText }) => {
  return (
    <div className={styles.findAnAccountant_container}>
      <div className={styles.findAnAccountant_container_wrap}>
        <div className={styles.findAnAccountant_content}>
          {/* {title && <h2 className={styles.findAnAccountant_heading}>{title}</h2>} */}
          <p className={styles.timeWrap}>10 mins read time</p>
          {contentBlocks?.map((block, index) => {
            const prevBlock = contentBlocks[index - 1];

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
            if (block.type === "h3uiliWithoutStyle") {
              return (
                <ul
                  key={index}
                  style={{
                    marginTop: block?.marginTop === true ? "8px" : "0px",
                    marginBottom: "0px",
                    listStyleType: "none",
                  }}
                >
                  <li>
                    {block.heading && (
                      <h3 className={styles.findAnAccountant_h3}>
                        {block.heading}
                      </h3>
                    )}
                    <span
                      className={styles.findAnAccountant_paragrap}
                      dangerouslySetInnerHTML={{
                        __html: block.text,
                      }}
                    />
                  </li>
                </ul>
              );
            }
            if (block.type === "p") {
              return (
                <p
                  key={index}
                  className={styles.findAnAccountant_paragrap}
                  style={{
                    marginTop: block?.marginTop ? "12px" : "0px",
                    marginBottom: "0px",
                  }}
                  dangerouslySetInnerHTML={{ __html: block.text }}
                ></p>
              );
            }

            if (block.type === "pbold") {
              return (
                <p
                  key={index}
                  className={styles.findAnAccountant_paragrap}
                  style={{
                    marginTop: block?.marginTop ? "12px" : "0px",
                    marginBottom: "0px",
                  }}
                >
                  <b>{block.text}</b>
                </p>
              );
            }

            if (block.type === "uili") {
              return (
                <ul
                  key={index}
                  style={{
                    marginTop: block?.marginTop === true ? "8px" : "0px",
                    marginBottom: "0px",
                    paddingLeft:'16px'
                  }}
                >
                  <li className={styles.findAnAccountant_paragrap}>
                    <b>{block.heading}</b>{" "}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: block.text, // block.text can now include <a>, <strong>, etc.
                      }}
                    />
                  </li>
                </ul>
              );
            }

            if (block.type === "li") {
              return (
                <ul
                  key={index}
                  style={{
                    marginTop: block?.marginTop ? "8px" : "0px",
                    marginBottom: "0px",
                    paddingLeft:'16px'
                  }}
                >
                  <li className={styles.findAnAccountant_paragrap}>
                    {/* {block.heading} */}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: block.heading,
                      }}
                    />
                    {block?.text ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: block?.text,
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </li>
                </ul>
              );
            }
            if (block.type === "image") {
              return (
              <div style={{display:'flex',justifyContent:"center"}}>
                  <img
                  src={block?.source}
                  alt="Extra section visual"
                  className={styles.image}
                  // style={{maxHeight:'510px',margin:"32px 0px"}}
                />
                </div>
              );
            }
            if (block.type === "libold") {
              return (
                <ul
                  key={index}
                  style={{
                    marginTop: block?.marginTop ? "8px" : "0px",
                    marginBottom: "0px",
                  }}
                >
                  <li className={styles.findAnAccountant_paragrap}>
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
          onClick={handleScrollToBottom}
          className={styles.findAnAccountant_button}
        >
          Get Quotes Now
        </button>
      )}
      {/* <p className={styles.btntext}>From {title}s Near You</p> */}
    </div>
  );
};

export default BlogContent;
