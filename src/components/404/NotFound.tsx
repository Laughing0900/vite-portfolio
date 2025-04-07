import styles from "./style.module.css";

const NotFound = () => {
  return (
    <div className={styles.page404}>
      <div className={styles.error404}>
        <div>4</div>
        <div>0</div>
        <div>4</div>
        <span className={styles.image}>
          <img
            className={styles.img}
            src="images/notFound.webp"
            alt="character"
          />
        </span>
      </div>
      <div className={styles.contentContainer}>
        <div
          className={styles.bubbles}
          style={{
            top: 0,
            left: "60px",
          }}
        >
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
        <div
          className={styles.bubbles}
          style={{
            top: "50px",
            right: "10%",
          }}
        >
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
        <div className={styles.title}>
          The page you are looking for can&#39;t be found. :(
        </div>
      </div>
    </div>
  );
};

export default NotFound;
