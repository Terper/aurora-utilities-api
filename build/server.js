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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const monk_1 = __importDefault(require("monk"));
const body_parser_1 = require("body-parser");
const dbURL = "mongodb://127.0.0.1:27017/aurora";
const db = monk_1.default(dbURL);
const users = db.get("users");
const posts = db.get("posts");
class User {
    constructor(UID) {
        this.uid = UID;
        this.utilities = {
            posts: false,
            contact: false,
        };
    }
}
function doesUserExist(UID) {
    return __awaiter(this, void 0, void 0, function* () {
        const docs = yield users.findOne({ uid: UID });
        return docs ? true : false;
    });
}
function createUser(UID) {
    return __awaiter(this, void 0, void 0, function* () {
        const docs = yield users.insert(new User(UID));
    });
}
function getUser(UID) {
    return __awaiter(this, void 0, void 0, function* () {
        const docs = yield users.find({ uid: UID });
        return docs;
    });
}
function modifyUser(UID, modifications) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(modifyUser);
    });
}
const app = express_1.default();
const port = 4000;
app.use(body_parser_1.json());
app.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield doesUserExist(req.body.UID))) {
        yield createUser(req.body.UID);
    }
    res.json(yield getUser(req.body.UID));
}));
app.post("/userAddUtility", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(req.body.modifications);
}));
app.listen(port, () => {
    console.log(`GraphQL API at http://localhost:${port}`);
});
