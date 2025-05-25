import express from "express";
import pool from "../config/db.js";
const router = express.Router();

router.post("/create-rating", async (req, res) => {
    const { rating, userId, menuId } = req.body;
    console.log(rating + " " + userId + " " + menuId);

    try {
        await pool.query(`CALL menu_sharing.insert_rating(?, ?, ?)`, [rating, userId, menuId]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/get-rating", async (req, res) => {
    const { userId, menuId } = req.query;

    try {
        const [rows] = await pool.query(
            `
            SELECT * FROM menu_sharing.rating
            WHERE menu_id = ? AND user_id = ? LIMIT 1`,
            [menuId, userId]
        );
        const response = rows.length > 0 ? { rating: rows[0].rating } : { rating: null };
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
