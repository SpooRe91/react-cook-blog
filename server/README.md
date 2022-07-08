# cook-blog API

**A food recipe Rest API build with Express.js**
<br/>
![cover](https://user-images.githubusercontent.com/85784810/174287568-5c1a4d6b-6f1c-43f6-b881-31a0e52fafbc.JPG)

**Using the cook-blog-API:**

**API**: "http://localhost:3030"

***REGULAR:***
<br/>
API/ - **GET**
<br/>
API/details/id - **GET** - fetch the details of a particular recipe - doesn't require authentication
<br/>
API/edit/id - **PUT** - update/edit a current recipe (requires authentication and authorization)
<br/>
API/id - **DELETE** - delete a particular recipe (requires authentication and authorization)

***AUTH:***
<br/>
API/auth/register - **POST**
<br/>
API/auth/login - **POST**
<br/>
API/auth/logout - **GET**

***RECIPE:***
<br/>
API/recipe/browse - **GET** - fetch all recipes on the database
<br/>
API/recipe/myRecipes - **GET** - fetch the recipes of the currently logged user (if any)
<br/>
API/recipe/add - **POST** - add a recipe whenver you are logged in (requires authentication)
