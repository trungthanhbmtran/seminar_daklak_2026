import fs from 'fs/promises';
import path from 'path';
import StatisticsClient from './StatisticsClient';

// Ensure the page is dynamically rendered so it always reads the latest file content
export const dynamic = 'force-dynamic';

export default async function StatisticsPage() {
    let initialData = [];
    let configFields = [];

    try {
        const filePath = path.join(process.cwd(), 'data', 'result.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        initialData = JSON.parse(fileContent);
    } catch (error) {
        console.error('Failed to read result.json:', error);
        initialData = [];
    }

    try {
        const configPath = path.join(process.cwd(), 'data', 'config.json');
        const configContent = await fs.readFile(configPath, 'utf-8');
        const config = JSON.parse(configContent);
        configFields = config.fields || [];
    } catch (error) {
        console.error('Failed to read config.json:', error);
        configFields = [];
    }

    return <StatisticsClient initialData={initialData} fields={configFields} />;
}
