const express= require("express");
const cors = require("cors");
const rootRouter = require("./routes/index")

const app = express();

// Middleware for parsing request bodies
app.use(express.json());
app.use(cors());

app.use("/api/v1" , rootRouter);

const PORT = 3000;
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
});



