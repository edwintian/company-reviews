This is a simple backend express app to provide a Glassdoorsy experience.

Users register(POST) a new account via the /users/register route, and are allowed to POST company reviews via the /companies/:id/reviews route.

Companies reviews can be gleamed (GET) from /companies/:id route

JWT cookie token is issued at /users/login (POST) and cleared at /users/logout (POST)

1. npm install

2. Add .env file to root directory with JWT_SECRET_KEY (value should be 256 bits)

3. npm run start:dev for Postman testing (You will need a mongo DB instance running on localhost first)

4. npm run test for automated unit test
