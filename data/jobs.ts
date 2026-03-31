export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
}

export const jobs: Job[] = [
    {
        id: 'robotics-engineer',
        title: 'Senior Robotics Engineer',
        department: 'Engineering',
        location: 'Aero Valley, CA (On-site)',
        description: 'As a Senior Robotics Engineer, you will be at the forefront of developing our next-generation autonomous flight systems. You will work on everything from perception and sensor fusion to motion planning and control algorithms.',
        responsibilities: [
            'Design and implement advanced algorithms for drone autonomy.',
            'Develop and test software in simulation and on real hardware.',
            'Collaborate with hardware teams to integrate new sensors and actuators.',
            'Mentor junior engineers and contribute to our engineering culture.',
        ],
        qualifications: [
            '5+ years of experience in robotics, with a focus on autonomous systems.',
            'Proficiency in C++ and Python.',
            'Strong background in computer vision, SLAM, and motion planning.',
            'Experience with ROS or similar robotics middleware.',
            'M.S. or Ph.D. in Computer Science, Robotics, or a related field.',
        ],
    },
    {
        id: 'embedded-developer',
        title: 'Embedded Systems Developer',
        department: 'Engineering',
        location: 'Aero Valley, CA (On-site)',
        description: 'You will be responsible for developing the low-level software that powers our drones. This includes writing firmware, optimizing performance, and ensuring the reliability of our embedded systems.',
        responsibilities: [
            'Write, test, and debug firmware for microcontrollers.',
            'Develop board support packages (BSPs) and device drivers.',
            'Work on real-time operating systems (RTOS).',
            'Optimize code for performance and power consumption.',
        ],
        qualifications: [
            '3+ years of experience in embedded systems development.',
            'Expertise in C/C++ for embedded systems.',
            'Experience with ARM Cortex-M microcontrollers.',
            'Familiarity with communication protocols like SPI, I2C, and UART.',
            'B.S. in Electrical Engineering, Computer Engineering, or related field.',
        ],
    },
    {
        id: 'product-designer',
        title: 'Lead Product Designer (UX/UI)',
        department: 'Design',
        location: 'Aero Valley, CA (Hybrid)',
        description: 'We are looking for a creative and experienced Lead Product Designer to shape the user experience of our ground control software and mobile applications. You will translate complex user needs into intuitive and beautiful interfaces.',
        responsibilities: [
            'Lead the design process from concept to final hand-off to engineering.',
            'Create wireframes, prototypes, and high-fidelity mockups.',
            'Conduct user research and usability testing.',
            'Maintain and evolve our design system.',
        ],
        qualifications: [
            '7+ years of product design experience.',
            'A strong portfolio showcasing your work on complex applications.',
            'Expertise in Figma, Sketch, or similar design tools.',
            'Experience designing for both desktop and mobile platforms.',
            'Excellent communication and collaboration skills.',
        ],
    },
];
