import { useId, useState } from 'react';
import styles from './TabsFeatureCard.module.css';
import { tabOptions, type TabOption } from './../../data';
import TabsNav from './../../components/Tabs/TabsNav';
import FeatureCard from './../../components/FeatureCard/FeatureCard';
import Title from './../../components/Title/Title';

export default function FeatureCardWithTabs() {
  const [activeTab, setActiveTab] = useState<TabOption>('Property purchase');
  const idPrefix = useId();

  return (
    <div className={styles.wrapper}>
      <Title />
      <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} idPrefix={idPrefix} />

      {tabOptions.map((tab, index) => (
        <div
          key={tab}
          role="tabpanel"
          id={`${idPrefix}-panel-${index}`}
          aria-labelledby={`${idPrefix}-tab-${index}`}
          tabIndex={0}
          hidden={activeTab !== tab}
        >
          <FeatureCard activeTab={tab} />
        </div>
      ))}
    </div>
  );
}
