import styles from "../NewPPCForm.module.css";

function FormWrapper({ children }) {
  return (
    <div className={styles.formCard}>
      {children}
    </div>
  );
}

export default FormWrapper;
