import app from "./src/app.js";
import 'dotenv/config';
import connectDB from "./src/db/db.js";

// PORT
const port = process.env.PORT || process.env.PORT_NUM || 3000

// DB
connectDB().then(() => {

    // SERVER RUN
    app.listen(port, () => {
        console.log(`server is running on port http://localhost:${port}`);
    })
})
