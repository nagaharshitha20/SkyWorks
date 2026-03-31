export interface PressRelease {
  id: string;
  title: string;
  date: string;
  excerpt: string;
}

export const pressReleases: PressRelease[] = [
    {
        id: 'next-gen-launch',
        title: 'Skyvision Unveils the SkyVision Pro X, Redefining Aerial Cinematography',
        date: 'October 26, 2023',
        excerpt: 'The new flagship model features a 8K sensor, 50-minute flight time, and the next generation of our SkyCore™ Flight AI, setting a new standard for professional drone technology.'
    },
    {
        id: 'series-b-funding',
        title: 'Skyvision Secures $50 Million in Series B Funding to Accelerate Global Expansion',
        date: 'September 15, 2023',
        excerpt: 'The funding round, led by AeroVentures Capital, will be used to scale production, expand into international markets, and further research into autonomous flight systems.'
    },
    {
        id: 'public-safety-partnership',
        title: 'Skyvision Partners with National Emergency Response Teams to Provide Mission-Critical Drones',
        date: 'July 02, 2023',
        excerpt: 'Our ruggedized drones will be deployed to assist in search and rescue operations, disaster assessment, and real-time situational awareness for first responders.'
    }
];