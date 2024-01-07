import express from 'express';
import routes from './routes/routes';
import cors from 'cors';

const app = express();
const port = 8080;


app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
