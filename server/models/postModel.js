class PostModel {
  constructor(post) {
    this._id = post.id;
    this._user_id = post.user_id;
    this._user_rating = post.user_rating;
    this._up_votes = post.up_votes;
    this._down_votes = post.down_votes;
    this._image_location_url = post.image_location_url;
    this._post_content = post.post_content;
    this._lat = post.lat;
    this._lng = post.lng;
    this._city = post.city;
    this._state = post.state;
    this._zipcode = post.zipcode;
    this._created_at = post.created_at;
    this._updated_at = post.updated_at;
    this._first_name = post.first_name;
    this._last_name = post.last_name;
    this._username = post.username;
    this._email = post.email;
  }

  setUpVotes(up_votes) {
    this.up_votes = up_votes;
  }

  setDownVotes(down_votes) {
    this.down_votes = down_votes;
  }

  setImageLocationUrl(image_location_url) {
    this.image_location_url = image_location_url;
  }

  setPostContent(post_content) {
    this.post_content = post_content;
  }

  setLat(lat) {
    this.lat = lat;
  }

  setLng(lng) {
    this.lng = lng;
  }

  setCity(city) {
    this.city = city;
  }

  setState(state) {
    this.state = state;
  }

  setZipcode(zipcode) {
    this.zipcode = zipcode;
  }

  setCreatedAt(created_at) {
    this.created_at = created_at;
  }

  setUpdatedAt(updated_at) {
    this.updated_at = updated_at;
  }

  get id() {
    return this._id;
  }

  get user_id() {
    return this._user_id;
  }

  get user_rating() {
    return this._user_rating;
  }

  get up_votes() {
    return this._up_votes;
  }

  get down_votes() {
    return this._down_votes;
  }

  get image_location_url() {
    return this._image_location_url;
  }

  get post_content() {
    return this._post_content;
  }

  get lat() {
    return this._lat;
  }

  get lng() {
    return this._lng;
  }

  get city() {
    return this._city;
  }

  get state() {
    return this._state;
  }

  get zipcode() {
    return this._zipcode;
  }

  get created_at() {
    return this._created_at;
  }

  get updated_at() {
    return this._updated_at;
  }

  get first_name() {
    return this._first_name;
  }

  get last_name() {
    return this._last_name;
  }

  get username() {
    return this._username;
  }

  get email() {
    return this._email;
  }

  user() {
    return {
      id: this._user_id,
      first_name: this._first_name,
      last_name: this._last_name,
      email: this._email,
    }
  }

  post() {
    return {
      id: this._id,
      user_rating: this._user_rating,
      up_votes: this._up_votes,
      down_votes: this._down_votes,
      image_location_url: this._image_location_url,
      post_content: this._post_content,
      lat: this._lat,
      lng: this._lng,
      city: this._city,
      state: this._state,
      zipcode: this._zipcode,
      created_at: this._created_at,
      updated_at: this._updated_at,
      user: this.user(),
    }
  }
}

module.exports = PostModel;
