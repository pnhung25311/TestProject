// src/app.ts
import * as http from 'http';
import axios from 'axios';
const hostname = 'localhost';
const port = 8888;
const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.url === '/repos' && req.method === 'GET') {
    try {
      const response = await axios.get('https://api.github.com/users/freeCodeCamp/repos');
      const condition_forks : number = 5;
      const condition_fork : boolean = false;
      const processedData = response.data.filter((repo: any) => repo.forks > condition_forks && repo.fork == condition_fork).map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        forks_count: repo.forks_count,
        created_at: repo.created_at
      }));
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(processedData));
    } catch (error) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Error fetching data from GitHub API');
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }


  
});




server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
