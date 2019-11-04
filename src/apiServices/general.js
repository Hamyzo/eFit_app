/*
  This file contains the functions that you can use in general cases to get, post, put or delete.
  A description is available for each function.
  Refer to http://localhost:3015/documentation for a list of possible resources and a list of data types.
  Refer to https://www.npmjs.com/package/api-query-params#supported-features for a list of supported filters.
*/

//     *** ALL OF THE FUNCTIONS MUST BE SURROUNDED BY A TRY/CATCH STATEMENT ***

import personal from "../personal";

/**
 * This function performs a GET request to the api, to get all the documents that match the filter conditions
 * @param resource: the name of the resource to be queried
 * @param filter: a string filter, it helps add conditions to the data to be retrieved
 * @returns {Promise<>} this function returns a promise, when the function is called, it must be preceded
 * by the await keyword, the object is then an array of json objects
 */
export const get = (resource, filter) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      `${personal.api_url}/${resource}${filter ? "?" + filter : ""}`
    );

    if (response.status === 200) {
      resolve(response.json());
    } else {
      reject(response);
    }
  });
};

/**
 * This function performs a GET request to the api, to get the document of which the id is specified
 * @param resource: the name of the resource to be queried
 * @param id: the id of the document
 * @param filter: a string filter, it helps add conditions to the data to be retrieved
 * @returns {Promise<>} this function returns a promise, when the function is called, it must be preceded
 * by the await keyword, the object is then a simple json object
 */
export const getOne = (resource, id, filter) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      `${personal.api_url}/${resource}/${id}${filter ? "?" + filter : ""}`
    );

    if (response.status === 200) {
      resolve(response.json());
    } else {
      reject(response);
    }
  });
};

/**
 * This function performs a POST request to the api
 * @param resource: the name of the resource to be queried
 * @param data: the data that would be created in the database, must be a json object
 * @returns {Promise<>} this function returns a promise, when the function is called, it must be preceded
 * by the await keyword
 */
export const postOne = (resource, data) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${personal.api_url}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.status === 201) {
      resolve(response.json());
    } else {
      reject(response.error());
    }
  });
};

/**
 * This function performs a PATCH request to the api, to modify the document of which the id is specified
 * @param resource: the name of the resource to be queried
 * @param id: the id of the document
 * @param data: the data that would be modified in the database, must be a json object
 * @returns {Promise<>} this function returns a promise, when the function is called, it must be preceded
 * by the await keyword
 */
export const patchOne = (resource, id, data) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${personal.api_url}/${resource}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.status === 200) {
      resolve(response.json());
    } else {
      reject(response.error());
    }
  });
};

/**
 * This function performs a DELETE request to the api, to delete the document of which the id is specified
 * @param resource: the name of the resource to be queried
 * @param id: the id of the document
 * @returns {Promise<>} this function returns a promise, when the function is called, it must be preceded
 * by the await keyword
 */
export const deleteOne = (resource, id) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${personal.api_url}/${resource}/${id}`, {
      method: "DELETE"
    });

    if (response.status === 201) {
      resolve(response.json());
    } else {
      reject(response.error());
    }
  });
};
