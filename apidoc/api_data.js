define({ "api": [
  {
    "type": "get",
    "url": "/",
    "title": "Home",
    "name": "Home",
    "group": "DefaultController",
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
            "description": "<p>Welcome!.</p>"
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
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "error.code",
            "description": "<p>403</p>"
          },
          {
            "group": "Error 4xx",
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
    "version": "0.0.0",
    "filename": "app/routers/appRouter.js",
    "groupTitle": "DefaultController"
  }
] });
