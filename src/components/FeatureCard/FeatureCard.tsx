import styles from './FeatureCard.module.css';
import { tabData, type TabOption } from '../../data';

type Props = {
  activeTab: TabOption;
};

export default function FeatureCard({ activeTab }: Props) {
  const { title, description, image, alt } = tabData[activeTab];

  return (
    <div className={styles.card}>
      <div className={styles.textBlock}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.imageWrapper}>
        <img src={image} alt={alt} className={styles.image} />
      </div>
    </div>
  );
}