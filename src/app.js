import express from "express";
import cors from "cors";
import registerRoute from "./routes/register.js";
import signinRoute from "./routes/signin.js";
import createMenuRoute from "./menu/createMenu.js";
import getMenuRoute from "./menu/getUserMenu.js";
import deleteMenuRoute from "./menu/deleteMenu.js";
import getAllUserMenusRoute from "./menu/getAllUserMenus.js";
import menuRatingRoute from "./menu/menuRating.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// respond with "hello world" when a GET request is made to the homepage
app.use("/auth", registerRoute);
app.use("/auth", signinRoute);
app.use("/menu", createMenuRoute);
app.use("/menu", getMenuRoute);
app.use("/menu", deleteMenuRoute);
app.use("/menu", getAllUserMenusRoute);
app.use("/menu", menuRatingRoute);

app.listen(port, () => {
    console.log(`Server running at <http://localhost>:${port}/`);
});
