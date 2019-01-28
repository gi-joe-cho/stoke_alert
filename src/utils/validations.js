import * as SmartyStreetsSDK from "smartystreets-javascript-sdk";

export const validateName = value => {
  if (value.length > 0) {
    return true;
  }
  return false;
};

export const validateZipcode = value => {
  var regex = /\d{5}/;
  if (regex.test(value)) {
    return true;
  }
  return false;
};

export const validateCity = value => {
  var regex = /^[a-zA-Z]+$/;
  if (value.length > 0 && regex.test(value)) {
    return true;
  }
  return false;
};

export const validateUsername = value => {
  if (value.length > 4) {
    return true;
  }
  return false;
};

export const validatePassword = (password, retype) => {
  if (password.length > 0 && password === retype) {
    return true;
  }
  return false;
};

export const validateRetype = (password, retype) => {
  if (retype.length > 0 && password === retype) {
    return true;
  }
  return false;
};

export const validateEmail = value => {
  var regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (value.length > 0 && regex.test(value)) {
    return true;
  }
  return false;
};

export const validateZip = (zipcodes) => {
  const SmartyStreetsCore = SmartyStreetsSDK.core;
  const Lookup = SmartyStreetsSDK.usZipcode.Lookup;

  let authId = '23546282978178536';
  let authToken = '';
  let credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);

  let clientBuilder = new SmartyStreetsCore.ClientBuilder(credentials);
  let client = clientBuilder.buildUsZipcodeClient();

  let lookup1 = new Lookup();
  lookup1.zipCode = zipcodes;

  return client.send(lookup1)
    .then(parseResults)
    .catch(handleError);

  function handleError(response) {
    console.log(response);
  }
}

const parseResults = (response) => {
  return response.lookups[0].result[0].cities[0];
} 