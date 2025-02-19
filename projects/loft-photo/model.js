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
    const size = this.findSize(photo);
    return { friend: friend, id: photo.id, url: size.url };
  },

  login() {
    return new Promise((resolve, reject) => {
      VK.init({
        apiId: APP_ID,
      });

      VK.Auth.login((response) => {
        if (response.session) {
          this.token = response.session.sid;
          resolve(response);
        } else {
          console.error(response);
          reject(new Error('Не удалось авторизоваться'));
        }
      }, PERM_FRIENDS | PERM_PHOTOS);
    });
  },

  async init() {
    this.photoCache = {};
    this.friends = await this.getFriends();
    [this.me] = await this.getUsers();
  },

  photoCache: {},

  async getFriendPhotos(id) {
    let photos = this.photoCache[id];
    if (photos) {
      return photos;
    }
    photos = await this.getPhotos(id);
    this.photoCache[id] = photos;
    return photos;
  },

  callAPI(method, params) {
    params.v = params.v || '5.120';

    return new Promise((resolve, reject) => {
      VK.api(method, params, (response) => {
        if (response.error) {
          reject(new Error(response.error.error_msg));
        } else {
          resolve(response.response);
        }
      });
    });
  },

  getFriends() {
    const params = {
      fields: ['photo_50', 'photo_100'],
    };
    return this.callAPI('friends.get', params);
  },

  getPhotos(owner) {
    const params = {
      owner_id: owner,
    };
    return this.callAPI('photos.getAll', params);
  },

  findSize(photo) {
    const size = photo.sizes.find((size) => size.width >= 360);

    if (!size) {
      return photo.sizes.reduce((biggest, current) => {
        if (current.width > biggest.width) {
          return current;
        }
        return biggest;
      }, photo.sizes[0]);
    }
    return size;
  },

  logout() {
    return new Promise((resolve) => VK.Auth.revokeGrants(resolve));
  },

  getUsers(ids) {
    const params = {
      fields: ['photo_50', 'photo_100'],
    };
    if (ids) {
      params.user_ids = ids;
    }
    return this.callAPI('users.get', params);
  },

  async callServer(method, queryParams, body) {
    queryParams = {
      ...queryParams,
      method,
    };
    const query = Object.entries(queryParams)
      .reduce((all, [name, value]) => {
        all.push(`${name}=${encodeURIComponent(value)}`);
        return all;
      }, [])
      .join('&');
    const params = {
      headers: {
        vk_token: this.token,
      },
    };

    if (body) {
      params.method = 'POST';
      params.body = JSON.stringify(body);
    }

    const response = await fetch(`/loft-photo/api/?${query}`, params);
    return response.json();
  },

  async like(photo) {
    return this.callServer('like', { photo });
  },

  async photoStats(photo) {
    return this.callServer('photoStats', { photo });
  },

  async getComments(photo) {
    return this.callServer('getComments', { photo });
  },

  async postComment(photo, text) {
    return this.callServer('postComment', { photo }, { text });
  },
};
