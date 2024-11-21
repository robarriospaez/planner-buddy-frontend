import Image from "next/image";
import styles from "../styles/Group.module.css";

interface GroupProps {
  name: string;
  imageUrl: string;
}

const Group: React.FC<GroupProps> = ({ name, imageUrl }) => {
  return (
    <div className={styles.group}>
      <Image
        src={imageUrl}
        alt={name}
        width={300}
        height={200}
        className={styles.groupImg}
      />
      <h2 className={styles.groupName}>{name}</h2>
    </div>
  );
};

export default Group;
