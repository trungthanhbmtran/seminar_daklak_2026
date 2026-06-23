"use server";

export async function getDocuments() {
    try {
        const res = await fetch("http://103.159.48.203/FTPsite/TAILIEU_THAMLUAN/", { next: { revalidate: 3600 } });
        const html = await res.text();
        
        const documents: { name: string, url: string }[] = [];
        const regex = /<A HREF="([^"]+)">([^<]+)<\/A>/gi;
        let match;
        
        while ((match = regex.exec(html)) !== null) {
            const url = match[1];
            const name = match[2];
            // Lọc ra các file hợp lệ (bỏ qua "To Parent Directory")
            if (name !== "[To Parent Directory]") {
                documents.push({
                    name: decodeURIComponent(name),
                    url: "http://103.159.48.203" + url
                });
            }
        }
        
        return documents;
    } catch (error) {
        console.error("Failed to fetch documents:", error);
        return [];
    }
}
