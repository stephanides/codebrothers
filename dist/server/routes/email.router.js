"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Email_controller_1 = require("../controllers/Email.controller");
const router = express.Router();
const email = new Email_controller_1.Email();
router.post('/email/send', (req, res, next) => {
    email.sendEmail(req, res, next);
});
exports.default = router;
//# sourceMappingURL=email.router.js.map