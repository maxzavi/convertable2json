# Convert txt to Json by LPN Comex

Create node project:

```cmd
npm init -y
```

Add module express with npm

```cmd
npm install express
````

Add index.js

```js
const express = require('express');
const app = express();

app.use(express.json());

//Routes
app.get('/', (rq,rs)=>{
    const result={
        "message":"Hello world!!!"
    };
    rs.json(result);
})

//Listener
app.listen(3000, ()=>{
    console.log("Listen in port 3000");
});
```

## Nodemon
Add nodemon as a development dependency:
```cmd
npm i -D nodemon
```

Add npm run command in package.json file:
```json
  "scripts": {


    "nodemon": "nodemon index"
  },
```

Run watch:

```cmd
npm run nodemon
```

For read plain text, add **body-parser** dependency:

```cmd
npm i body-parser
```

And add midleware in index.js: app.use(bodyParser.text());


```js
const bodyParser = require('body-parser')
//Add midleware
app.use(bodyParser.text());
//Routes
app.post('/', (rq,rs)=>{
```

Curl:

```cmd
curl --location 'localhost:3000' \
--header 'Content-Type: text/plain' \
--data '9492049	498/23-02	EISU1841476	CX0009492049000423	CX0009492049000502	20362241		80	1
9492049	498/23-02	EISU1841476	CX0009492049000506	CX0009492049000585	20362242		80	1
9492049	498/23-02	EISU1841476	CX0009492049000589	CX0009492049000673	20362336		85	1
9492049	498/23-02	EISU1841476	CX0009492049000677	CX0009492049000751	20362337		75	1
9492049	498/23-02	EISU1841476	CX0009492049000606	CX0009492049000685	20362242		80	4'
```


