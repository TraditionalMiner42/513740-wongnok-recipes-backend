import express from "express";
import pool from "../config/db.js";
const router = express.Router();

router.post("/create-menu", async (req, res) => {
    const { menuName, imageUrl, userId, duration, difficulty, ingredients, instructions } =
        req.body;
    console.log(ingredients);
    console.log(instructions);
    console.log(userId);

    try {
        await pool.query("SET @menu_id = 0");
        await pool.query("CALL insert_menu(?, ?, ?, ?, ?, @p_menuid)", [
            menuName,
            imageUrl,
            userId,
            duration,
            difficulty
        ]);
        const [result] = await pool.query("SELECT @p_menuid as menu_id");
        console.log(result);

        const menuId = result[0].menu_id;
        for (const step of instructions) {
            const { stepNumber, instruction } = step;
            await pool.query(
                `INSERT INTO menu_sharing.menu_step (menu_id, step_number, instruction)
         VALUES (?, ?, ?)`,
                [menuId, stepNumber, instruction]
            );
        }

        for (const ingredient of ingredients) {
            const { name, quantity, unit } = ingredient;

            const [ingredientResult] = await pool.query(
                `INSERT INTO menu_sharing.ingredient (ingredient_name, quantity, unit, menu_id)
         VALUES (?, ?, ?, ?)`,
                [name, quantity, unit, menuId]
            );

            const ingredientId = ingredientResult.insertId;
            await pool.query(
                `INSERT INTO menu_sharing.menu_ingredient (menu_id, ingredient_id)
         VALUES (?, ?)`,
                [menuId, ingredientId]
            );
        }
        res.json({ success: true, message: "Create menu successfully!", menuId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

export default router;
