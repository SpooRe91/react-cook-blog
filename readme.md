# cook-blog API

**A food recipe Rest API build with Express.js**
<br/>
![cover](https://user-images.githubusercontent.com/85784810/174287568-5c1a4d6b-6f1c-43f6-b881-31a0e52fafbc.JPG)

**Using the cook-blog-API:**

please make sure to include the following options after the fetch(url, OPTIONS);
```js
options = {
mode: 'cors',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                "Access-Control-Allow-Credentials": true,
            }
}
```

**API**: "http://localhost:3030"

***REGULAR + :***
<br/>
API/ - **GET**
<br/>
API/like/id - **GET** - get the likes for a particular item, returns an array of all user IDs, who liked this picture


***AUTH:***
<br/>
API/auth/register - **POST**
<br/>
API/auth/login - **POST**
<br/>
API/auth/logout - **GET**

***RECIPE:***
<br/>
API/details/id - **GET** - fetch the details of a particular recipe - doesn't require authentication. Returns an oject with the information about the current item. If there is no such item, it will return an error message: "Resource not found!"
<br/>
API/edit/id - **PUT** - update/edit a current recipe (requires authentication and authorization). Returns information in JSON format, if the requst is acknowledged and if there are modified elements:
{
  acknowledged: true,
  modifiedCount: 1, - if this is 0, it means that the request is not a success;
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1
}
<br/>
API/id - **DELETE** - delete a particular recipe (requires authentication and authorization) - doesn't delete the recipe, rather than adding TRUE to a property called "isDeleted" in order to preserve the data, but not return it on GET request
<br/>
API/recipe/browse - **GET** - fetch all recipes on the database(doesn't require authentication or authorization). Returns an array of objects with all recipes in the database. If there are no recipes, it will return an empty array.
<br/>
API/recipe/myRecipes - **GET** - fetch the recipes of the currently logged user (reiquires authentication and authorization). Returns an array of objects representing each recipe, if there are no recipes - returns an empty array.
<br/>
API/recipe/add - **POST** - Requires (authentication and authorization), creates a recipe object in the database. Returns the created object if the request was a success, and error message if a validation failed i.e. - (Validation failed: image: URL, на снимката трябва да е валиден!);
<br/>
