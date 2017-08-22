# DMODE V1.0.0

DMODE stands for Django's Structure With Mongodb On Node Platform. DMODE basically is MVT(Model View Template) programming structure for node, that provides Modularity, structuring and easy implementation of things like Socket, routing etc. One can make a entire project using plain javascript.

### Prerequisites

```
Node
```

### Installing

Step 1 Download get-dmode.sh [click here...](http://www.officeshop.co.in/dmode/)

Step 2 Open terminal in get-dmode.sh directory and run the following commands :

```
$ chmod u+x get-dmode.sh
$ ./get-dmode.sh intall

```

Step 3 Installation done, run following to verify

```
$ dmode

```

## Write your first dmode project

Step 1 Create a project folder 'dmode-test' and open terminal in inside it.

Step 2 Install Dependencies

```
$ dmode install

```

Step 3 Start Project

```
$ dmode startproject

```

Step 4 Fill a simple console form and your project structure will be installed in your project directory

Step 5 Run the server. Open [http://localhost:8080/](http://localhost:8080/) to test.

```
$ npm run dev

```

Step 6 Create App

```
$ dmode createapp <appname>

```

Step 7 Open 'views.js' from '<appname>' folder, you'll find a index function that has been provided for first time user.

Step 8 Open 'url.js' from '<appname>' folder, uncomment the url.

```
var views = require('./views.js');

module.exports = {
	index : views.index
}

```
Step 9 Add your app to 'settings.js'

```
exports.root = __dirname+'/src';
exports.projectname = 'v1dmode';
exports.secret = 'LetsfindthewayoutthereV.1';

// database credentials
exports.db = { 
	database : 'osdb',
	host : '127.0.0.1',
	username : 'deep',
	password : 'deep',
	authSource : 'admin'
}

// fonts
exports.fonts = [
	'RobotoCondensedBold.ttf',
]

exports.INSTALLED_APPS=[
	//'your app name'
	'<appname>'
]

```

Step 10 Import your app to 'urls.js' inside '<projectname>' folder.

```
var appname = imports('<appname>');

```

Step 11 Map your api to a url.

```
exports.api = function(router){
	method.page(router, '/', '/index.html')
	method.get(router, '/index', appname.index)
}

```

Step 12 Open [http://localhost:8080/index](http://localhost:8080/index), you'll see the response of your index api.

```
{data : 'Hello DMODE!'}

```


### More fetures :-

### Imports :
1. imports
2. importSocket

### Reponse : 
1. HttpResponse(response, data)
2. render(string)
3. renderToResponse(response, path, data)

### DB :

### Socket : 

### Secure : 

### Custom Fonts : 

### Methods
