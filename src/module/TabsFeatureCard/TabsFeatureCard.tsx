import { useState } from 'react';
import styles from './TabsFeatureCard.module.css';
import { type TabOption } from './../../data';
import TabsNav from './../../components/Tabs/TabsNav';
import FeatureCard from './../../components/FeatureCard/FeatureCard';
import Title from './../../components/Title/Title';

export default function FeatureCardWithTabs() {
  const [activeTab, setActiveTab] = useState<TabOption>('Property purchase');

  return (
    <div className={styles.wrapper}>
      <Title />
      <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
      >
        <FeatureCard activeTab={activeTab} />
      </div>
    </div>
  );
}
