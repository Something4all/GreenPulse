import { Nudge } from '../types';

export const dailyNudges: Nudge[] = [
  {
    id: 'nudge-1',
    category: 'commute',
    title: 'Rethink the short ride',
    nudgeText: 'Swap a vehicle trip of under 2 miles with a brisk walk, run, or bicycle session.',
    co2Savings: 1.6, // kg CO2
    coBenefit: {
      type: 'health',
      icon: 'Heart',
      metric: '180 kcal',
      text: 'Burn calories, boost cardiovascular fitness, and clear your head.'
    },
    intensity: 'medium'
  },
  {
    id: 'nudge-2',
    category: 'diet',
    title: 'Savor a vibrant plant-based meal',
    nudgeText: 'Swap out red meat or cheese in your lunch today for a delicious, fiber-rich plant protein bowl (chickpeas, lentils, avocado).',
    co2Savings: 2.4,
    coBenefit: {
      type: 'money',
      icon: 'DollarSign',
      metric: '$5.50 saved',
      text: 'Plant-based proteins are substantially cheaper per portion than beef.'
    },
    intensity: 'easy'
  },
  {
    id: 'nudge-3',
    category: 'home',
    title: 'The cold comfort routine',
    nudgeText: 'Wash today’s laundry cycle with cold water (30°C or tap cold) instead of hot.',
    co2Savings: 0.8,
    coBenefit: {
      type: 'time',
      icon: 'Clock',
      metric: '0 laundry shrinkages',
      text: 'Cold water prevents fabrics from fading or shrinking, extending clothing life.'
    },
    intensity: 'easy'
  },
  {
    id: 'nudge-4',
    category: 'shopping',
    title: 'Consolidate deliveries',
    nudgeText: 'Keep items in an online shopping cart until you can ship everything together, rather than relying on instant single-package shipments.',
    co2Savings: 1.3,
    coBenefit: {
      type: 'money',
      icon: 'DollarSign',
      metric: '$4.99 avoided',
      text: 'Saves extra courier handoffs and multi-package surcharge fees.'
    },
    intensity: 'easy'
  },
  {
    id: 'nudge-5',
    category: 'travel',
    title: 'Unwind on a green trail',
    nudgeText: 'Take a brief 15-minute breather or run on a local park trail instead of on an indoor gym treadmill.',
    co2Savings: 0.5,
    coBenefit: {
      type: 'mindfulness',
      icon: 'Compass',
      metric: '21% cortisol drop',
      text: 'Direct contact with green spaces is clinically proven to reduce stress hormones.'
    },
    intensity: 'easy'
  },
  {
    id: 'nudge-6',
    category: 'diet',
    title: 'Love your leftovers',
    nudgeText: 'Repurpose leftover food items in your fridge into a creative lunch wrap instead of ordering takeout.',
    co2Savings: 1.9,
    coBenefit: {
      type: 'money',
      icon: 'DollarSign',
      metric: '$18.50 saved',
      text: 'Avoid standard app delivery service charges, tips, and high restaurant markups.'
    },
    intensity: 'easy'
  },
  {
    id: 'nudge-7',
    category: 'home',
    title: 'Vanquish the vampires',
    nudgeText: 'Completely shut down and unplug standby chargers, gaming rigs, or external desktop monitors before going to sleep.',
    co2Savings: 0.6,
    coBenefit: {
      type: 'money',
      icon: 'DollarSign',
      metric: '$3.50/mo saved',
      text: 'Stops "vampire power draw" which accounts for up to 10% of standard home utility bills.'
    },
    intensity: 'medium'
  },
  {
    id: 'nudge-8',
    category: 'commute',
    title: 'Public transit focus session',
    nudgeText: 'Board a train or bus for your commute today. Use this hands-free time to dive into a book, study, or enjoy a podcast completely stress-free.',
    co2Savings: 3.5,
    coBenefit: {
      type: 'time',
      icon: 'Clock',
      metric: '45 mins reclaimed',
      text: 'Reclaim minutes normally wasted gripping a steering wheel in frustrating stop-and-go traffic.'
    },
    intensity: 'hard'
  },
  {
    id: 'nudge-9',
    category: 'shopping',
    title: 'Deploy the 48-hour shopping pause',
    nudgeText: 'Before clicking Buy, enforce a strict 48-hour cool-down on non-essential purchases.',
    co2Savings: 4.8,
    coBenefit: {
      type: 'money',
      icon: 'DollarSign',
      metric: '$45.00 average',
      text: 'Saves you from emotional impulse shopping. About 65% of paused carts are never completed.'
    },
    intensity: 'medium'
  },
  {
    id: 'nudge-10',
    category: 'diet',
    title: 'The mug companion',
    nudgeText: 'Bring a reusable thermos flask for your hot drinks or brew your coffee right at home today.',
    co2Savings: 0.3,
    coBenefit: {
      type: 'time',
      icon: 'Clock',
      metric: '12 mins saved',
      text: 'Avoid long boutique coffee lines and skip single-use cup cardboard waistages.'
    },
    intensity: 'easy'
  }
];
