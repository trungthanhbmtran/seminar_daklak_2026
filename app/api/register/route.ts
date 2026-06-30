import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("RECEIVED REGISTRATION:", body);
        
        const dataDir = path.join(process.cwd(), 'data');
        const filePath = path.join(dataDir, 'result.json');

        // Ensure data directory exists
        try {
            await fs.access(dataDir);
        } catch {
            await fs.mkdir(dataDir, { recursive: true });
        }

        let existingData: Record<string, unknown>[] = [];
        
        // Read existing data if file exists
        try {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            existingData = JSON.parse(fileContent);
        } catch {
            // File doesn't exist or is invalid JSON, start with empty array
            existingData = [];
        }

        // Add new registration with timestamp
        const newRegistration = {
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            ...body
        };

        existingData.push(newRegistration);

        // Write back to file
        await fs.writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf-8');

        return NextResponse.json({ success: true, data: newRegistration }, { status: 200 });
    } catch (error) {
        console.error('Error saving registration:', error);
        return NextResponse.json({ error: 'Failed to save registration' }, { status: 500 });
    }
}
