import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'data', 'config.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
        console.error('Error reading config:', error);
        return NextResponse.json({ error: 'Failed to read config' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const dataDir = path.join(process.cwd(), 'data');
        const filePath = path.join(dataDir, 'config.json');

        // Ensure data directory exists
        try {
            await fs.access(dataDir);
        } catch {
            await fs.mkdir(dataDir, { recursive: true });
        }

        // Write back to file
        await fs.writeFile(filePath, JSON.stringify(body, null, 2), 'utf-8');

        return NextResponse.json({ success: true, data: body }, { status: 200 });
    } catch (error) {
        console.error('Error saving config:', error);
        return NextResponse.json({ error: 'Failed to save config' }, { status: 500 });
    }
}
