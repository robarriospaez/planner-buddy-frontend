import Image from "next/image";
import styles from "../styles/Item.module.css";

interface iItem {
  category: string
  description: string
  imageUrl: string
}

const Item = ({ category, description, imageUrl }: iItem) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.itemCategory}>{category}</h2>
      <Image
        src = {imageUrl}
        alt = {description}
        width={150}
        height={100}
        className={styles.itemImg}
      />
      <p className={styles.itemDescription}>{description}</p>
    </div>
  );
};

export default Item;
