const router = require('express').Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
const { auth } = require('../middleware/auth');

const upload = multer.single('file');

router.post('/', auth, upload, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: 'products'
    });

    res.json({ data: { url: uploadResult.secure_url } });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
  });

module.exports = router;
