# DMODE V2.0.1
**DMODE** stands for **D**jango's Structure With **M**ongoDB On N**ode**.js. DMODE is a MVT structured Node.js web application framework that provides simplest ways to accomplish some of the most complex web tasks, with features like Cli based project setup, Inbuilt User Access Management and Token authentication, Easily configurable CORS, liveDB on MultiDB support, Easy socket implementation, In-framework Push Notification System etc.

**I.** **MVT Structure**
**M**odel **V**iew **T**emplate, Which comes with DJango. MVT is slightly different from MVC, the main difference is that controller is handled by the framework itself to reduce the development complexities. Some benefits are :
 1. Apps are Modularized.
 2. If you've to remove an app, it is as simple as removing a directory.
 3. You can just copy and paste any reusable app made on dmode.

**II.** **CLI**
DMODE has its command line interface that reduces your time of setting up projects, creating apps etc.

> **Some Basic Commands**
> $ dmode install
> $ dmode startproject
> $ dmode createapp [appname]
> $ dmode migratefonts

**III.** **LIVE DB**
DMODE has in-framework, live db support. LiveDB means a Model monitoring itself, if it finds any change, it reflects it to a callback. Creating a realtime application is just a matter of minutes if you've this feature in your framework itself. Right now DMODE is very specific to MongoDB with Mongoose.

**IV.** **In-Framework Push Notification System**
For Services like push notification, one has to move to other services, that takes another time to Set it up, plus the Cost. DMODE provides In-Framework Push Notification System, i.e, Creating a notification system in DMODE is like calling some functions.

## Prerequisite

> Node

## Installation

**Linux**

