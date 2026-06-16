import fs from 'fs/promises';
import path from 'path';
import StatisticsClient from './StatisticsClient';

// Ensure the page is dynamically rendered so it always reads the latest file content
export const dynamic = 'force-dynamic';

export default async function StatisticsPage() {
    let initialData = [];

    try {
        const filePath = path.join(process.cwd(), 'data', 'result.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        initialData = JSON.parse(fileContent);
    } catch (error) {
        console.error('Failed to read result.json:', error);
        initialData = [];
    }

    return <StatisticsClient initialData={initialData} />;
}
