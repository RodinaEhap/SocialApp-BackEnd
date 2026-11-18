"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const authentication_router_1 = __importDefault(require("./modules/authentication/authentication.router"));
const db_service_1 = require("./DB/db.service");
const user_router_1 = __importDefault(require("./modules/user/user.router"));
const notification_router_1 = __importDefault(require("./modules/notification/notification.router"));
const middleware_1 = require("./middleware");
const asset_router_1 = __importDefault(require("./modules/asset/asset.router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use("/api/users", user_router_1.default);
app.use("/api/auth", authentication_router_1.default);
app.use("/api/notifications", notification_router_1.default);
app.use("/api/assets", asset_router_1.default);
app.get("/", (req, res) => {
    res.json({ message: "Server is running successfully!" });
});
app.use(middleware_1.globalErrorHandler);
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
