import express from "express";
import pool from "../config/db.js";
const router = express.Router();

router.get("/get-users-menu", async (req, res) => {
    console.log("test");
    try {
        const [rows] = await pool.query(`CALL get_users_menu()`);
        const menu = rows[0];
        console.log(`Home menus: ${menu}`);
        res.json(menu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
