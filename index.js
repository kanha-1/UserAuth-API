const express = require("express");
const app = express();
const PORT = process.env.PORT || 8800;
require("dotenv/config");
require("./config/db");

app.use(express.json());
// import routes
const user = require("./router/userRoutes");
// use routes
app.use("/api", user);

app.get("/", (req, res) => {
	res.json("hello server");
});

app.listen(PORT, () => {
	console.log(`server running on port no ${PORT}`);
});
