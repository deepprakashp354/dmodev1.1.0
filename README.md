# DMODE V1.0.0

DMODE stands for Django's Structure With Mongodb On Node Platform. DMODE basically is MVT(Model View Template) programming structure for node, that provides Modularity, structuring and easy implementation of things like Socket, routing etc. One can make an entire project using plain javascript.

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
$ dmode -v

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

Step 7 Open 'views.js' from 'appname' folder, you'll find a index function that has been provided for first time user.

Step 8 Open 'url.js' from 'appname' folder, uncomment the url.

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
	'Roboto-Regular.ttf',
]

exports.INSTALLED_APPS=[
	//'your app name'
	'<appname>'
]

```

Step 10 Import your app to 'urls.js' inside 'projectname' folder.

```
var appname = imports('<appname>');

```

Step 11 Map your api to a url.

```
exports.api = function(router){
	method.page(router, '/', '/index.html')
	method.get(router, '/index', appname.urls.index)
}

```

Step 12 Open [http://localhost:8080/index](http://localhost:8080/index), you'll see the response of your index api.

```
{data : 'Hello DMODE!'}

```


### More fetures :-

### Imports :
1. imports

```
imports('db'); // imports takes dmode apis
imports('fs'); // node modules
imports('<appname>'); // <appname>.urls.apiname or <appname>.socket.socketevent or <appname>.models.modelname

```
2. importSocket

```
importSocket('<appname>') // imports socket of <appname> explicitly

```

2. importModel

```
importModel('<appname>') // imports model of <appname> explicitly

```

### Response : 
1. HttpResponse(response, jsonData)

```
HttpResponse(response, {test : "Hello DMODE!"}) // returns response of apis in json format

```

2. render(response, string)

```
render(response, "Hello DMODE!"); // returns response of apis as string

```
3. renderToResponse(response, path, data)

```
renderToResponse(response, '/index', {message : "Hello DMODE!"});

index.html

<h2>{{message}}</h2>

```
### DB : for reference [Mongoose Documentation](http://mongoosejs.com/docs/api.html)

```
<appname>/models.js

var db = imports('db');

var userScema = {
 	username:{ type: String, required: true, unique: true },
 	password:{ type: String, required: true },
 	fname:{ type: String, required: true },
 	lname:{ type: String, required: true },
 	phno:{ type: String, required: true, unique:true },
 	address:{ type: String, required: true },
};

var User = db.models('user', userSchema); //db.models('tablename', schema);

exports.User = User;
_________________________________________________________________________________

<appname>/views.js

var appname = imports('<appname>'); // you can also use importModel()

appname.models.User.find(data).then(function(resp){
	
	// console.log(resp);

}.catch(function(error){

	// console.log(error);

}

```

### Socket : Create app first. then :-

```
settings.js

exports.INSTALLED_APPS=[
	//'your app name'
	'<appname>'
]
___________________________________________________________________________________

<appname>/socket.js

// Your socket events here
exports.testSocket = function(socket){
	 socket.emit('target', 'message')
	 // socket.on('event', callback) to trigger a socket event
}
___________________________________________________________________________________

<projectname>/urls.js

var appname = imports('<appname>'); // you can also use importSocket()

// connect your socket events
exports.sockets = function(){
	return {
		test : appname.socket.testSocket,
	}
}
__________________________________________________________________________________

src/static/js/socketEvents.js

socket.on('target', function(data){
	alert(data);
})

``` 

### Secure : 

```
var Secure = imports('Secure');

Secure.encode("somedata/password");

```

### Custom Fonts :

* Copy your ttf or wof file inside src/static/fonts/
* open settings.js

```
// fonts
exports.fonts = [
	'Roboto-Regular.ttf',
]

```
* Run migratefonts command

```
$ dmode migratefonts

```

### Methods

```
<projectname>/urls.js

method.page(router, '/route', '/index.html');

method.get(router, '/route', app.urls.getrequestapi);

method.post(router, '/route', app.urls.postrequestapi);

method.put(router, '/route/:data', app.urls.putrequestapi);

method.delete(router, '/route', app.urls.deleterequesteapi);
```

### Templates

1. Plain Html Template

```
$ dmode startproject

```

2. React Template

```
$ dmode startproject react-template

```

3. React-Redux Template

```
$ dmode startproject react-redux-template

```

### User Management

1. Importing Auth

```
var auth = imports('AuthUser');

```

2. Auth.login()

```
var authUser = auth.login(username,password).then(function(result){
	
}).catch(function(err){
	
});

```

3. Auth.register()

```
var params = {
	fullname : "admin",
	email : "xyz@email.com",
	password : "asdfghjkl",
	phone : "9087654321"	
}

var reg = auth.register(params).then(function(result){
	
}).catch(function(err){
	
});

```

4. Auth.logout()

```
var logout = auth.logout(request).then(function(result){
	
}).catch(function(err){
	
});

```

5. Exclude api token authorization

```
settings.js

exports.EXCLUDE_AUTH = [
	'/user/login/',
	'/user/register/',
]

``` 

6. Get logged in user

```
var user = request.user;

```


