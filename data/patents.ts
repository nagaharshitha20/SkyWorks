export interface Patent {
  id: string;
  patentNumber: string;
  title: string;
  filed: string;
  description: string;
}

export const patentList: Patent[] = [
    {
        id: 'p001',
        patentNumber: 'US 11,234,567 B2',
        title: 'Predictive Battery Health Monitoring System for Unmanned Aerial Vehicles',
        filed: 'Jan 15, 2022',
        description: 'An AI-driven system that analyzes battery telemetry in real-time to predict remaining flight time with greater accuracy and provide early warnings for cell degradation.'
    },
    {
        id: 'p002',
        patentNumber: 'US 10,987,654 B1',
        title: 'Collision Avoidance System Using Fused Sensor Data from Vision and LiDAR',
        filed: 'Mar 22, 2021',
        description: 'A novel sensor fusion algorithm for our Aegis™ obstacle avoidance system that combines visual camera data with LiDAR point clouds for robust performance in complex environments.'
    },
    {
        id: 'p003',
        patentNumber: 'US 10,543,210 B2',
        title: 'Aerodynamic Folding Mechanism for Compact Drone Storage and Transport',
        filed: 'Jun 05, 2020',
        description: 'The unique folding arm design used in the SkyVision Mini series that ensures structural rigidity during flight while allowing for an ultra-compact form factor when stored.'
    }
];