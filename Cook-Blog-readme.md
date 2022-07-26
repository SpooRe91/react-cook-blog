# cook-blog API

IF YOU DOWNLOAD THE WHOLE PROJECT.

BEFORE YOU DO ANYTHING FURTHER:

You need the following commands to statrt the server and to start React project:
--------------------------------------------------------------------------------

SERVER: In the main "server" folder run the commands:

"npm install"

after that:

"npm start"

to start the server. if it is started successfully you should see the

"

"Cook-blog API" listening to port http://localhost:3030

"Cook-blog API" documentation is available at http://localhost:3030/readme

"
-

for the React project, you will need to open the "client" folder in a separate terminal and type in:

"npm install"

after that:

"npm start"

---

**A food recipe Rest API build with Express.js**

![cover](https://user-images.githubusercontent.com/85784810/174287568-5c1a4d6b-6f1c-43f6-b881-31a0e52fafbc.JPG)

**Using the cook-blog-API:**

First off - you can create a file with all the endpoints and export it to whichever file you have your requests:

```js
export const API_URL = "http://localhost:3030";//GET

export const endpoints = {
    //REGULAR + MODIFICATIONS***************
    API_DETAILS: (id) => `${API_URL}/details/${id}`,//GET req
    API_EDIT: (id) => `${API_URL}/edit/${id}`,//PUT req
    API_DELETE: (id) => `${API_URL}/delete/${id}`,//DELETE req
    API_LIKE: (id) => `${API_URL}/like/${id}`,//GET req
    //AUTH**********************************
    API_REGISTER: `${API_URL}/auth/register`,//POST req
    API_LOGIN: `${API_URL}/auth/login`,//POST req
    API_LOGOUT: `${API_URL}/auth/logout`,//GET req
    //RECIPE********************************
    API_BROWSE: `${API_URL}/recipe/browse`,//GET req
    API_MYRECIPES: `${API_URL}/recipe/myRecipes`,//GET req
    API_MACROS: `${API_URL}/recipe/macros`,//GET req
    API_ADD: `${API_URL}/recipe/add`,//POST req
    // *************************************
}
```

**!please make sure to include the following options in each request you make**!!

```js
options = {
            method: 'POST',
            mode: 'cors',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                "Access-Control-Allow-Credentials": true,
            },
<!--             body: JSON.stringify(required data), body is only for POST requests (recipe/add, recipe/edit) -->
        }
```

**API**: "http://localhost:3030"
**README AVAILABLE TO DOWNLOAD**: http://localhost:3030/readme

***AUTH:***

API/auth/register - **POST**
Provide your e-email, password and repeat password. Submit a POST request with the data provided as a body.

example of the REGISTER request:

```js
const userRegister = async (registerData) => {

    try {
        const registerResult = await fetch(endpoints.API_REGISTER, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(registerData),
        });
        return await registerResult.json();
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}
```

API/auth/login - **POST**
Provide your e-email and password so and submit a POST request with the data provided as body.

example of the LOGIN request:

```js
const userLogin = async (loginData) => {

    try {
        const loginResult = await fetch(endpoints.API_LOGIN, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(loginData),
        });
        return await loginResult.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

```

API/auth/logout - **GET**
To make a logout request, simply submit the request itself as shown below:

```js
export const userLogout = async () => {

    try {
        await fetch(endpoints.API_LOGOUT, {
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                'Access-Control-Allow-Credentials': true,
            }
        });
    } catch (error) {
        throw new Error(error.message);
    }
}
```

***RECIPE:***

**API/details/id** - **GET** - fetch the details of a particular recipe - doesn't require authentication. Returns an oject with the information about the current item. If there is no such item, it will return an error message: "Resource not found!"
example of a DETAILS request function, where API_DETAILS is: ttp://localhost:3030/details/id(the id of the current recipe);

```js
const getOne = async (mealId) => {

    try {
        const res = await fetch(endpoints.API_DETAILS(mealId), {
            mode: 'cors',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                "Access-Control-Allow-Credentials": true,
            },
        })
        return await res.json();
    } catch (error) {
        throw new Error(error.message);
    }
};
```

API/recipe/add - **POST** - Requires (authentication and authorization), creates a recipe object in the database. Returns the created object if the request was a success, and error message if a validation failed i.e. - (Validation failed: image: URL, на снимката трябва да е валиден!);

example of an ADD request:
API_ADD = http://localhost:3030/edit/id - (id of the meal)

```js
const create = async (createData) => {

    try {
        const creteResult = await fetch(endpoints.API_ADD, {
            method: "POST",
            mode: 'cors',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(createData),
        });
        return await creteResult.json();

    } catch (error) {
        throw new Error(error.message)
    }
}
```

**API/edit/id** - **PUT** - update/edit a current recipe (requires authentication and authorization). Returns information in JSON format, if the requst is acknowledged and if there are modified elements:
{
  acknowledged: true,
  modifiedCount: 1, - if this is 0, it means that the request is not a success;
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1
}

example of an EDIT request function:

```js
const editMeal = async (mealId, mealData) => {
  
    try {
        const editStatusInfo = await fetch(endpoints.API_EDIT(mealId), {
            method: "PUT",
            mode: 'cors',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(mealData),
        });
        return await editStatusInfo.json();

    } catch (error) {
        throw new Error(error.message)
    }
}
```

API/like/id - **GET** - get the likes for a particular item, returns an array of all user IDs, who liked this picture

example of a LIKE request:

```js
const addLike = async (mealId) => {

    try {
        const creteResult = await fetch(endpoints.API_LIKE(mealId), {
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                'Access-Control-Allow-Credentials': true,
            }

        });
        return await creteResult.json();
    } catch (error) {
        throw new Error(error.message)
    }
}
```

**API/delete/id** - **DELETE** - delete a particular recipe (requires authentication and authorization) - doesn't delete the recipe, rather than adding TRUE to a property called "isDeleted" in order to preserve the data, but not return it on GET request
example of a delete request:
API_DELETE = http://localhost:3030/delete/id - (id of the recipe)

```js
const deleteMeal = async (mealId) => {

    try {
        const deleteStatus = await fetch(endpoints.API_DELETE(mealId), {
            method: "DELETE",
            mode: 'cors',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                "Access-Control-Allow-Credentials": true,
            },
        });
        return deleteStatus;

    } catch (error) {
        throw new Error(error.message)
    }
}
```

API/recipe/browse - **GET** - fetch all recipes on the database(doesn't require authentication or authorization). Returns an array of objects with all recipes in the database. If there are no recipes, it will return an empty array.

example of a BROWSE request, API_BROWSE = http://localhost:3030/recipe/browse

```js
const getAll = async () => {

    try {
        const res = await fetch(endpoints.API_BROWSE, {
            mode: 'cors',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                "Access-Control-Allow-Credentials": true,
            }
        });
        return await res.json();
    } catch (error) {
        throw new Error(error.message)
    }
};
```

API/recipe/myRecipes - **GET** - fetch the recipes of the currently logged user (reiquires authentication and authorization). Returns an array of objects representing each recipe, if there are no recipes - returns an empty array.
example of a myRecipes request:
API_MYRECIPES = http://localhost:3030/recipe/myRecipes

```js
const getOwn = async () => {

    try {
        const res = await fetch(endpoints.API_MYRECIPES, {
            mode: 'cors',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Allow-Control-Access-Policy': true,
                "Access-Control-Allow-Credentials": true,
            }
        });
        return await res.json();
    } catch (error) {
        throw new Error(error.message)
    }
};
```
