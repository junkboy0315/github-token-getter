# Github Token Getter
Github OAuth requires a backend server and is not ready for full-frontend authentication. This repository consist of lambda function & API that solve these problems, and you can get `access token` in exchange for `code`.

## How to use

1. Install [serverless](https://serverless.com/) and setup (if you don't have)
    ```cmd
    yarn global add serverless
    export AWS_ACCESS_KEY_ID=<your-aws-key>
    export AWS_SECRET_ACCESS_KEY=<your-aws-secret-key>
    ```

2. Clone this repo
    ```
    git clone THIS_REPOSITORY
    ```

3. Open `src/config.ts` and edit `client_id` and `client_secret`. These values ​​can be obtained from the github console. Note that these keys should not be disclosed to the public.
    ```
    cd github-token-getter
    vi ./src/config.ts
    ```

4. Deploy
    ```
    serverless deploy
    ```

5. Get access token

    Once AWS API Gateway deployed, you can get github access token by the `code`

    ```
    GET http://your.api.gateway/getToken?code=<CODE-FROM-GITHUB>
    ```
    returns
    ```
    { accessToken: 'ACCESS_TOKEN'}
    ```

## API Specification
Refer [Swagger Hub](https://app.swaggerhub.com/apis/Yuuniworks/github-token-getter/1.0.0-oas3).

## How to get `code` in frontend
[react-github-login](https://github.com/checkr/react-github-login) is useful to get `code`.

Once you get the code, you just need to send a GET request to  your API.
```
GET http://your.api.gateway/getToken?code=<CODE-FROM-GITHUB>
```

## Details
Github OAuth system isn't ready for full front-end apps like single page application.

Since Github's Oauth API endpoint (https://github.com/login/oauth/access_token) which provides `access token` in exchange for `code`, is not set as CORS, it is not possible to obtain a token from the front end application. In other words, you must make a request from the backend server to obtain a token.

This lambda function & API is for that purpose.

Refer [Github OAuth Documentation](https://developer.github.com/apps/building-oauth-apps/authorization-options-for-oauth-apps/#web-application-flow) for more details.
