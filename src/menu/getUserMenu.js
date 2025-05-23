import express from "express";
import pool from "../config/db.js";
const router = express.Router();

router.get("/get-user-menu", async (req, res) => {
    const { userId } = req.query;

    try {
        if (userId) {
            const [rows] = await pool.query(
                `
        CALL get_user_menu(?)
      `,
                [userId]
            );
            const menu = rows[0];
            console.log(menu);
            res.json(menu);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
