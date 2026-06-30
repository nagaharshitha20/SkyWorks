export interface Product {
    id: string;
    name: string;
    tagline: string;
    price: string;
    imgSrc: string;
    longDescription: string;
    features: { title: string; description: string; icon?: string }[];
    specs: { key: string; value: string }[];
    highlights: { title: string; subtitle: string }[];
    inTheBox: string[];
    // Enhanced shop fields
    category: 'Delivery' | 'Surveillance' | 'Agriculture' | 'Mapping';
    rating: number;
    reviewCount: number;
    shortSpecs: { icon: string; label: string; value: string }[];
}

export const products: Product[] = [
    {
        id: 'x1',
        name: 'SkyVision X1',
        tagline: 'High payload autonomous logistics. Engineered to carry more, further.',
        price: 'Contact for Pricing',
        imgSrc: 'https://images.unsplash.com/photo-1521405924368-64c5b84bec60?q=80&w=1770&auto=format&fit=crop',
        category: 'Delivery',
        rating: 4.8,
        reviewCount: 124,
        shortSpecs: [
            { icon: 'cube-outline', label: 'Payload', value: '10 kg' },
            { icon: 'time-outline', label: 'Flight', value: '55 min' },
            { icon: 'wifi-outline', label: 'Range', value: '20 km' },
        ],
        longDescription: 'The SkyVision X1 is the ultimate high-payload enterprise platform. Built for heavy-lifting logistics and industrial cargo transport, it operates fully autonomously in challenging weather conditions, ensuring mission-critical deliveries are handled with unmatched reliability.',
        highlights: [
            { title: '10 kg', subtitle: 'Max Payload' },
            { title: '55-Min', subtitle: 'Flight Time' },
            { title: 'IP65', subtitle: 'Weather-Resistant' },
            { title: '20 km', subtitle: 'Control Range' }
        ],
        features: [
            { title: 'Heavy Payload Capacity', description: 'Engineered to comfortably lift and transport heavy medical supplies or cargo.', icon: 'cube' },
            { title: 'Weather-Resistant Hull', description: 'IP65 rated carbon-composite chassis designed for extreme rain and high winds.', icon: 'rainy' },
            { title: 'Redundant Power Systems', description: 'Dual smart-battery fail-safes guarantee a safe return home.', icon: 'battery-charging' },
            { title: 'AI-Driven Navigation', description: 'SkyOS core processes real-time obstacle avoidance in dynamic environments.', icon: 'hardware-chip' }
        ],
        specs: [
            { key: 'Weight', value: '4.5 kg' },
            { key: 'Max Payload', value: '10 kg' },
            { key: 'Max Flight Time', value: '55 minutes' },
            { key: 'Max Speed', value: '65 km/h' },
            { key: 'Flight Controller', value: 'SkyOS AI-Driven Core' },
            { key: 'Control Range', value: '20 km' },
        ],
        inTheBox: ['SkyVision X1 Aircraft', 'Enterprise Controller Pro', 'Industrial Flight Battery (x4)', 'High-Speed Charging Station', 'Carbon Propellers (3 pairs)', 'Standard Cargo Winch', 'Reinforced Transport Case']
    },
    {
        id: 's1',
        name: 'SkyVision S1',
        tagline: 'Long-endurance situational awareness. Thermal imaging standard.',
        price: 'Contact for Pricing',
        imgSrc: 'https://images.unsplash.com/photo-1508614589041-895b68904561?q=80&w=1770&auto=format&fit=crop',
        category: 'Surveillance',
        rating: 4.9,
        reviewCount: 87,
        shortSpecs: [
            { icon: 'camera-outline', label: 'Camera', value: '4K Thermal' },
            { icon: 'time-outline', label: 'Flight', value: '48 min' },
            { icon: 'wifi-outline', label: 'Range', value: '15 km' },
        ],
        longDescription: 'The SkyVision S1 redefines persistent aerial surveillance. Featuring standard military-grade thermal imaging and rapid deployment mechanisms, it provides first responders and security agencies with an immediate, high-definition eye in the sky. It stays airborne longer, so you can see more.',
        highlights: [
            { title: '4K Thermal', subtitle: 'Dual-Sensor Gimbal' },
            { title: '48-Min', subtitle: 'Flight Time' },
            { title: '32x', subtitle: 'Digital Zoom' },
            { title: 'ActiveTrack', subtitle: 'AI Identification' }
        ],
        features: [
            { title: 'Dual-Sensor Gimbal', description: 'Simultaneous 4K optical feed paired with a radiometric thermal sensor.', icon: 'camera' },
            { title: 'Silent Propulsion Network', description: 'Custom-pitched rotors dramatically reduce acoustic footprint for undetected observation.', icon: 'volume-off' },
            { title: 'AI Subject Tracking', description: 'Automatically identify and track vehicles or individuals at long ranges.', icon: 'scan-circle' },
            { title: 'Rapid Deployment', description: 'Ready to fly in under 60 seconds from case to airborne.', icon: 'flash' }
        ],
        specs: [
            { key: 'Weight', value: '1.2 kg' },
            { key: 'Max Flight Time', value: '48 minutes' },
            { key: 'Max Speed', value: '72 km/h' },
            { key: 'Camera Sensor', value: '48MP Optical / 640x512 Thermal' },
            { key: 'Zoom Capability', value: '32x Digital / 8x Optical' },
            { key: 'Control Range', value: '15 km' },
        ],
        inTheBox: ['SkyVision S1 Aircraft', 'Tactical Controller V2', 'Long-Endurance Battery (x3)', 'Multi-Bay Charger', 'Low-Noise Propellers (2 pairs)', 'Military-Grade Transport Case']
    },
    {
        id: 'a1',
        name: 'SkyVision A1',
        tagline: 'Precision crop monitoring & spraying. Save resources, boost yield.',
        price: 'Contact for Pricing',
        imgSrc: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=1770&auto=format&fit=crop',
        category: 'Agriculture',
        rating: 4.7,
        reviewCount: 63,
        shortSpecs: [
            { icon: 'water-outline', label: 'Tank', value: '15 L' },
            { icon: 'time-outline', label: 'Flight', value: '30 min' },
            { icon: 'resize-outline', label: 'Spray', value: '6 m wide' },
        ],
        longDescription: 'Designed ground-up for the modern agricultural revolution, the SkyVision A1 utilizes advanced multispectral sensors and automated dispersion systems to map crop health with millimeter accuracy. Increase crop yield, minimize pesticide waste, and gain total control over your farmland.',
        highlights: [
            { title: '15 Liters', subtitle: 'Tank Capacity' },
            { title: '6 Meters', subtitle: 'Spray Width' },
            { title: 'NDVI', subtitle: 'Multispectral Array' },
            { title: 'Swarm Control', subtitle: '5 Units Per Station' }
        ],
        features: [
            { title: 'Multispectral Imaging Array', description: 'Calculates NDVI metrics to instantly identify crop stress and hydration levels.', icon: 'leaf' },
            { title: 'Automated Spraying System', description: 'Intelligently disperses liquid fertilizers matching exact terrain topologies.', icon: 'water' },
            { title: 'Swarm Capabilities', description: 'Coordinate up to 5 A1 units simultaneously from a single ground station.', icon: 'git-network' },
            { title: 'Omni Radar Avoider', description: 'Spherical radar ensures safe flight over complex, uneven agricultural environments.', icon: 'radio' }
        ],
        specs: [
            { key: 'Weight (Empty)', value: '3.8 kg' },
            { key: 'Tank Capacity', value: '15 Liters' },
            { key: 'Max Flight Time', value: '30 minutes (fully loaded)' },
            { key: 'Spray Width', value: 'Up to 6 meters' },
            { key: 'Obstacle Avoidance', value: 'Omnidirectional Spherical Radar' },
            { key: 'Control Range', value: '8 km' },
        ],
        inTheBox: ['SkyVision A1 Aircraft', 'Agri-Command Tablet', 'Quick-Swap Agronomy Battery (x4)', 'Dispersion Nozzle Set', 'Base Station RTK Antenna', 'Rugged Carrying Case']
    },
    {
        id: 'm1',
        name: 'SkyVision M1',
        tagline: 'High-accuracy topographic mapping for surveying professionals.',
        price: 'Contact for Pricing',
        imgSrc: 'https://images.unsplash.com/photo-1524143986875-3b098d78b363?q=80&w=1770&auto=format&fit=crop',
        category: 'Mapping',
        rating: 4.6,
        reviewCount: 41,
        shortSpecs: [
            { icon: 'map-outline', label: 'Accuracy', value: '2 cm' },
            { icon: 'time-outline', label: 'Flight', value: '42 min' },
            { icon: 'wifi-outline', label: 'Range', value: '12 km' },
        ],
        longDescription: 'The SkyVision M1 is a dedicated surveying and mapping platform equipped with a centimeter-accurate RTK GNSS module and a high-resolution photogrammetry camera. Generate precise 3D terrain models, orthophotos, and topographic maps in a single automated flight.',
        highlights: [
            { title: '2 cm', subtitle: 'RTK Accuracy' },
            { title: '42-Min', subtitle: 'Flight Time' },
            { title: '42 MP', subtitle: 'Camera Sensor' },
            { title: '3D Models', subtitle: 'Point Cloud Output' }
        ],
        features: [
            { title: 'RTK GNSS Module', description: 'Centimeter-level positional accuracy for survey-grade deliverables.', icon: 'locate' },
            { title: '42MP Photogrammetry Cam', description: 'Full-frame sensor captures ultra-high detail at low altitudes.', icon: 'camera' },
            { title: 'Automated Mission Planning', description: 'Import shapefiles and generate flight grids with a single click.', icon: 'map' },
            { title: 'LiDAR Ready', description: 'Optional LiDAR payload for dense vegetation and urban canyon surveys.', icon: 'pulse' }
        ],
        specs: [
            { key: 'Weight', value: '2.1 kg' },
            { key: 'Max Flight Time', value: '42 minutes' },
            { key: 'Max Speed', value: '58 km/h' },
            { key: 'Camera', value: '42MP Full-Frame' },
            { key: 'RTK Accuracy', value: '±2 cm horizontal' },
            { key: 'Control Range', value: '12 km' },
        ],
        inTheBox: ['SkyVision M1 Aircraft', 'RTK Ground Station', 'Survey Battery (x3)', 'Multi-Bay Charger', 'GCP Targets (x10)', 'Precision Transport Case']
    },
];