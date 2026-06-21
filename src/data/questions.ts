import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'commute',
    category: 'commute',
    title: 'How do you usually get to school, work, or run errands?',
    iconName: 'Car',
    description: 'Transportation represents one of the largest direct shares of individual carbon output.',
    options: [
      {
        text: 'Solo in a medium/large standard car (gas/diesel)',
        value: 4.6,
        explanation: 'Mainly driving single-occupancy standard vehicles. Produces roughly 4.6 metric tons of CO2e per year based on average annual travel.'
      },
      {
        text: 'Solo in a compact hatchback, hybrid, or electric car',
        value: 2.1,
        explanation: 'Higher vehicle efficiency or electrified power train reduces emissions to about 2.1 metric tons of CO2e per year.'
      },
      {
        text: 'Riding public transit (buses, subways, regional trains)',
        value: 0.6,
        explanation: 'Highly sharing transit spaces drives emissions down to just 0.6 metric tons of CO2e per year.'
      },
      {
        text: 'Active transit (walking, bicycling, or fully remote work)',
        value: 0.05,
        explanation: 'Powering travel with your own feet or avoiding travel altogether is virtually carbon-free at 0.05 metric tons of CO2e per year.'
      }
    ]
  },
  {
    id: 'diet',
    category: 'diet',
    title: 'Which plate best describes your typical weekly meals?',
    iconName: 'Utensils',
    description: 'Agricultural emissions depend significantly on feed requirements and global supply transit lines.',
    options: [
      {
        text: 'Meat Enthusiast (beef, lamb, or pork in most meals)',
        value: 2.9,
        explanation: 'Heavy-meat diets require high feed-to-food conversions and produce methane, totaling about 2.9 metric tons of CO2e per year.'
      },
      {
        text: 'Balanced Plate (mostly chicken, fish, eggs, some red meat)',
        value: 1.7,
        explanation: 'Choosing lower-impact proteins and seafood yields a moderate diet footprint of about 1.7 metric tons of CO2e per year.'
      },
      {
        text: 'Vegetarian (eggs, dairy, vegetables, but strictly no meat)',
        value: 1.1,
        explanation: 'Avoiding animal meat reduces your meal-related footprint to about 1.1 metric tons of CO2e per year.'
      },
      {
        text: 'Vegan (100% plant-based food and milk alternatives)',
        value: 0.7,
        explanation: 'Sourcing all food directly from crops produces the lowest diet footprint: just 0.7 metric tons of CO2e per year.'
      }
    ]
  },
  {
    id: 'home',
    category: 'home',
    title: 'What is the primary energy profile of your living space?',
    iconName: 'Home',
    description: 'HVAC systems and grid electricity generation fuels make up your direct household thermal footprint.',
    options: [
      {
        text: 'House with standard grid power & natural gas/oil heating',
        value: 4.1,
        explanation: 'Large heated spaces utilizing fossil-gas boilers and fossil-heavy grid power. Average footprint is roughly 4.1 metric tons of CO2e per year.'
      },
      {
        text: 'Apartment/Condo with standard grid power and heating',
        value: 2.3,
        explanation: 'Shared structural apartment walls naturally conserve thermal energy, resulting in roughly 2.3 metric tons of CO2e per year.'
      },
      {
        text: 'Partially powered by clean heat-pumps, solar, or green contract',
        value: 1.2,
        explanation: 'Offsetting space-heating or grid electric with modern renewable energy decreases this to about 1.2 metric tons of CO2e per year.'
      },
      {
        text: '100% Net-Zero Home (full solar array, battery, premium insulation)',
        value: 0.2,
        explanation: 'Self-sufficient smart homes generate almost zero net operating emissions, clocking in at only 0.2 metric tons of CO2e per year.'
      }
    ]
  },
  {
    id: 'shopping',
    category: 'shopping',
    title: 'How would you describe your general retail shopping habit?',
    iconName: 'ShoppingBag',
    description: 'Manufacturing, printing, garment processing, and distribution pipelines contain significant embedded carbon.',
    options: [
      {
        text: 'Active Consumer (regular online shopping, fast fashion, new tech upgrades)',
        value: 3.1,
        explanation: 'Frequent brand-new item delivery, packaging, and high manufacturing volume. Adds roughly 3.1 metric tons of CO2e per year.'
      },
      {
        text: 'Mindful Shopper (buy things only when worn out, select quality items)',
        value: 1.4,
        explanation: 'Replacing clothes and tech on longer lifecycles lowers embedded carbon to about 1.4 metric tons of CO2e per year.'
      },
      {
        text: 'Minimalist / Second-Hand fan (vintage shops, repairs, low consumption)',
        value: 0.4,
        explanation: 'Extending single-item lifespans and buying pre-loved items results in highly optimized levels of only 0.4 metric tons of CO2e per year.'
      }
    ]
  },
  {
    id: 'travel',
    category: 'travel',
    title: 'How frequently do you board short or long-haul flights?',
    iconName: 'Plane',
    description: 'High-altitude jet emissions produce a concentrated radiative forcing effect in the upper atmosphere.',
    options: [
      {
        text: 'Jetsetter (several long flights or regular work trips, 5+ flights yearly)',
        value: 5.6,
        explanation: 'Frequent aviation creates intense emissions, yielding approximately 5.6 metric tons of CO2e per year.'
      },
      {
        text: 'Average Traveler (typically 2 to 4 flights per year)',
        value: 2.2,
        explanation: 'Annual vacation or family visits by plane generate about 2.2 metric tons of CO2e per year.'
      },
      {
        text: 'Occasional Flyer (only 1 flight per year or regional domestic flyer)',
        value: 0.8,
        explanation: 'Using flying rarely keeps your flight footprint down to about 0.8 metric tons of CO2e per year.'
      },
      {
        text: 'Staycationer (rarely or never fly, take trains or locally drive instead)',
        value: 0.05,
        explanation: 'Avoiding air travel altogether removes this footprint almost completely, leaving just 0.05 metric tons of CO2e per year.'
      }
    ]
  }
];
