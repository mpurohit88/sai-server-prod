
/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const http = require('http');
const helmet = require('helmet');
const compression = require('compression')
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer')

const Mailer = require('./mailer');
const category = require('./controllers/category');
const solution = require('./controllers/solution');
const region = require('./controllers/region');
const report = require('./controllers/report');
const press = require('./controllers/press');
const blog = require('./controllers/blog');
const paypaltran = require('./controllers/paypaltran');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();

app.use(helmet());

app.use(bodyParser.json({ limit: '15360mb', type: 'application/json' }))
app.use(bodyParser.urlencoded({ limit: '15360mb', extended: true, type: 'application/json', parameterLimit: 5000000 }))

// var allowedOrigins = ['http://localhost:8000', 'http://localhost:3000', 'http://localhost:5001',
var allowedOrigins = ['https://www.sheeranalyticsandinsights.com',
  'http://www.sheeranalyticsandinsights.com',
  'http://sheeranalyticsandinsights.com',
  'https://sheeranalyticsandinsights.com',
  'http://static.sheeranalyticsandinsights.com',
  'http://www.static.sheeranalyticsandinsights.com',
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
// app.use(function (req, res, next) {
//   res.setHeader("Content-Security-Policy", "script-src 'self' https://*.sheeranalyticsandinsights.com https://translate.google.com/*; object-src 'self'");
//   return next();
// });


app.disable('x-powered-by');
app.use(compression());

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/categoryList', async function (req, res, next) {
  const result = await category.categoryList();

  res.send({ list: result, status: 200 });
});

app.get('/api/solutionList', async function (req, res, next) {
  const result = await solution.solutionList();

  res.send({ list: result, status: 200 });
});

app.get('/api/regionList', async function (req, res, next) {
  const result = await region.regionList();

  res.send({ list: result, status: 200 });
});

app.get('/api/subRegionListt', async function (req, res, next) {
  const result = await region.subRegionList(req.query.regionId);

  res.send({ list: result, status: 200 });
});

app.get('/api/subCategoryList', async function (req, res, next) {
  const result = await category.subCategoryList(req.query.industryCategoryId);

  res.send({ list: result, status: 200 });
});

app.post('/api/saveReport', async function (req, res, next) {

  if (req.body.password === "dfs$@$342djflks=vnkd57493saaB") {
    const result = await report.add(req.body);

    res.send({ "msg": "Report Saved Successfully", status: 200 });
  } else {
    return res.status(401).send({ error: "You are not authorized" });
  }

});

app.post('/api/savePress', async function (req, res, next) {

  if (req.body.password === "dfs$@$342djflks=vnkd57493saaB") {
    const result = await press.add(req.body);

    res.send({ "msg": "Report Saved Successfully", status: 200 });
  } else {
    return res.status(401).send({ error: "You are not authorized" });
  }
});

app.get('/api/report/fetchAll', async function (req, res, next) {

  // if (req.body.password === "dfs$@$342djflks=vnkd57493saaB") {
  const reports = await report.fetchAll(req.query);

  res.send({ "reports": reports, status: 200 });
  // } else {
  //   return res.status(401).send({ error: "You are not authorized" });
  // }
});

app.get('/api/press/fetchAll', async function (req, res, next) {

  // if (req.body.password === "dfs$@$342djflks=vnkd57493saaB") {
  const presses = await press.fetchAll(req.body);

  res.send({ "presses": presses, status: 200 });
  // } else {
  //   return res.status(401).send({ error: "You are not authorized" });
  // }
});

app.post('/api/login', async function (req, res, next) {

  if (req.body.username === "admin" && req.body.password === "dfs$@$342djflks=vnkd57493saaB") {
    res.send({ "isLoggedIn": true, status: 200 });
  } else {
    return res.status(401).send({ error: "You are not authorized" });
  }
});

app.post('/api/sendEmail', async function (req, res, next) {
  const mailer = new Mailer(req.body);

  mailer.sendEmail(result => {
    if (result) {
      res.send({ "msg": "email send", status: 200 });
    } else {
      console.log('error...', result);
      res.send({ "msg": "failed", status: 500 });
    }
  })
});

app.post('/api/updatePressView', async function (req, res, next) {
  press.updateView(req.body);

  res.send({ "msg": "Press Count updated successfully", status: 200 });
});

app.post('/api/updateBlogView', async function (req, res, next) {
  blog.updateView(req.body);

  res.send({ "msg": "Blog Count updated successfully", status: 200 });
});

app.post('/api/updateReport', async function (req, res, next) {
  report.update(req.body);

  res.send({ "msg": "Report updated successfully", status: 200 });
});


const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../../sai-server/public/static');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/api/uploadImages', upload.fields([{ name: 'images' }]), async function (req, res, next) {

  res.send({ "msg": "Images uploaded successfully", status: 200 });
});

app.post('/api/updatePress', async function (req, res, next) {
  press.update(req.body);

  res.send({ "msg": "Press updated successfully", status: 200 });
});

app.get('/api/fetchCaptchaSecret', async function (req, res) {
  res.send({
    "CAPTCHA_SITE_KEY": "6LeVlK0ZAAAAAL4v1S9_-LKVMofeoz1xspOm_AHc",
    "PAYPAL_SANDBOX_CLIENT_ID": "AQAxdjSkRuIM--m80-d4Qgz6i2XTlMYGNQEGlw2OOitj-37a8E_bIufWnPYqAJa2c-HUZTiKd62595VU"
  })
})

app.post("/api/saveTransaction", async function (req, res, next) {
  await paypaltran.save(req);

  res.send({ "msg": "Transaction saved successfully", status: 200 });
});

app.get('/*', function (req, res) {
  console.log("get files");
  res.sendFile(__dirname + '/public/index.html');
});

app.use(function (error, req, res, next) {
  // Any request to this server will get here, and will send an HTTP
  // response with the error message 'woops'
  console.log("Server Error....", error);

  res.status(error.statusCode || 500).send("error");
});



// let port = 5001; //process.env.PORT || 3000;
let port = process.env.PORT || 3000;

app.set('port', port);

/** Create HTTP server. */
const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
server.listen(port, () => console.log(`Server Running on port ${port}`));
