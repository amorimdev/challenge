define({ "api": [
  {
    "type": "get",
    "url": "/",
    "title": "Home",
    "name": "Home",
    "group": "Default",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "success",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success.message",
            "description": "<p>Welcome!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": {\n    \"message\": \"Welcome!\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "403": [
          {
            "group": "403",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": ""
          },
          {
            "group": "403",
            "type": "Number",
            "optional": false,
            "field": "error.code",
            "description": "<p>403</p>"
          },
          {
            "group": "403",
            "type": "String",
            "optional": false,
            "field": "error.message",
            "description": "<p>You not have permission to access the page.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"error\": {\n    \"code\": 403,\n    \"message\": \"You not have permission to access the page.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routers/appRouter.js",
    "groupTitle": "Default"
  },
  {
    "type": "put",
    "url": "/user",
    "title": "Edit",
    "name": "EditUser",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Name of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>Email of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>Password of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "zipcode",
            "description": "<p>Zipcode of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"name\": \"Jhonatan Amorim\",\n  \"email\": \"amorim.dev@gmail.com\",\n  \"password\": \"123\",\n  \"zipcode\": \"05735030\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "success",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success.message",
            "description": "<p>Account successfully updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": {\n    \"message\": \"Account successfully updated.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": ""
          },
          {
            "group": "400",
            "type": "Number",
            "optional": false,
            "field": "error.code",
            "description": "<p>400</p>"
          },
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "error.message",
            "description": "<p>Invalid Zip Code.</p>"
          }
        ],
        "409": [
          {
            "group": "409",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": ""
          },
          {
            "group": "409",
            "type": "Number",
            "optional": false,
            "field": "error.code",
            "description": "<p>409</p>"
          },
          {
            "group": "409",
            "type": "String",
            "optional": false,
            "field": "error.message",
            "description": "<p>Email already in use.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": {\n    \"code\": 400,\n    \"message\": \"Invalid Zip Code.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"error\": {\n    \"code\": 409,\n    \"message\": \"Email already in use.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routers/appRouter.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login",
    "name": "LoginUser",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"email\": \"amorim.dev@gmail.com\",\n  \"password\": \"123\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "success",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success.message",
            "description": "<p>Successfully login.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": {\n    \"message\": \"Successfully login.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": ""
          },
          {
            "group": "401",
            "type": "Number",
            "optional": false,
            "field": "error.code",
            "description": "<p>401</p>"
          },
          {
            "group": "401",
            "type": "String",
            "optional": false,
            "field": "error.message",
            "description": "<p>Authentication failed.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Bad Request\n{\n  \"error\": {\n    \"code\": 401,\n    \"message\": \"Authentication failed.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routers/appRouter.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/logout",
    "title": "Logout",
    "name": "LogoutUser",
    "group": "User",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "success",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success.message",
            "description": "<p>Successfully logout.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": {\n    \"message\": \"Successfully logout.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "403": [
          {
            "group": "403",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": ""
          },
          {
            "group": "403",
            "type": "Number",
            "optional": false,
            "field": "error.code",
            "description": "<p>403</p>"
          },
          {
            "group": "403",
            "type": "String",
            "optional": false,
            "field": "error.message",
            "description": "<p>You not have permission to access the page.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"error\": {\n    \"code\": 403,\n    \"message\": \"You not have permission to access the page.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routers/appRouter.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/signup",
    "title": "Signup",
    "name": "SignupUser",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "zipcode",
            "description": "<p>Zipcode of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"name\": \"Jhonatan Amorim\",\n  \"email\": \"amorim.dev@gmail.com\",\n  \"password\": \"123\",\n  \"zipcode\": \"05735030\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "success",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success.message",
            "description": "<p>Account successfully created.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": {\n    \"message\": \"Account successfully created.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": ""
          },
          {
            "group": "400",
            "type": "Number",
            "optional": false,
            "field": "error.code",
            "description": "<p>400</p>"
          },
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "error.message",
            "description": "<p>Please, fill in all the fields. OR Invalid Zip Code.</p>"
          }
        ],
        "409": [
          {
            "group": "409",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": ""
          },
          {
            "group": "409",
            "type": "Number",
            "optional": false,
            "field": "error.code",
            "description": "<p>409</p>"
          },
          {
            "group": "409",
            "type": "String",
            "optional": false,
            "field": "error.message",
            "description": "<p>Email already in use.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": {\n    \"code\": 400,\n    \"message\": \"Please, fill in all the fields.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": {\n    \"code\": 400,\n    \"message\": \"Invalid Zip Code.\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"error\": {\n    \"code\": 409,\n    \"message\": \"Email already in use.\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routers/appRouter.js",
    "groupTitle": "User"
  }
] });
