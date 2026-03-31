export interface Product {
    id: string;
    name: string;
    tagline: string;
    price: string;
    imgSrc: string;
    longDescription: string;
    features: { title: string; description: string }[];
    specs: { key: string; value: string }[];
    inTheBox: string[];
}

export const products: Product[] = [
    {
        id: 'skyvision-pro',
        name: 'SkyVision Pro',
        tagline: 'The ultimate aerial platform for professionals.',
        price: '$2,499',
        imgSrc: 'https://images.unsplash.com/photo-1521405924368-64c5b84bec60?q=80&w=1770&auto=format&fit=crop',
        longDescription: 'The SkyVision Pro is the pinnacle of aerial technology, engineered for professional cinematographers and industrial inspectors. With its advanced AI-driven flight controller, robust carbon fiber construction, and modular payload system, it offers unparalleled performance and versatility.',
        features: [
            { title: '6K Gimbal Camera', description: 'Capture stunning, stabilized footage with our industry-leading camera system.'},
            { title: '45-Minute Flight Time', description: 'High-capacity intelligent battery allows for extended, complex missions.' },
            { title: '10km Control Range', description: 'SkyLink™ 3.0 technology provides a reliable, long-distance connection.'}
        ],
        specs: [
            { key: 'Weight', value: '1450 g' },
            { key: 'Max Flight Time', value: '45 minutes' },
            { key: 'Max Speed', value: '80 km/h' },
            { key: 'Camera Sensor', value: '1.5-inch CMOS, 48MP' },
            { key: 'Video Resolution', value: '6K @ 30fps' },
            { key: 'Control Range', value: '10 km' },
        ],
        inTheBox: ['SkyVision Pro Aircraft', 'Smart Controller', 'Intelligent Flight Battery (x2)', 'Fast Charger Hub', 'Propellers (3 pairs)', 'Gimbal Protector', 'Hard Shell Carrying Case']
    },
    {
        id: 'skyvision-mini',
        name: 'SkyVision Mini',
        tagline: 'Compact powerhouse for creators on the go.',
        price: '$899',
        imgSrc: 'https://images.unsplash.com/photo-1621257412491-383271887556?q=80&w=1770&auto=format&fit=crop',
        longDescription: 'The SkyVision Mini packs professional-grade features into a foldable, ultra-portable frame. It\'s the perfect companion for travel filmmakers, content creators, and hobbyists who demand quality without compromise. Capture your world from a new perspective.',
        features: [
            { title: '4K HDR Video', description: 'Shoot vibrant, true-to-life video in any lighting condition.'},
            { title: '3-Axis Gimbal', description: 'Buttery-smooth footage, even in high-wind situations.' },
            { title: 'Intelligent Flight Modes', description: 'Automated shot patterns like Orbit, Follow, and Waypoint.'}
        ],
        specs: [
            { key: 'Weight', value: '249 g' },
            { key: 'Max Flight Time', value: '31 minutes' },
            { key: 'Max Speed', value: '58 km/h' },
            { key: 'Camera Sensor', value: '1/2.3-inch CMOS, 12MP' },
            { key: 'Video Resolution', value: '4K @ 60fps' },
            { key: 'Control Range', value: '6 km' },
        ],
        inTheBox: ['SkyVision Mini Aircraft', 'Remote Controller', 'Intelligent Flight Battery', 'Charger', 'Propellers (1 pair)', 'USB-C Cable', 'Gimbal Protector']
    },
    {
        id: 'skyvision-campus',
        name: 'SkyVision Campus',
        tagline: 'The definitive drone for education and research.',
        price: '$1,199',
        imgSrc: 'https://images.unsplash.com/photo-1588613254392-3a469a4597c4?q=80&w=1770&auto=format&fit=crop',
        longDescription: 'SkyVision Campus is an open-platform, programmable drone designed for STEM education, university research, and developer training. With a comprehensive SDK and modular hardware, it provides an unparalleled learning experience in robotics, computer vision, and autonomous systems.',
         features: [
            { title: 'Python & C++ SDK', description: 'Full software development kit for custom applications.'},
            { title: 'Modular Hardware Bay', description: 'Attach custom sensors, LiDAR, or companion computers.' },
            { title: 'Onboard AI Processing', description: 'Powered by an NVIDIA Jetson module for real-time inference.'}
        ],
        specs: [
            { key: 'Weight', value: '950 g' },
            { key: 'Max Flight Time', value: '25 minutes' },
            { key: 'Max Payload', value: '500 g' },
            { key: 'Onboard Computer', value: 'NVIDIA Jetson Nano' },
            { key: 'SDK Support', value: 'Python, C++, ROS' },
            { key: 'Control Range', value: '2 km (expandable)' },
        ],
        inTheBox: ['SkyVision Campus Aircraft', 'Dev Controller', 'Flight Battery (x2)', 'Dev Kit & Cables', 'Propellers (4 pairs)', 'Research Payload Mount']
    }
];