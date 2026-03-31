export interface DownloadItem {
    id: string;
    category: 'Manuals' | 'Software' | 'Firmware';
    title: string;
    version: string;
    date: string;
    fileSize: string;
}

export const downloadItems: DownloadItem[] = [
    {
        id: 'manual-pro',
        category: 'Manuals',
        title: 'SkyVision Pro User Manual',
        version: 'v2.1',
        date: 'Oct 15, 2023',
        fileSize: '25.4 MB'
    },
     {
        id: 'manual-mini',
        category: 'Manuals',
        title: 'SkyVision Mini User Manual',
        version: 'v1.5',
        date: 'Sep 01, 2023',
        fileSize: '10.2 MB'
    },
    {
        id: 'software-gcs',
        category: 'Software',
        title: 'SkyLink Ground Control Station (Windows)',
        version: 'v3.2.1',
        date: 'Nov 01, 2023',
        fileSize: '150.6 MB'
    },
    {
        id: 'software-gcs-mac',
        category: 'Software',
        title: 'SkyLink Ground Control Station (macOS)',
        version: 'v3.2.1',
        date: 'Nov 01, 2023',
        fileSize: '145.1 MB'
    },
     {
        id: 'firmware-pro',
        category: 'Firmware',
        title: 'SkyVision Pro Aircraft Firmware',
        version: 'v45.1.23',
        date: 'Oct 28, 2023',
        fileSize: '80.5 MB'
    }
];