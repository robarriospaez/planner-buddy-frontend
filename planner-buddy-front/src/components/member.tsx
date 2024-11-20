import Image from "next/image";
import styles from "../styles/Member.module.css";

interface MemberProps {
  name: string;
  imageUrl: string;
}

const Member: React.FC<MemberProps> = ({ name, imageUrl }) => {
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