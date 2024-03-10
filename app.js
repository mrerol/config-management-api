import config from './config/dotenvSetup.js';
import express from 'express';
import cors from 'cors';
import panelRoutes from './routes/panelRoutes.js';
import configRoutes from './routes/configRoutes.js';

config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/', panelRoutes);
app.use('/configs', configRoutes);

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
