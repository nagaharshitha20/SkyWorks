export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  category: string;
  items: FaqItem[];
}

export const faqData: FaqCategory[] = [
  {
    category: 'General',
    items: [
      {
        question: 'What is the warranty on Skyvision drones?',
        answer: 'All Skyvision drones come with a standard 12-month manufacturer\'s warranty covering any defects in materials or workmanship. Extended warranty options are also available for purchase.',
      },
      {
        question: 'Do I need a license to fly a Skyvision drone?',
        answer: 'Regulations vary by country and the weight of the drone. For drones like the SkyVision Mini (under 250g), registration may not be required for recreational use in some regions. However, for professional models and commercial use, a license is typically required. We strongly advise checking with your local aviation authority.',
      },
       {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for unopened products purchased directly from our website. If the product is defective, please contact our support team to arrange for a repair or replacement under warranty.',
      },
    ],
  },
  {
    category: 'Products & Technology',
    items: [
      {
        question: 'What is the maximum flight range of the SkyVision Pro?',
        answer: 'The SkyVision Pro, equipped with SkyLink™ 3.0, has a maximum transmission range of up to 10km (6.2 miles) in an unobstructed environment free of interference.',
      },
      {
        question: 'Are the batteries interchangeable between different models?',
        answer: 'No, each drone model has a specifically designed Intelligent Flight Battery. Using a battery from a different model is not supported and may cause damage to the aircraft.',
      },
       {
        question: 'What software is compatible with the SkyVision Campus SDK?',
        answer: 'The SkyVision Campus drone supports our open-source SDK, which is compatible with Python, C++, and ROS (Robot Operating System). This allows for extensive customization for research and educational purposes.',
      },
    ],
  },
];