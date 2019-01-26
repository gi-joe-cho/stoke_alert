import * as SmartyStreetsSDK from "smartystreets-javascript-sdk";

export const validateName = value => {
  if (value.length > 0) {
    return true;
  }
  return false;
};

export const validateZipcode = value => {
  var regex = /\d{5}/;
  if (value.length > 0 && value.length === 5 && regex.test(value)) {
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

export const validatedZip = async (value) => {
  return await validateZip(value);

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

  // Add your credentials to a credentials object.
  let authId = process.env.REACT_APP_SS_ZIPCODE_API_KEY;
  let authToken = '';
  // let authId = process.env.REACT_APP_SS_ZIPCODE_AUTH_ID;
  // let authToken = process.env.REACT_APP_SS_ZIPCODE_AUTH_TOKEN;
  let credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);

  // Build a client.
  let clientBuilder = new SmartyStreetsCore.ClientBuilder(credentials);
  let client = clientBuilder.buildUsZipcodeClient();

  // Create and populate a lookup.
  let lookup1 = new Lookup();
  lookup1.zipCode = zipcodes;

  // Send the lookup from the client and handle the response.
  return client.send(lookup1)
    .then(parseResults)
    .catch(handleError);

  function handleError(response) {
    console.log(response);
  }
}

const parseResults = (response) => {
  // Log the lookup city results to the console.
  // console.log("PARAMS: ", response);
  return response.lookups[0].result[0].cities[0];
}

