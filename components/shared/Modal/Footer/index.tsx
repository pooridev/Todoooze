import styles from "./Footer.module.css";

interface Props {
  onSubmit: () => void;
  dismissLabel?: string;
  submitLabel?: string;
  toggle: (state: boolean) => void;
}

const Footer = ({ toggle, onSubmit, dismissLabel, submitLabel }: Props) => {
  const onClose = () => toggle(false);

  return (
    <footer className={styles.Footer}>
      <button onClick={onClose} className={styles.CancelButton}>
        {dismissLabel || "Cancel"}
      </button>
      <button type="submit" onClick={onSubmit} className={styles.SubmitButton}>
        {submitLabel || "Save"}
      </button>
    </footer>
  );
};

export default Footer;
