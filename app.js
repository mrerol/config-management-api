import config from './config/dotenvSetup.js';
import express from 'express';
import cors from 'cors';
import configRoutes from './routes/configRoutes.js';
import configRoutesByMobile from './routes/configRoutesByMobile.js';

config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/', configRoutes);
app.use('/mobile', configRoutesByMobile);

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
