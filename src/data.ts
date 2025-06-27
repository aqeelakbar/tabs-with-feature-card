export type TabOption = 'Property purchase' | 'Early inheritance' | 'Stock option';

interface TabContent {
  title: string;
  description: string;
  image: string;
  alt: string;
}

export const tabOptions: TabOption[] = [
  'Property purchase',
  'Early inheritance',
  'Stock option',
];

export const tabData: Record<TabOption, TabContent> = {
  'Property purchase': {
    title: 'Buy your dream property',
    description: 'Easily finance your next property with our flexible mortgage solutions. Transparent terms and fast approval.',
    image: 'https://media.istockphoto.com/id/1412643214/photo/sunset-view-luxury-tropical-pool-villa.jpg?s=612x612&w=0&k=20&c=sKno2OitWRMjXdwnXD86_Jg0xOnTjk5zUFiG8YBKRXk=',
    alt: 'Modern house with garden and sunset background',
  },
  'Early inheritance': {
    title: 'Pass on wealth early',
    description: 'Support your loved ones when it matters most. Our early inheritance planning helps you make a difference now.',
    image: 'https://previews.123rf.com/images/parinyabinsuk/parinyabinsuk1501/parinyabinsuk150100095/35174443-young-girl-hand-touch-her-grandma-hand.jpg',
    alt: 'Elderly person holding hands with a younger family member',
  },
  'Stock option': {
    title: 'Manage your stock options',
    description: 'Optimise your investments. We help you unlock the full potential of your employee stock options.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTvgPuCg91pgmHWJOjHcarcUl2CwGYvFHT5Q&s',
    alt: 'Graph showing rising stock market trends on a digital screen',
  },
};