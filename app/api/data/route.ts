import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function DELETE() {
    try {
        const filePath = path.join(process.cwd(), 'data', 'result.json');
        
        // Write an empty array to result.json to clear all data
        await fs.writeFile(filePath, JSON.stringify([], null, 4), 'utf-8');
        
        return NextResponse.json({ success: true, message: 'Đã xoá toàn bộ dữ liệu thành công.' });
    } catch (error) {
        console.error('Error clearing data:', error);
        return NextResponse.json({ success: false, message: 'Không thể xoá dữ liệu.' }, { status: 500 });
    }
}
