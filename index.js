require("dotenv").config();
const server = require("./api/server");
const port = process.env.PORT || 5000;
server.get("/", (req, res) => {
    res.send("server is live!🔥");
});
server.listen(port, () => {
    console.log(`Server is live at ${port} 🔥`);
});
