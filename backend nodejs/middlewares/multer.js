const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

// Factory function pour générer des storages dynamiques selon type d'utilisateur
const getMulterUploader = (folderName = 'general') => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folderName,
      allowed_formats: ['jpg', 'png', 'jpeg'],
      transformation: [{ width: 500, height: 500, crop: 'limit' }],
    },
  });

  return multer({ storage });
};

module.exports = getMulterUploader;
