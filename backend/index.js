import express from 'express'; // Add {"type": "module"} to package.json for node18
import cors from 'cors';
import 'dotenv/config';
import middleware from './src/middleware/index.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(middleware.decodeToken);

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.get('/api/tasks', (req, res) => {
	return res.json({
		tasks: [
			{title: 'Task1',},
			{title: 'Task2',},
		],
	});
});

app.listen(process.env.PORT, () => {
  console.log('Server started on port ' + process.env.PORT);
});
