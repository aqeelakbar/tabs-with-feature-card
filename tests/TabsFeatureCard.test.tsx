import { afterEach, expect, test } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FeatureCardWithTabs from '../src/module/TabsFeatureCard/TabsFeatureCard';

afterEach(cleanup);

test('each tab controls a persistent panel and only the selected panel is visible', async () => {
  const user = userEvent.setup();
  render(<FeatureCardWithTabs />);

  const tabs = screen.getAllByRole('tab');
  const panels = screen.getAllByRole('tabpanel', { hidden: true });
  expect(screen.getByRole('tablist').getAttribute('aria-label')).toBe('Features');
  expect(panels).toHaveLength(tabs.length);

  for (const tab of tabs) {
    const panel = document.getElementById(tab.getAttribute('aria-controls')!);
    expect(panel).not.toBeNull();
    expect(panel?.getAttribute('aria-labelledby')).toBe(tab.id);
  }

  expect(tabs[0].getAttribute('aria-selected')).toBe('true');
  expect(screen.getByRole('tabpanel').id).toBe(tabs[0].getAttribute('aria-controls'));
  await user.click(tabs[2]);
  expect(tabs[2].getAttribute('aria-selected')).toBe('true');
  expect(tabs[0].getAttribute('tabindex')).toBe('-1');
  expect(screen.getByRole('tabpanel').id).toBe(tabs[2].getAttribute('aria-controls'));
  expect(panels[0].hidden).toBe(true);
});

test('arrow, Home and End keys move focus without selecting or scrolling', async () => {
  const user = userEvent.setup();
  render(<FeatureCardWithTabs />);
  const tabs = screen.getAllByRole('tab');
  tabs[0].focus();

  const arrow = fireEvent.keyDown(tabs[0], { key: 'ArrowRight', cancelable: true });
  expect(arrow).toBe(false);
  expect(document.activeElement).toBe(tabs[1]);
  expect(tabs[0].getAttribute('aria-selected')).toBe('true');

  await user.keyboard('{End}');
  expect(document.activeElement).toBe(tabs[2]);
  await user.keyboard('{ArrowRight}');
  expect(document.activeElement).toBe(tabs[0]);
  await user.keyboard('{ArrowLeft}');
  expect(document.activeElement).toBe(tabs[2]);
  await user.keyboard('{Home}');
  expect(document.activeElement).toBe(tabs[0]);
});

test('Enter and Space activate a focused tab', async () => {
  const user = userEvent.setup();
  render(<FeatureCardWithTabs />);
  const tabs = screen.getAllByRole('tab');
  tabs[0].focus();

  await user.keyboard('{ArrowRight}{Enter}');
  expect(tabs[1].getAttribute('aria-selected')).toBe('true');
  expect(screen.getByRole('tabpanel').getAttribute('aria-labelledby')).toBe(tabs[1].id);

  await user.keyboard('{ArrowRight} ');
  expect(tabs[2].getAttribute('aria-selected')).toBe('true');
  expect(screen.getByRole('tabpanel').getAttribute('aria-labelledby')).toBe(tabs[2].id);
});
