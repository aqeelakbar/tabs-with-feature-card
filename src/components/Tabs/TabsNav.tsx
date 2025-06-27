import { useEffect, useRef, useState } from 'react';
import styles from './TabsNav.module.css';
import { tabOptions, type TabOption } from './../../data';

type Props = {
  activeTab: TabOption; // set current tab
  setActiveTab: (tab: TabOption) => void; // update activeTab
};

export default function TabsNav({ activeTab, setActiveTab }: Props) {
  const [fadeEnd, setFadeEnd] = useState(true); // show and hide the fade on the right

  // References to each tab button so we can measure and animate the active underline
  const tabNavButton = useRef<Record<TabOption, HTMLButtonElement | null>>({
    'Property purchase': null,
    'Early inheritance': null,
    'Stock option': null,
  });

  // Define the scrollable tab nav bar container
  const tabsNavContainer = useRef<HTMLDivElement | null>(null);

  // Position and size of the animated active tab underline
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // When the active tab changes (or on mount), update the indicator and fade visibility
  useEffect(() => {
    const container = tabsNavContainer.current;

    const updateIndicator = () => {
      const tab = tabNavButton.current[activeTab];
      if (tab && container) {
        const containerBoundary = container.getBoundingClientRect();
        const tabBoundary = tab.getBoundingClientRect();

        // Calculate how far the tab is from the left edge of the container (accounting for scroll)
        const left = tabBoundary.left - containerBoundary.left + container.scrollLeft;

        setIndicatorStyle({
          left,
          width: tab.offsetWidth,
        });
      }
    };

    const updateFade = () => {
      const tabNavBar = tabsNavContainer.current;
      if (tabNavBar) {
        // If the scroll position is near the end, we hide the fade
        const atEnd = tabNavBar.scrollLeft + tabNavBar.clientWidth >= tabNavBar.scrollWidth - 1;
        setFadeEnd(!atEnd);
      }
    };

    // Run once on mount and whenever the active tab changes
    updateIndicator();
    updateFade();

    // Recalculate if user scrolls or resizes the window
    container?.addEventListener('scroll', updateFade);
    window.addEventListener('resize', updateIndicator);

    // Clean up listeners when component unmounts or updates
    return () => {
      container?.removeEventListener('scroll', updateFade);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeTab]);

  return (
    <div className={`${styles.tabsNavBarWrapper} ${!fadeEnd ? styles.fadeEnd : ''}`}>
     <nav
        ref={tabsNavContainer}
        className={styles.tabsNavBar}
        role="tablist"
        aria-orientation="horizontal"
      >
        {tabOptions.map((tab, index) => (
          <button
            key={tab}
            id={`tab-${tab}`}
            ref={(el) => {
              tabNavButton.current[tab] = el;   
            }}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`panel-${tab}`}
            tabIndex={activeTab === tab ? 0 : -1} // Only active tab is focusable
            className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                const dir = e.key === 'ArrowRight' ? 1 : -1;
                const nextIndex = (index + dir + tabOptions.length) % tabOptions.length;
                const nextTab = tabOptions[nextIndex];
                tabNavButton.current[nextTab]?.focus(); // Move focus only
              }

              if (e.key === 'Enter' || e.key === ' ') {
                setActiveTab(tab); // Select tab with Enter/Space
              }
            }}
          >
            {tab}
          </button>
        ))}
        <span className={styles.activeIndicator} style={indicatorStyle} />
      </nav>

    </div>
  );
}
