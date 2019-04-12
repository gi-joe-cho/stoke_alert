class UserModel {
  constructor(user) {
    this._id = user.id;
    this._first_name = user.first_name;
    this._last_name = user.last_name;
    this._username = user.username;
    this._email = user.email;
    this._password = user.password;
    this._birth_date = user.birth_date;
    this._city = user.city;
    this._state = user.state;
    this._zipcode = user.zipcode;
    this._annotation = user.annotation;
    this._created_at = user.created_at;
    this._updated_at = user.updated_at;
  }

  get id() {
    return this._id;
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

  get password() {
    return this._password;
  }

  get birth_date() {
    return this._birth_date;
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

  getUser() {
    return {
      id: this._id,
      username: this._username,
      first_name: this._first_name,
      last_name: this._last_name,
      email: this._email,
      password: this._password,
      birth_date: this._birth_date,
      city: this._city,
      state: this._state,
      zipcode: this._zipcode,
      annotation: this._annotation,
      created_at: this._created_at,
      updated_at: this._updated_at,
    }
  }
}

module.exports = UserModel;
