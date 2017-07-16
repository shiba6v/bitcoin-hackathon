import 'whatwg-fetch';

import jQuery from 'jquery';

import buildURL from './build_url';
import ObjectKeyTranslator from './utils/object_key_translator';

function getDefaultParams() {
  return {
    credentials: 'same-origin',
    headers: {
      'X-CSRF-Token': jQuery('meta[name="csrf-token"]').attr('content'),
      'Content-Type': 'application/json'
    }
  }
}

async function _fetch(url, options) {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(url, options);
    const body = ObjectKeyTranslator.snakeToCamel(await res.json());

    if (res.ok) {
      resolve(body);
    } else {
      reject({ status: res.status, body });
    }
  });
}

async function withBody(method, url, body, options) {
  Object.assign(options, getDefaultParams(), {
    body: ObjectKeyTranslator.camelToSnake(JSON.stringify(body)),
    method: method
  });

  return await _fetch(url, options);
}

async function withoutBody(method, url, options) {
  Object.assign(options, getDefaultParams(), { method: method });

  return await _fetch(url, options);
}

async function withoutBody2(method, url, options) {
  Object.assign(options, {}, { method: method });

  return await _fetch(url, options);
}

export default class HTTP {
  static async delete(url, params) {
    Object.assign(options);
  }

  static async get(url, parameters = {}, options = {}) {
    const urlWithParams = buildURL(url, ObjectKeyTranslator.camelToSnake(parameters));

    return await withoutBody('GET', urlWithParams, options);
  }

  static async get2(url, parameters = {}, options = {}) {
    const urlWithParams = buildURL(url, ObjectKeyTranslator.camelToSnake(parameters));

    return await withoutBody2('GET', urlWithParams, options);
  }

  static async head(url, options = {}) {
    return await withBody(url, options);
  }

  static async patch(url, body = {}, options = {}) {
    return await withBody('PATCH', url, body, options);
  }

  static async post(url, body = {}, options = {}) {
    return await withBody('POST', url, body, options);
  }

  static async put(url, body = {}, options = {}) {
    return await withBody('PUT', url, body, options);
  }

  static async delete(url, parameters = {}, options = {}) {
    const urlWithParams = buildURL(url, ObjectKeyTranslator.camelToSnake(parameters));

    return await withoutBody('DELETE', urlWithParams, options);
  }
}
