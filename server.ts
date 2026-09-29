import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Health check endpoint for Cloud Run and monitoring probes
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

const distPath = path.join(__dirname, 'dist');

// If dist directory is missing, build it
if (!fs.existsSync(distPath)) {
  console.log('Dist directory not found. Running build...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
  } catch (err) {
    console.error('Error during auto-build:', err);
  }
}

if (fs.existsSync(distPath)) {
  // Serve static assets with appropriate caching
  app.use(express.static(distPath));

  // SPA fallback
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('*', (_req: Request, res: Response) => {
    res.status(500).send('Application build artifact not found.');
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Brew & Bloom server running on http://0.0.0.0:${port}`);
});
