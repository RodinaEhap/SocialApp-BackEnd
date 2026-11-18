"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_router_1 = __importDefault(require("./modules/authentication/authentication.router"));
const db_service_1 = require("./DB/db.service");
const user_router_1 = __importDefault(require("./modules/user/user.router"));
const dotenv_1 = __importDefault(require("dotenv"));
const post_router_1 = __importDefault(require("./modules/post/post.router"));
const comment_router_1 = __importDefault(require("./modules/comment/comment.router"));
const notification_router_1 = __importDefault(require("./modules/notification/notification.router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use("/api/users", user_router_1.default);
app.use("/api/auth", authentication_router_1.default);
app.use("/api/posts", post_router_1.default);
app.use("/api/comments", comment_router_1.default);
app.use("/api/notifications", notification_router_1.default);
app.get("/", (req, res) => {
    res.json({ message: "Server is running successfully!" });
});
const bootstrap = async () => {
    try {
        await (0, db_service_1.connectDB)();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
    }
};
bootstrap();
