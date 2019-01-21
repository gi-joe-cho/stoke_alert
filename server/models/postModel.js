class PostModel {
  constructor(post) {
      this.id = post.id;
      this.user_id = post.user_id;
      this.user_rating = post.user_rating;
      this.up_votes = post.up_votes;
      this.down_votes = post.down_votes;
      this.image_location_url = post.image_location_url;
      this.post_content = post.image_location_url;
      this.lat = post.lat;
      this.lng = post.lng;
      this.city = post.city;
      this.state = post.state;
      this.zipcode = post.zipcode;
      this.created_at = post.created_at;
      this.updated_at = post.updated_at;
      this.first_name = post.first_name;
      this.last_name = post.last_name;
      this.username = post.username;
      this.email = post.email;
  }

  set setId(id) {
      this.id = id;
  }

  setUserId(user_id) {
      this.user_id = user_id;
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

  setFirstName(first_name) {
      this.first_name = first_name;
  }

  setLastName(last_name) {
      this.last_name = last_name;
  }

  setUsername(username) {
    this.username = username;
  }

  setEmail(email) {
    this.email = email;
  }

  get id() {
    return this.id;
  }

  get user_id() {
    return this.user_id;
  }

  get user_rating() {
    return this.user_rating;
  }

  get up_votes() {
    return this.up_votes;
  }

  get down_votes() {
    return this.down_votes;
  }

  get image_location_url() {
    return this.image_location_url;
  }

  get post_content() {
    return this.post_content;
  }

  get lat() {
    return this.lat;
  }

  get lng() {
    return this.lng;
  }

  get city() {
    return this.city;
  }

  get state() {
    return this.state;
  }

  get zipcode() {
    return this.zipcode;
  }

  get created_at() {
    return this.created_at;
  }

  get updated_at() {
    return this.updated_at;
  }

  get first_name() {
    return this.first_name;
  }

  get last_name() {
    return this.last_name;
  }

  get username() {
    return this.username;
  }

  get email() {
    return this.email;
  }

  get user() {
    return {
      id: this.user_id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
    }
  }

  get post() {
      return {
          id: this.id,
          user_rating: this.user_rating,
          up_votes: this.up_votes,
          down_votes: this.down_votes,
          image_location_url: this.image_location_url,
          post_content: this.post_content,
          lat: this.lat,
          lng: this.lng,
          city: this.city,
          state: this.state,
          zipcode: this.zipcode,
          created_at: this.created_at,
          updated_at: this.updated_at,
          user: this.user(),
      }
  }
}

module.exports = PostModel;
