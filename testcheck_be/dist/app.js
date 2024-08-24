"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const cors_1 = require("cors");
const app = express();
const hostname = 'localhost';
const port = 8888;
app.use(cors_1.default());
app.get('/repos', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get('https://api.github.com/users/freeCodeCamp/repos');
        const condition_forks = 5;
        const condition_fork = false;
        const processedData = response.data
            .filter((repo) => repo.forks > condition_forks && repo.fork === condition_fork)
            .map((repo) => ({
            name: repo.name,
            description: repo.description,
            language: repo.language,
            forks_count: repo.forks_count,
            created_at: repo.created_at
        }));
        res.status(200).json(processedData);
    }
    catch (error) {
        console.error('Error fetching data from GitHub API:', error);
        res.status(500).send('Error fetching data from GitHub API');
    }
}));
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//# sourceMappingURL=app.js.map