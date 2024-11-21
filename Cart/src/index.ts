import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cartRoute from "./routes/cartRoute";
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
// Middleware use
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

// Url for /cart
app.use('/cart', cartRoute);


app.listen(port, () => {
  console.log(`Server is Running on  port ${port}`);
});
