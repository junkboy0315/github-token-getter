import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import axios from 'axios';
import { parse as parseQueryString } from 'querystring';

import config from './config';

export const getToken: Handler = async (
  event,
  context: Context,
  callback: Callback,
) => {
  const { client_id, client_secret } = config;

  const params = {
    client_id,
    client_secret,
    code: event.query.code,
  };

  const result: any = await axios
    .post(`https://github.com/login/oauth/access_token`, params)
    .catch(err =>
      callback(
        new Error(`[500] failed getting access token. err msg => ${err}`),
      ),
    );

  // manually return 500 because github returns 200 even if the operation fails
  if (result.data.startsWith('error')) {
    callback(
      new Error(
        `[500] failed getting access token. message from github => ${
          result.data
        }`,
      ),
    );
  }

  const response = {
    accessToken: parseQueryString(result.data).access_token,
  };

  callback(null, response);
};
