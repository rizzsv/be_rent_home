"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeasesPayments = exports.listApplication = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const listApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, userType } = req.query;
        let whereClause = {};
        if (userId && userType) {
            if (userType === "tenant") {
                whereClause = {
                    tenantCognitoId: String(userId)
                };
            }
            else if (userType === "manager") {
                whereClause = {
                    property: {
                        managerCognitoId: String(userId)
                    }
                };
            }
        }
        const application = yield prisma.application;
    }
    catch (error) {
        res.status(500).json({ message: `Error retrieving application: ${error.message} ` });
    }
});
exports.listApplication = listApplication;
const getLeasesPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(payments);
    }
    catch (error) {
        res.status(500).json({ message: `Error retrieving payments: ${error.message} ` });
    }
});
exports.getLeasesPayments = getLeasesPayments;
