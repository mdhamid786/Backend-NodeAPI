// imageUrls.js

let imageUrls = [];

module.exports = {
  addImageUrl: (url) => {
    imageUrls.push(url);
  },
  getImageUrls: () => {
    return imageUrls;
  }
};
