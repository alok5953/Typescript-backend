import express from 'express';
import v1 from './routes/v1';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api/v1', v1);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
