import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();

app.use(bodyParser.json());

app.get('/contacts', async (req, res) => {
  try {
    const response = await axios.get(`http://${process.env.BACKEND_SERVICE_SERVICE_HOST}/contacts`);
    // console.log(response);
    res.status(200).json({users: response.data});

  } catch (err) {
    // console.log(err.message);
    return res
      .status(500)
      .json({ message: err.message });
  }
});

app.listen(8020);
