"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const amountController_1 = require("../controllers/amountController");
const router = (0, express_1.Router)();
router.get('/', amountController_1.getAmounts);
router.get('/:idAmount', amountController_1.getAmount);
router.post('/', amountController_1.postAmount);
router.delete('/:idAmount', amountController_1.deleteAmount);
router.put('/:idAmount', amountController_1.putAmount);
exports.default = router;