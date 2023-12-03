import subfunc from './subfunc'

const PERM_FRIENDS = 2;
const PERM_PHOTOS = 4;
const APP_ID = 51802198;

export default {
  getRandomElement(array) {
    if (!array.length) {
      return null;
    }
    const randomIndex = Math.round(Math.random() * (array.length - 1));
    return array[randomIndex];
  },

  async getNextPhoto() {
    const friend = this.getRandomElement(this.friends.items);
    const photos = await this.getFriendPhotos(friend.id);
    const photo = this.getRandomElement(photos.items);
    const size = subfunc.findSize(photo);
    
    console.log("this")
    console.log(this);
    return { friend: friend, id: photo.id, url: size.url };
  },

  login() { 
      return new Promise((resolve, reject) => {
        VK.init({
          apiId: 51802198,
        });

        VK.Auth.login((response) => {
          if (response.session) {
            resolve();
          } else {
            reject(new Error("Не удалось авторизоваться"));
          }
        }, PERM_FRIENDS | PERM_PHOTOS);
      });
    },

  async init() {
    this.photoCache = {};
    this.friends = await subfunc.getFriends();
  },

  photoCache: {},

  async getFriendPhotos(id) {
    let photos = this.photoCache[id];
    if (photos) {
      return photos;
    }
    photos = await subfunc.getPhotos(id);
    this.photoCache[id] = photos;
    return photos;
  },
};
