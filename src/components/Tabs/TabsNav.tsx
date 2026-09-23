import { useEffect, useRef, useState } from 'react';
import styles from './TabsNav.module.css';
import { tabOptions, type TabOption } from './../../data';

type Props = {
  activeTab: TabOption; // set current tab
  setActiveTab: (tab: TabOption) => void; // update activeTab
  idPrefix: string;
};

export default function TabsNav({ activeTab, setActiveTab, idPrefix }: Props) {
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
        aria-label="Features"
        aria-orientation="horizontal"
      >
        {tabOptions.map((tab, index) => (
          <button
            key={tab}
            type="button"
            id={`${idPrefix}-tab-${index}`}
            ref={(el) => {
              tabNavButton.current[tab] = el;
            }}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`${idPrefix}-panel-${index}`}
            tabIndex={activeTab === tab ? 0 : -1} // Only active tab is focusable
            className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab)}
            onKeyDown={(e) => {
              let nextIndex: number;
              switch (e.key) {
                case 'ArrowRight':
                  nextIndex = (index + 1) % tabOptions.length;
                  break;
                case 'ArrowLeft':
                  nextIndex = (index - 1 + tabOptions.length) % tabOptions.length;
                  break;
                case 'Home':
                  nextIndex = 0;
                  break;
                case 'End':
                  nextIndex = tabOptions.length - 1;
                  break;
                default:
                  return;
              }

              e.preventDefault();
              tabNavButton.current[tabOptions[nextIndex]]?.focus();
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
