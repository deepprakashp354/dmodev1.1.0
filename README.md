# DMODE V1.0.0

DMODE stands for Django's Structure With Mongodb On Node Platform. DMODE basically is MVT(Model View Template) programming structure for node, that provides Modularity, structuring and easy implementation of things like Socket, routing etc. One can make an entire project using plain javascript.

### Prerequisites

```
Node
```

### Installing

1. Linux

```
Step 1 Download get-dmode.sh [click here...](https://s3.us-east-2.amazonaws.com/dmodev2.0.1/linux/get-dmode.sh)

Step 2 Open terminal in get-dmode.sh directory and run the following commands :

$ chmod u+x get-dmode.sh
$ ./get-dmode.sh intall

```

2. Windows

```
Step 1 Download get-dmode.sh [click here...](https://s3.us-east-2.amazonaws.com/dmodev2.0.1/windows/dmode-win-v2.0.1.zip)

Step 2 Extract dmode-win-v2.0.1.zip

Step 3 Move inside the extracted folder

Step 4 double-click on setup.bat

```

3. Mac

```
Step 1 Download get-dmode.sh [click here...](https://s3.us-east-2.amazonaws.com/dmodev2.0.1/mac/dmode-mac-v2.0.1.zip)

Step 2 Extract dmode-mac-v2.0.1.zip

Step 3 Open terminal inside the extracted folder

Step 4 Run the following commands

$ chmod u+x setup.sh
$ ./setup.sh install

```

Final Step : Installation done, run following command to verify

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


### More features :-

### Imports :
1. imports

```
imports('db'); // imports takes dmode libs
imports('fs'); // node modules
imports('./../<appname>/models.js') // Any relative urls
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
### DB : Mongoose

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

Note : For reference [Mongoose Documentation](http://mongoosejs.com/docs/api.html)

```
### Live DB :-

```
<appname>/models.js

var db = imports('db');
var self = imports('test');

var TestSchema = {
	name : {
		type : String,
		trim : true,
		required : true 
	},
	live : true, // live model
	callback : self.socket.getNewTest, // callback to get new row added to table
	interval : 4000 // interval of checking the table for new data
}

var Test = db.models('Test', TestSchema);

exports.Test = Test;

_________________________________________________________________________________

<appname>/socket.js

exports.getNewTest = function(transporter, data){
	// transporter.emit("event", {data : "some data"}, users)
	// users => array(optional) of user_id
	
	transporter.emit("test", {name : "Deep Prakash"})
}


```

### Push Notification Service

```
// import notification module

var notification = require('./../libs/services/notification/notification');

// notification payload

var data = {
	title : "Notification Title",
	message : "Notification Message",
	tapAction : "com.officeshop.dmode_receiver.MainActivity",
	actions : [{
		name : "OPEN",
		intent : "com.officeshop.dmode_receiver.MainActivity"
	}]
}

// Pusing notification to devices

notification.push(data, user); // user => array(optional)

Exposed Global variables

1. NOTIFICATION_SOCKET_IO // global socket param

2. NOTIFICATION_SOCKET_USERS; // socket => user mapping

3. NOTIFICATION_CONNECTED_USERS; // socket_id => socket mapping

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


Exposed Global Variables

1. SOCKET_IO // global socket param

2. SOCKET_USERS // socket => user mapping

3. global.CONNECTED_USERS // socket_id => socket mapping

``` 

### CORS : 

```
settings.js

// CORS Middleware
exports.ALLOW_CORS = true;

// CROSS ORIGIN
exports.ALLOW_ORIGIN = [
	"*",
	"your origins",
	.
	.
	.
]

// ALLOW HEADERS
exports.ALLOW_HEADERS = [
	"Origin",
	"X-Requested-With",
	"Content-Type",
	"Accept",
	"Authorization"
]

// ALLOW OPTIONS
exports.ALLOW_OPTIONS = [
	"GET",
	"POST",
	"OPTIONS",
	"PUT",
	"PATCH",
	"DELETE"
]

```

### Auth Middleware

```
settings.js

1. fill the array with the api names, that you don't want to be authenticated.

// EXCLUDE_AUTH
exports.EXCLUDE_AUTH=[
	'/user/login/',
	'/user/register/',
	.
	.
	.
]

```

### Permissions

```
You can validate the permissions or you can get the current user permission.

1. import Permissions Module

var Permissions = imports('Permissions');

2. validate

Permissions.validate(request, "PERMISSION_NAME_YOU_ADDED"); // returns boolean

3. get

Permissions.get(access_token).then(function(result){
	// result = {
	//		group : "SUPER_ADMIN",
	//		permissions : [
	//			"SU_PERMISSIONS"
	//		]
	//  }
}).catch(function(err){
	
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

### Form

```
1. Import form

var Form = imports('Form');

2. Form.get()

Form.get(request).then(function(body){
	// body = {
	//	 files : {},
	//	 fields : {}
	// }
}).catch(function(err){
	
})

3. Form.upload()

Form.get(request).then(function(body){
	// upload form data	
	Form.upload(body.files, '/path/to/upload').then(function(result){

	}).catch(function(err){

	})

}).catch(function(err){
	
})

```

### User Management

1. Importing AuthUser

```
var auth = imports('AuthUser');

```
2. auth.login()

```
var authUser = auth.login(username,password).then(function(result){
	
}).catch(function(err){
	
});

```
3. auth.register()

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
4. auth.logout()

```
var logout = auth.logout(request).then(function(result){
	
}).catch(function(err){
	
});

```
6. Get logged in user

```
var user = request.user;

```

7. auth.getUsers()

```
var users = auth.getUsers({_id : "some_id", ...}).then(function(result){
	// result is the user data returned
}).catch(function(err){
	
})

```

8. auth.addPermission()

```
var p = auth.addPermission("PERMISSION_TO_BE_ADDED").then(function(result){
	
}).catch(function(err){
	
})

```

9. auth.viewPermission()

``` 
var p = auth.viewPermission(id).then(function(result){
	
}).catch(function(err){
	
})

Note : id parameter is optional. you can pass nothing to get all the permissions

```

10. auth.addUserGroup()

```
var data = {
	name : value,	// user group name
	permissions : perm 	// array of permission ids
}

var ug = auth.addUserGroup(data).then(function(result){

}).catch(function(err){
	
})

```

11. auth.viewUserGroup()

```
var ug = auth.viewUserGroup(id).then(function(result){
	
}).catch(function(err){
	
})

id parameter is optional. you can pass nothing to get all the user groups

```
12. auth.loggedInUsers()

```
Returns If user(s) is/are logged in or not.

var users = auth.loggedInUsers(user_id).then(function(result){
	
}).catch(function(err){
	
})

Note : user_id can be a string or array of string user_ids

```