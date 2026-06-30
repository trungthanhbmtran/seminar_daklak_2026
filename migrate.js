const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'result.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const newData = [];

data.forEach(item => {
    if (item.delegates && item.delegates.length > 0) {
        item.delegates.forEach((del, idx) => {
            newData.push({
                id: item.id + (idx > 0 ? `-${idx}` : ''),
                createdAt: item.createdAt,
                fullName: del.fullName || "",
                organization: item.organization || "",
                position: del.position || "",
                phone: item.phone || "",
                email: ""
            });
        });
    } else {
        newData.push({
            id: item.id,
            createdAt: item.createdAt,
            fullName: item.fullName || "Không rõ",
            organization: item.organization || "",
            position: item.position || "",
            phone: item.phone || "",
            email: ""
        });
    }
});

fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf-8');
console.log('Migrated data');
