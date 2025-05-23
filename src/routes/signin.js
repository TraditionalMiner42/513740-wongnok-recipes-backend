import express from "express";
import bcrypt from "bcrypt";
import pool from "../config/db.js";
const router = express.Router();

router.post("/signin", async (req, res) => {
    try {
        let { username, password } = req.body;
        console.log(`username: ${username}\npassword: ${password}`);

        const query = `
        SELECT user_id, username, password FROM menu_sharing.user
        WHERE username = ? 
    `;
        const [rows] = await pool.query(query, [username]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        const user = rows[0];

        console.log(`rows: ${rows}\npw: ${user.password}`);

        const isMatch = await bcrypt.compare(password, user.password);

        console.log("Match: ", isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json({
            message: "Login successful",
            userId: user.user_id,
            username: user.username
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Database error" });
    }
});

export default router;
