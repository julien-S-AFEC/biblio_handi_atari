import db from "../config/db.js";

export const Document = {
    create: async (document) => {
        const sql ='INSERT INTO documents (title, name ,description, theme, cloudinary_URL, format, accessibility) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db.execute(sql, [
            document.title,
            document.name,
            document.description,
            document.theme,
            document.cloudinary_URL,
            document.format,
            document.accessibility
        ]);
        return result;
    },

    findAll: async () => {
        const [rows] = await db.execute('SELECT * FROM documents');
        return rows;
    }
};