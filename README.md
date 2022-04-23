## Express (4.17.3), Express-Validator and Mongoose (6.2.10) with Auth and CRUD Application

### Requirement

1. Node.js
2. MongoDB URL
3. Postman

### Set up

```
npm install
```

This command will be installing all the package that listed in package.json file.

### Running for development

```
npm run dev
```

App will be running on port 5000 (http://localhost:5000).

### Development

Create file .env and make variable MONGO_URI and JWT_SECRET then assign the variable with MongoDB Atlas URL and JWT token.

Example :

```
MONGO_URI = mongodb+srv://admin:<password>@cluster0.8z0ls.mongodb.net/<database_name>?retryWrites=true&w=majority
JWT_SECRET=Super_secret_string
```

### API Endpoint

Open `./routes`

### Important Note 

This code was originally cloned from https://github.com/trulymittal/API-Authentication-NodeJs.git and I am just add or change several files. Thanks to the original authors.
