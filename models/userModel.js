import db from "../config/db.js"; 

export const User = {
  create: async (user) => {
    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(sql, [user.name, user.email, user.password, user.role || 'user']);
    return result;
  },


  findByEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows;
  },

  verifyEmail: async (email) => {
  const sql = 'UPDATE users SET is_verified = true WHERE email = ?';
  const [result] = await db.execute(sql, [email]);
  return result;
}
  
}