Step 1 : Download get-dmode.sh [click here](https://s3.us-east-2.amazonaws.com/dmodev2.0.1/linux/get-dmode.sh)
Step 2 : Open terminal in get-dmode.sh's directory and run the following commands :
```
$ chmod u+x get-dmode.sh
$ ./get-dmode.sh intall
```
**Windows**

Step 1 : Download Installation files [click here...](https://s3.us-east-2.amazonaws.com/dmodev2.0.1/windows/dmode-win-v2.0.1.zip)
Step 2 : Extract dmode-win-v2.0.1.zip
Step 3 : Move inside the extracted folder
Step 4 : double-click on setup.bat

**Mac**

Step 1 : Download Insallation files [click here...](https://s3.us-east-2.amazonaws.com/dmodev2.0.1/mac/dmode-mac-v2.0.1.zip)
Step 2 : Extract dmode-mac-v2.0.1.zip
Step 3 : Open terminal inside the extracted folder and run the following commands
```
$ chmod u+x setup.sh
$ ./setup.sh install
```

**Verify Installation**
Run the following command to verify your installation.
```
$ dmode -v
```

## Write your first dmode project
***Step 1*** : Create a project folder with name 'TestProject' and open terminal inside.

***Step 2*** :  Install Dependencies
It installs all the initial dependencies for the project and creates package.json file.
```
$ dmode install
```

***Step 3*** : Start Project
Start project command sets up the node project according to the MVT project structure guidelines.
```
$ dmode startproject
```

***Step 4*** : Fill up the simple console form, that will be used in setting up variables that you can modify from settings.js

***Step 5*** : After you are done with the project setup. Run the server and Open [http://localhost:8080/](http://localhost:8080/) to verify everything worked correctly.
```
$ npm run dev
```

***Step 6*** : Create App
In MVT, every module is called as app. You can create app by a simple command :
```
$ dmode createapp [appname]
```
***Step 7*** : Create App creates a application folder having four files.
* views.js - It allows you to write all the apis of [appname] module at one place
* models.js - It allows you to write all the models of [appname] module at one place. It is basically a Mongoose Model, that can be exported anywhere.
* urls.js - This is the place where you map all your apis to give it to urls.js inside TestProject folder, that is basically the Main Urls of the project.
* socket.js - Here you can write any socket event or callback to LiveDB

***Step 8*** : Open views.js, you'll see a prebuilt api function for First Time User.
```
var HttpResponse = imports('response').HttpResponse;

exports.index = function(request, response){
	HttpResponse(response, {data : "Hello DMODE!"}, 200);	
}
```
***Step 9*** : Map the api function in views.js to app's urls.js
```
var views = require('./views.js');

module.exports = {
	index : views.index
}
``` 
***Step 10*** :  Submit your app to the project. You can do it by add it to INSTALLED_APP array in settings.js
```
## settings.js

// INSTALLED_APPS
exports.INSTALLED_APPS=[
	'[appname]',
]
```

***Step 11*** : Map the api function of your app to the url (TestProject/urls.js).
 

**i. Import you app**
```
var appname = imports('[appname]');
```
**ii. Choose appropriate method and Map your url. Here we're choosing method.get()**
```
exports.api = function(router){
	method.page(router, '/', '/index.html')
	method.get(router, '/index', appname.urls.index)
}
```

***Step 12*** : Open [http://localhost:8080/index](http://localhost:8080/index), you'll see the response of your api.
```
{data : 'Hello DMODE!'}
```

# DMODE APIS

## Imports.js

**1. Imports**
Imports basically is a very generic function written over require.js. It can import any npm module, dmode app, dmode libs or any relative/absolute path provided. Here's how it works :-
```
imports('db'); // imports takes dmode libs
imports('fs'); // node modules
imports('./../<appname>/models.js') // Any relative urls
imports('<appname>'); // <appname>.urls.apiname or <appname>.socket.socketevent or <appname>.models.modelname
```
**2. ImportModel**
ImportModel allows to import any app's model explicitly.
```
importModel('<appname>') // imports model of <appname> explicitly
```
**3. ImportSocket**
ImportSocket allows to import any app's socket explicitly
```
importSocket('<appname>') // imports socket of <appname> explicitly
```
## Reponse.js

**1. HttpResponse**
HttpResponse helps you to respond with a JSON data. 
```
var HttpResponse = imports('response').HttpResponse;

exports.index = function(request, response){
	var resp = {
		status : true,
		message : "success",
		data : {message : "Hello DMODE!"}
	};
	var code = 200;
	
	HttpResponse(response, resp, code)
}
```

**2. render**
render funciton returns a string response.
```
var HttpResponse = imports('response').render;

exports.index = function(request, response){
	var resp = "Hello DMODE!";
	var code = 200;
	
	render(response, resp, code)
}
```
**3. renderToResponse**
renderToResponse allows you to render an HTML and pass JSON data to the HTML. This can be used for templating. It internally uses SWIG.
```
var HttpResponse = imports('response').renderToResponse;

exports.index = function(request, response){
	var jsonData = {
		title : "DMODE",
		message : "Hello DMODE!"
	}
	var code = 200;
	
	renderToResponse(response, '/index.html', jsonData, code)
}

index.html
<h1>{{title}}</h1>
<h3>{{message}}</h3>
```

## Api.js (Methods)
Api.js provides different methods that can be used to create a REST or Non-REST api system. Methods such as get, post, put, delete comes inside method class. Usage :-

**1. Importing**
```
var api = imports('api');
var Method = api.method;
```
**2. Method.page**
Method.page maps a HTML document to URL. It can be used for Backend based page routing in HTML-Template.
```
exports.api = function(router){
	Method.page(router, '/route', '/index.html')
}
```
**3. Method.get**
Method.get maps a get Method api with the url. Queries can be passed to URL itself.
```
var appname = imports('appname') // app

exports.api = function(router){
	Method.get(router, '/route', appname.urls.getrequestapi)
}
```
**4. Method.post**
Method.post maps a post Method api with the url. Queries are retrieved from the body.
```
var appname = imports('appname') // app

exports.api = function(router){
	Method.post(router, '/route', appname.urls.postrequestapi)
}
```
**5. Method.put**
Method.put maps a put Method api with the url.
```
var appname = imports('appname') // app

exports.api = function(router){
	Method.put(router, '/route/:data', appname.urls.putrequestapi);
}
```

**6. Method.delete**
Method.delete maps a delete Method api with the url.
```
var appname = imports('appname') // app

exports.api = function(router){
	Method.delete(router, '/route', app.urls.deleterequesteapi);
}
```

## Auth.js
Auth.js is a Middleware  that takes care of token based access management system. DMODE system uses JWT Token by default. Here is how it works :
```
**server.js**

// creating server
const server = http.createServer(app);

app.use(Cors.allow);
app.use(Auth.token); // Auth Middleware
app.use('/', api);
```
**Removing Api authentication**
```
**settings.js**

// EXCLUDE_AUTH
exports.EXCLUDE_AUTH=[
	'/user/login/',
	'/user/register/',
	'/your/apis/to/exclude/auth'
]
```
## Cors.js
Cross-Origin Resource Sharing. For security purpose, apis are not allowed to access from external origin. But, What if you want to make a public api. Here's what you can do : 

**1. Allow Cross Origins**
```
settings.js

// CORS Middleware
exports.ALLOW_CORS = true;
```
**2. Define which origins to allow**
```
settings.js

// CROSS ORIGIN
exports.ALLOW_ORIGIN = [
	"your origins",
	.
	.
	.
]

Note : If you want to allow all, you can just provide "*"
```
**3. Define which headers to allow**
```
settings.js

// ALLOW HEADERS
exports.ALLOW_HEADERS = [
	"Origin",
	"X-Requested-With",
	"Content-Type",
	"Accept",
	"Authorization"
]
```

**4. Define which options to allow**
```
settings.js

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

## Permissions.js
Permissions.js allows you to validate permission for a request or to get all the allowed permissions of the user. Here's how you can do it :

**1. Import Permission Module**
```
var Permissions = imports('Permissions');
```
**2. Permissions.validate**
```
Permissions.validate(request, "PERMISSION_NAME_YOU_ADDED"); // returns boolean
```
**3. Permission.get**
```
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

## Form.js
Form.js Internally uses formidable to parse form data. It has get method that parses and returns the files & fields of the multipart form. Also it has an upload method that makes uploading files easier. Here's how you can do this : 

**1. Import Form**
```
var Form = imports('Form');
```
**2. Parse Form data**
```
Form.get(request).then(function(body){
	// body = {
	//	 files : {},
	//	 fields : {}
	// }
}).catch(function(err){
	
})
```
**3. Upload Multipart Form data**
```
Form.get(request).then(function(body){
	// upload form data	
	Form.upload(body.files, '/path/to/upload').then(function(result){

	}).catch(function(err){

	})

}).catch(function(err){
	
})
```
## Secure.js
Secure.js internally uses cryptojs to encode data. Here's how you can do this :
```
var Secure = imports('Secure');

Secure.encode("somedata/password");
```
## Soket Implementation
***Step 1*** : Create app and add it to INSTALLED_APPS in settings.js
```
settings.js

exports.INSTALLED_APPS=[
	//'your app name'
	'<appname>'
]
```
***Step 2*** : open app/socket.js and write the event
```
// Your socket events here
exports.testSocket = function(socket){
	 socket.emit('target', 'message')
	 // socket.on('event', callback) to trigger a socket event
}
```
***Step 3*** : Map the event to the MAIN URL from where server will initiate the event.
```
<projectname>/urls.js

var appname = imports('<appname>'); // you can also use importSocket()

// connect your socket events
exports.sockets = function(){
	return {
		test : appname.socket.testSocket,
	}
}
```

***Step 4*** : Getting it on client
```
src/static/js/socketEvents.js

socket.on('target', function(data){
	alert(data);
})
```
**Some global variables exposed** :
1. SOCKET_IO // global socket param

2. SOCKET_USERS // socket => user mapping

3. global.CONNECTED_USERS // socket_id => socket mapping
 
## DB - MongoDB
DMODE uses Mongoose for models. In Mongoose Models are created as schema object and passed to model method. This model is then exported and used for query. Here's how you can do this : 

**1. Creating Mongoose Schema**
```
[appname]/models.js

var db = imports('db');

var userScema = {
 	username:{ type: String, required: true, unique: true },
 	password:{ type: String, required: true },
 	fname:{ type: String, required: true },
 	lname:{ type: String, required: true },
 	phno:{ type: String, required: true, unique:true },
 	address:{ type: String, required: true },
};
```

**2. Creating Model with the schema**
```
var User = db.models('user', userSchema); //db.models('tablename', schema);
```
**3. Exporting Model**
```
exports.User = User;
```
**4. Query**
```
[appname]/views.js

var appname = imports('[appname]'); // you can also use importModel()

var data = {_id : "5as6768s73847394839"}
appname.models.User.find(data).then(function(resp){
	// console.log(resp);
}.catch(function(error){
	// console.log(error);
}

Note : For reference check [Mongoose Documentation](http://mongoosejs.com/docs/api.html)
```

## LiveDB
DMODE provides live db support, that is just provide callback and interval to the mongoose schema and get the live monitoring on the model. Here's how you can do this :

**1. Creating a Live Model** 
You've to use there additional parameters as key of the general mongoose schema.
**i) live** - boolean
Tells the framework that this model has to be monitored
**ii) callback** - function
This is the function where you want to get the modified/added row(s). It also gets a transporter parameter that allows to push it to connected socket client.
**iii) interval** - integer
You can provide an integer value that is basically a time in miliseconds. Model is monitored on every this interval.
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
```
**2. Getting the callback**
Callback function gets the row that has been updated or added. In addition it also gets the transporter parameter which can be used for transporting the data to clients connected to the socket.
```
<appname>/socket.js

exports.getNewTest = function(transporter, data){
	// transporter.emit("event", {data : "some data"}, users)
	// users => array(optional) of user_id
	
	transporter.emit("test", {name : "Deep Prakash"})
}
```
## Notification Service
DMODE provides an in-framework notification service, which allows to push notification on devices connected to notification channel by just calling a function. Here's how you do this : 

**1. Importing Notification Module**
```
var Notification = imports('Notifications');
```

**2. Notification Payload**
```
var data = {
	title : "Notification Title",
	message : "Notification Message",
	tapAction : "com.officeshop.dmode_receiver.MainActivity",
	actions : [{
		name : "OPEN",
		intent : "com.officeshop.dmode_receiver.MainActivity"
	}]
}
```
**3. Notification.push**
Notification.push takes two parameters.
**i. data** - This is the json payload that is sent to the receiver.
**ii. users** - This is the optional second parameter that takes an array of user_ids
```
notification.push(data, user); // user => array(optional)
```

**Some Global Variables exposed**
1. NOTIFICATION_SOCKET_IO // global socket param

2. NOTIFICATION_SOCKET_USERS; // socket => user mapping

3. NOTIFICATION_CONNECTED_USERS; // socket_id => socket mapping

## Custom Fonts
You can automate the usage of custom fonts. It provides a migrate command that writes the css of fonts you want to add. Here's how you can do this : 

*  Copy your ttf or wof file inside src/static/fonts/
*  open settings.js
```
settings.js

exports.fonts = [
	'Roboto-Regular.ttf',
]
```
* Run Migrate Commands
```
$ dmode migratefonts
```
## User Management
DMODE provides User Access Management in-framework. It has a set of methods that allows you to manage users and their access. Here's how you can do this :

**1. Importing AuthUser**
```
var auth = imports('AuthUser');
```
**2. auth.login**
```
var authUser = auth.login(username,password).then(function(result){
	
}).catch(function(err){
	
});
```
**3. auth.register**
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
**4. auth.logout**
```
var logout = auth.logout(request).then(function(result){
	
}).catch(function(err){
	
});
```
**5. Get logged in user**
```
var user = request.user;
```
**6. auth.getUsers**
```
var users = auth.getUsers({_id : "some_id", ...}).then(function(result){
	// result is the user data returned
}).catch(function(err){
	
})
```

**7. auth.addPermission**
```
var p = auth.addPermission("PERMISSION_TO_BE_ADDED").then(function(result){
	
}).catch(function(err){
	
})
```
**8. auth.viewPermission**
``` 
var p = auth.viewPermission(id).then(function(result){
	
}).catch(function(err){
	
})

Note : id parameter is optional. you can pass nothing to get all the permissions
```
**9. auth.addUserGroup**
```
var data = {
	name : value,	// user group name
	permissions : perm 	// array of permission ids
}

var ug = auth.addUserGroup(data).then(function(result){

}).catch(function(err){
	
})
```
**10. auth.viewUserGroup**
```
var ug = auth.viewUserGroup(id).then(function(result){
	
}).catch(function(err){
	
})

Note : id parameter is optional. you can pass nothing to get all the user groups
```
**11. auth.loggedInUsers**
Returns If user(s) is/are logged in or not.
```
var users = auth.loggedInUsers(user_id).then(function(result){
	
}).catch(function(err){
	
})

Note : user_id can be a string or array of string user_ids
```

## Templates
DMODE provides three types of template setup by default, HTML Template, React-Template, React-Redux-Template. Templates are setup at the time of startproject with the cli only. Here's how you can do this : 

**1. Plain HTML Template**
```
$ dmode startproject
```
**2. React-Template**
```
$ dmode startproject react-template
```
**1. React-Redux-template**
```
$ dmode startproject react-redux-template
```


