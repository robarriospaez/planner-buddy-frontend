import Image from "next/image";
import styles from "../styles/Member.module.css";

const Member = ({ name, imageUrl }) => {
  return (
    <div className={styles.member}>
      <Image
        src={imageUrl}
        alt={name}
        width={300}
        height={200}
        className={styles.memberImg}
      />
      <h2 className={styles.memberName}>{name}</h2>
    </div>
  );
};

export default Member;
