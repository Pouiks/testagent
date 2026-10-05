import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHomePage(): string {
    return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Mon SaaS</title>
  <style>
    body {
      margin: 0;
      font-family: sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    #loader {
      border: 4px solid #e0e0e0;
      border-top: 4px solid #333;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
    }
    #content {
      display: none;
      text-align: center;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div id="loader" role="status" aria-label="Chargement"></div>
  <div id="content">
    <h1>Bienvenue sur mon SaaS</h1>
    <p>La page est prête.</p>
  </div>
  <script>
    setTimeout(function () {
      document.getElementById('loader').style.display = 'none';
      document.getElementById('content').style.display = 'block';
    }, 3000);
  </script>
</body>
</html>`;
  }
}
