import styles from "./DrivewayComparisonTable.module.css";
// import {
//   drivewayTableHeaders,
//   drivewayTableData,
// } fro../drivewayTableDataata";
import H5 from "../UITypography/H5";
import Paragraph from "../UITypography/Paragrah";

export default function DrivewayComparisonTable({
  drivewayTableHeaders = [],
  drivewayTableData = [],
}) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {drivewayTableHeaders.map((header, index) => (
              <th key={index}>
                <H5>{header}</H5>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {drivewayTableData.map((row, index) => (
            <tr key={index}>
              <td>
                <Paragraph variant="small">{row.material}</Paragraph>
              </td>
              <td>
                <Paragraph variant="small" bold={false}>
                  {row.lifespan}
                </Paragraph>
              </td>
              <td>
                <Paragraph variant="small" bold={false}>
                  {row.maintenance}
                </Paragraph>
              </td>
              <td>
                <Paragraph variant="small" bold={false}>
                  {row.drainage}
                </Paragraph>
              </td>
              <td className={styles.cost} bold={false}>
                <Paragraph variant="small">{row.cost}</Paragraph>
              </td>
              <td>
                <Paragraph variant="small" bold={false}>
                  {row.bestFor}
                </Paragraph>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
