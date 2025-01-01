require('dotenv').config(); // Carrega as variáveis do arquivo .env

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2; // SDK do Cloudinary

const app = express();
const port = 3000;

// Usar as variáveis de ambiente do .env
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage(); // Usando a memória para os uploads
const upload = multer({ storage: storage });

app.use(cors());

// Endpoint para o upload de arquivos
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;

  // Verificar se o arquivo foi recebido
  if (!file.mimetype.startsWith('image/')) {
    return res.status(400).json({ success: false, message: 'O arquivo deve ser uma imagem' });
  }

  // Enviar o arquivo para o Cloudinary
  cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Erro ao fazer upload', error: error });
    }

    // Retorna a URL da imagem hospedada no Cloudinary
    res.json({
      success: true,
      url: result.secure_url  // A URL segura da imagem no Cloudinary
    });
  }).end(file.buffer);  // Envia o arquivo como buffer para o Cloudinary
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});