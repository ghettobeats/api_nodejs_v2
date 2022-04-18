const http = require("http"),
  express = require("express"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  userroute = require("./routes/user.route"),
  authRoute = require("./routes/auth.router"),
  role = require("./models/role.model"),
  middle = require("./utils/middleware"),
  bodyParse = require("body-parser"),
  logger = require("./utils/logger"),
  app = express(),
  server = http.createServer(app);

require("dotenv/config");
app.use(cors());
app.use(express.json());
app.use(bodyParse.urlencoded({ extended: false }));

app.use(middle.requestLogger);
app.use("/api/user", userroute);
app.use("/api/auth", authRoute);

// app.use('/api', (req, res)=>{
//     return res.status(200).json({
//         data : 'data'
//     })
// })

server.listen(process.env.PORT, (req, res) => {
  logger.info(`corriendo en puerto ${process.env.PORT}`);
  mongoose
    .connect(process.env.DBCONNECTION)
    .then((db) => {
      logger.info("conected to mongodb");
      initial();
    })
    .catch((err) => {
      logger.error(err.message);
    });
});
app.use(middle.unknownEndpoint);
app.use(middle.errorHandler);

var initial = () => {
  role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("'user' role add a la collection");
      });
      new role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("'admin' role add a la collection");
      });
    }
  });
};
