import express from "express";
import pool from "../config/db.js";
const router = express.Router();

router.delete("/delete-menu", async (req, res) => {
    const { menuId } = req.query;
    try {
        await pool.query("CALL delete_user_menu(?)", [menuId]);
        res.json({ message: `Menu deleted successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

export default router;
