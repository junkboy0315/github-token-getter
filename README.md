# Github Token Getter
This is a simple lambda function made for github OAuth system to get `access token` by the `code`.

## How to use

1. Install `serverless` cli (if you don't have)
    ```cmd
    yarn global add serverless

    ```

2. Clone this repo
    ```
    git clone THIS_REPOSITORY
    ```

3. Open `src/config.ts` and enter github `client_id` and `client_secret` of yours.
Note that these keys should not be disclosed to the public.
    ```
    cd github-token-getter
    vi src/config
    ```

4. Deploy
    ```
    serverless deploy
    ```

5. Get access token

    ```
    GET http://your.api.gateway/getToken?code=1234ABCD
    ```
    returns
    ```
    { accessToken: 'ACCESS_TOKEN'}
    ```

## Details
Github OAuth system isn't ready for full front-end apps like single page application.

Since the Github's API endpoint that exchanges the `code` and `access token` is not configured as CORS, so you can't get token from front-end apps and need some server which handle this stuff.

This lambda funtion is for that.

[Github OAuth Documentation](https://developer.github.com/apps/building-oauth-apps/authorization-options-for-oauth-apps/#web-application-flow)

## Getting Code
[react-github-login](https://github.com/checkr/react-github-login) is useful to get `code`.

Once you get the code, send a GET request to the function.
```
GET http://your.api.gateway/getToken?code=CODE_GET_BY_REACT-GITHUB-LOGIN
```