import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("RECEIVED REGISTRATION:", body);

        // Validate phone if provided
        const phoneRegex = /^0(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}$/;
        // Check for common phone field names
        const phone = body.phone || body.phoneNumber || body.sdt;
        if (phone && !phoneRegex.test(phone)) {
            return NextResponse.json({ error: 'Số điện thoại không hợp lệ' }, { status: 400 });
        }
        
        const dataDir = path.join(process.cwd(), 'data');
        const filePath = path.join(dataDir, 'result.json');

        // Ensure data directory exists
        try {
            await fs.access(dataDir);
        } catch {
            await fs.mkdir(dataDir, { recursive: true });
        }

        let existingData: Record<string, any>[] = [];
        
        // Read existing data if file exists
        try {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            existingData = JSON.parse(fileContent);
        } catch {
            // File doesn't exist or is invalid JSON, start with empty array
            existingData = [];
        }

        // Check for duplicates: matching name, phone, and organization
        const isDuplicate = existingData.some(entry => {
            const entryName = (entry.fullName || entry.name || "").toString().trim().toLowerCase();
            const entryPhone = (entry.phone || entry.phoneNumber || entry.sdt || "").toString().trim();
            const entryOrg = (entry.organization || entry.donvi || "").toString().trim().toLowerCase();
            
            const bodyName = (body.fullName || body.name || "").toString().trim().toLowerCase();
            const bodyPhone = (body.phone || body.phoneNumber || body.sdt || "").toString().trim();
            const bodyOrg = (body.organization || body.donvi || "").toString().trim().toLowerCase();

            return (
                entryName && bodyName && entryName === bodyName &&
                entryPhone && bodyPhone && entryPhone === bodyPhone &&
                entryOrg && bodyOrg && entryOrg === bodyOrg
            );
        });

        if (isDuplicate) {
            return NextResponse.json({ error: 'Đại biểu này đã được đăng ký (trùng Tên, Số điện thoại và Đơn vị).' }, { status: 400 });
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
