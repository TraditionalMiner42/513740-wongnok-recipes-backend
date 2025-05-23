import express from "express";
import pool from "../config/db.js";
import bcrypt from "bcrypt";
const router = express.Router();

const saltRounds = 10;

router.post("/register", async (req, res) => {
    try {
        let { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        console.log(`username: ${username}\npassword: ${hashedPassword}`);

        const query = `
        INSERT INTO menu_sharing.user (username, password)
        VALUES (?, ?)`;
        const [result] = await pool.query(query, [username, hashedPassword]);
        res.status(201).json({ message: "Create user successfully", insertId: result.insertId });
        // console.log("body: ", userBody[0].username);
        // res.send(userBody);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Database error" });
    }
});

export default router;
