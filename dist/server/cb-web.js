"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const port = 3000;
const app = new App_1.App().app;
app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    else {
        return console.log(`server is listening on ${port}`);
    }
});
//# sourceMappingURL=cb-web.js.map