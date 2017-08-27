// getting npm
// var npm = require('npm');
var fs = require('fs');
var path = require('path');
var http = require('http');

// getting commands
var commands = process.argv;

// if command is 'install' then install dependencies
if(commands[2] == "install"){
	// create package json
	createPackageJson();

	// install other cli dependencies
	installCliDependencies()
		.then(installOtherDependencies)
		.catch((error) => {
			console.log(error);
		});
}

else if(commands[2] == "createpackage"){
	// create package json
	createPackageJson();	
}

// createsproject
else if(commands[2] == "startproject"){
	var cmd = require(process.cwd()+'/node_modules/node-cmd');
	var chalk = require(process.cwd()+'/node_modules/chalk');
	var clear = require(process.cwd()+'/node_modules/clear');
	var CLI = require(process.cwd()+'/node_modules/clui');
	var figlet = require(process.cwd()+'/node_modules/figlet');
	var inquirer = require(process.cwd()+'/node_modules/inquirer');
	var Spinner = CLI.Spinner;
	
	// clear
	clear();

	// heading
	console.log(
	  	chalk.blue(
	    	figlet.textSync('DMODE', { horizontalLayout: 'full' })
	  	)
	);

	// creating console input form
	var questions = [
	    {
	      	name: 'projectname',
	      	type: 'input',
	      	message: 'Project Name : ',
	      	validate: function( value ) {
	        	if (value.length) {
	          		return true;
	        	}
	        	else{
	          		return 'Please enter your username or e-mail address';
	        	}
	      	}
	    },
	    {
	      	name: 'description',
	      	type: 'input',
	      	message: 'Description (optional) : ',
	      	validate: function( value ) {
	        	return true;
	      	}
	    },
	    {
	      	name: 'author',
	      	type: 'input',
	      	message: 'Author (optional): ',
	      	validate: function( value ) {
	        	return true;
	      	}
	    },
	    {
	      	name: 'license',
	      	type: 'input',
	      	message: 'License (default - ISC) : ',
	      	validate: function( value ) {
	        	return true;
	      	}
	    },
	    {
	      	name: 'secret',
	      	type: 'input',
	      	message: 'App Secret (optional): ',
	      	validate: function( value ) {
	        	return true;
	      	}
	    },
	    {
	      	name: 'dbname',
	      	type: 'input',
	      	message: 'DB Name : ',
	      	validate: function( value ) {
	        	if (value.length) {
	          		return true;
	        	}
	        	else{
	          		return 'Please enter your database name';
	        	}
	      	}
	    },
	    {
	      	name: 'dbhost',
	      	type: 'input',
	      	message: 'DB Host (default - 127.0.0.1): ',
	      	validate: function( value ) {
	        	return true;
	      	}
	    },
	    {
	      	name: 'dbusername',
	      	type: 'input',
	      	message: 'DB Username : ',
	      	validate: function( value ) {
	        	if (value.length) {
	          		return true;
	        	}
	        	else{
	          		return 'Please enter your database username';
	        	}
	      	}
	    },
	    {
	      	name: 'dbpassword',
	      	type: 'input',
	      	message: 'DB Password : ',
	      	validate: function( value ) {
	        	if (value.length) {
	          		return true;
	        	}
	        	else{
	          		return 'Please enter your database password';
	        	}
	      	}
	    },
	    {
	      	name: 'dbauth',
	      	type: 'input',
	      	message: 'DB AuthSource (default - admin): ',
	      	validate: function( value ) {
	        	return true
	      	}
	    },
  	];

  	// enquire
  	inquirer.prompt(questions).then(createSettings).catch((error)=>{});
}

// if command is 'install' then install dependencies
else if(commands[2] == "createapp"){
	var chalk = require(process.cwd()+'/node_modules/chalk');
	// validate
	var RESERVED_WORDS = [
		"libs",
		"lib",
		"src",
		"node_modules"
	];
	var settings = require(process.cwd()+"/settings.js");
	var createFlag = true;
	var error = null;
	if(commands[3] == undefined){
		createFlag = false;
		error = "Error : Please provide <appname>\n\n\tUsage : dmode createapp <appname>\n";
	}
	else if(commands[3] == settings.projectname){
		createFlag = false;
		error = "Error : <appname> should not be same as projectname\n\n\tUsage : dmode createapp <appname>\n";
	}
	else if(settings.INSTALLED_APPS.indexOf(commands[3]) !== -1){
		createFlag = false;
		error = "Error : Cannot create multiple apps with same name\n\n\tUsage : dmode createapp <appname>\n";
	}
	else if(RESERVED_WORDS.indexOf(commands[3]) !== -1){
		createFlag = false;
		error = "Error : Reserved Words\n\n\tUsage : dmode createapp <appname>\n";
	}

	// create package json
	if(commands[3] !== undefined && createFlag == true){
		createApp(commands[3]);
	}
	else{
		console.log(chalk.red(error));
	}
}

// migrate fonts
else if(commands[2] == "migratefonts"){
	// getting fonts
	var settings = require(process.cwd()+"/settings.js");

	fs.truncate('src/static/css/fonts.css', function(){
		// do nothing
	})

	var file = fs.createWriteStream('src/static/css/fonts.css', {
	  	flags: 'a' // 'a' means appending (old data will be preserved)
	});

	settings.fonts.map(function(value, index){
		var arr = value.split(".");
		file.write("@font-face {\n");
		file.write("\tfont-family: "+arr[0]+";\n");
		file.write("\tsrc: url('../fonts/"+value+"');\n");
		file.write("}\n");
	})

	console.log("Successfully migrated fonts");
}

else{
	console.log("\nUsage : dmode <command>\n\n1. install\n2. startproject\n3. createapp\n4. migratefonts");
}

// create package json
function createPackageJson(){
	// truncate file if exist
	fs.truncate('package.json', function(){
		// do nothing
	})

	var file = fs.createWriteStream('package.json', {
	  	flags: 'a' // 'a' means appending (old data will be preserved)
	});


	// package json
	file.write('{\n');
	file.write('\t"name": "",\n');
	file.write('\t"version": "1.0.0",\n');
	file.write('\t"description": "",\n');
	file.write('\t"main": "server.js",\n');
	file.write('\t"dependencies": {},\n');
	file.write('\t"devDependencies": {},\n');
	file.write('\t"scripts": {\n');
	file.write('\t\t"test": "echo \\"Error: no test specified\\" && exit 1",\n');
	file.write('\t\t"dev": "nodemon server.js"\n');
	file.write('\t},\n');
	file.write('\t"author": "",\n');
	file.write('\t"license": ""\n');
	file.write('}\n');
}

// update package json when creating project
function updatePackageJson(data){
	var name = data.projectname;
	var description = data.description;
	var author = data.author;
	var license = data.license;
	fs.readFile("package.json", "utf8", function(err, data) {
        if (err) throw err;
        var data = JSON.parse(data);
        data.name = name;
        data.description = description;
        data.author = author;
        data.license = license;
        data = JSON.stringify(data);

        fs.writeFile('package.json', data, 'utf8', function(){

        });
    });
}

// install cli dependencies
function installCliDependencies(data,sp){
	console.log("installing cli dependencies...");
	var dependencies = [
	    "chalk@^1.1.3",
	    "clear@0.0.1",
	    "clui@^0.3.6",
	    "figlet@^1.2.0",
	    "inquirer@^3.1.1",
	    "node-cmd@^3.0.0",
	];

	// return new Promise(function(resolve, reject){
	// 	npm.load({ 'save': true }, function(err){
	// 		npm.commands.install(dependencies, function(error, data){
	// 			resolve();
	// 		})

	// 		npm.on('log', function(message) {
	// 		    // log installation progress
	// 		    console.log(message);
	// 		});
	// 	})
	// })
}

// install dependencies
function installOtherDependencies(){
	console.log("installing other dependencies...");
	var dependencies = [
		"async@^2.4.1",
	    "body-parser@^1.17.2",
	    "child-process@^1.0.2",
	    "cookie-parser@^1.4.3",
	    "crypto-js@^3.1.9-1",
	    "express@^4.15.3",
	    "mongoose@^4.10.7",
	    "multer@^1.3.0",
	    "promise@^8.0.0",
	    "readline-sync@^1.4.7",
	    "socket.io@^2.0.3",
	    "swig@^1.4.2"
	];

	// npm.load({ 'save': true }, function(err){
	// 	npm.commands.install(dependencies, function(error, data){

	// 	});

	// 	npm.on('log', function(message) {
	// 	    // log installation progress
	// 	    console.log(message);
	// 	});
	// })

	// // install nodemon
	// npm.load(function(err){
	// 	npm.commands.install(['nodemon'], function(error, data){

	// 	});

	// 	npm.on('log', function(message) {
	// 	    // log installation progress
	// 	    console.log(message);
	// 	});
	// })
}

// writing setting file
function createSettings(data){
	// update package.json
	var packageData = {
		projectname : data.projectname,
		description : data.description,
		author : data.author,
		license : data.license
	}

	// updata package.json
	updatePackageJson(packageData);

	var secret = "LetsfindthewayoutthereV.1";
	var dbname = data.dbname;
	var host = "127.0.0.1";
	var username = data.dbusername;
	var password = data.dbpassword;
	var authSource = "admin";

	if(data.secret.length !== 0){
		secret = data.secret;
	}
	if(data.dbhost.length !== 0){
		host = data.dbhost;
	}
	if(data.dbauth.length !== 0){
		authSource = data.dbauth;
	}

	// truncate file if exist
	fs.truncate('settings.js', function(){
		// do nothing
	})

	var file = fs.createWriteStream('settings.js', {
	  	flags: 'a' // 'a' means appending (old data will be preserved)
	});


	// setting file
	file.write("exports.root = __dirname+'/src';\n");
	file.write("exports.projectname = '"+data.projectname+"';\n");
	file.write("exports.secret = '"+secret+"';\n");
	file.write("\n");
	file.write("// database credentials\n");
	file.write("exports.db = { \n");
	file.write("\tdatabase : '"+dbname+"',\n");
	file.write("\thost : '"+host+"',\n");
	file.write("\tusername : '"+username+"',\n");
	file.write("\tpassword : '"+password+"',\n");
	file.write("\tauthSource : '"+authSource+"'\n");
	file.write("}\n");
	file.write("\n");
	file.write("// fonts\n");
	file.write("exports.fonts = [\n");
	file.write("\t'Roboto-Regular.ttf',\n")
	file.write("]\n");
	file.write("\n");
	file.write("exports.INSTALLED_APPS=[\n");
	file.write("\t//'your app name'\n");
	file.write("]");

	// create mainFolder
	createMainFolder(data.projectname);
}

// creating main folder
function createMainFolder(name){
	// create directory
	if (!fs.existsSync(name)){
	    fs.mkdirSync(name);

	    // create urls.js in main folder
	    createMainUrlsJs(name);
	}
}

// main urls.js
function createMainUrlsJs(name){
	// truncate file if exist
	fs.truncate(name+'/urls.js', function(){
		// do nothing
	})

	// creating url open
	var file = fs.createWriteStream(name+'/urls.js', {
	  	flags: 'a' // 'a' means appending (old data will be preserved)
	});

	// setting file
	file.write("\n");
	file.write("var Network = imports('Network');\n");
	file.write("var api = imports('api');\n");
	file.write("// methods\n");
	file.write("var method = api.method;\n");
	file.write("//var appSocket = importSocket('app')");
	file.write("//map your routes here\n");
	file.write("exports.api = function(router){\n");
	file.write("\tmethod.page(router, '/', '/index.html')\n");
	file.write("}\n");
	file.write("\n");
	file.write("// connect your socket events\n");
	file.write("exports.sockets = function(){\n");
	file.write("\treturn {\n");
	file.write("\t\t//test : appSocket.testSocket,\n");
	file.write("\t}\n");
	file.write("}\n");

	// create server
	createServer(name);
}

// create server
function createServer(name){
	// truncate file if exist
	fs.truncate('server.js', function(){
		// do nothing
	})

	// creating url open
	var file = fs.createWriteStream('server.js', {
	  	flags: 'a' // 'a' means appending (old data will be preserved)
	});

	// server file
	file.write("global.imports = require('./libs/imports.js');\n");
	file.write("global.importSocket = require('./libs/socket.js').import;\n");
	file.write("global.importModel = require('./libs/db.js')\n");
	file.write("const express = require('express');\n");
	file.write("const http = require('http');\n");
	file.write("const bodyParser = require('body-parser');\n");
	file.write("const cookieParser = require('cookie-parser');\n");
	file.write("const api = express.Router();\n");
	file.write("\n");
	file.write("// custom libs\n");
	file.write("const socket = imports('socket');\n");
	file.write("const settings = imports('settings');\n");
	file.write("const db = imports('db');\n");
	file.write("const route = require('./"+name+"/urls.js');\n");
	file.write("\n");
	file.write("// initilizing express\n");
	file.write("const app = express();\n");
	file.write("\n");
	file.write("// creating server\n");
	file.write("const server = http.createServer(app);\n");
	file.write("\n");
	file.write("// configuring express \n");
	file.write("app.use(express.static(settings.root+'/static/'));\n");
	file.write("app.use(cookieParser());\n");
	file.write("app.use(bodyParser.urlencoded({ extended : true})); \n");
	file.write("app.use(bodyParser.json());\n");
	file.write("app.use('/', api);\n");
	file.write("\n");
	file.write("// api routing \n");
	file.write("route.api(api); \n");
	file.write("\n");
	file.write("// db connect \n");
	file.write("db.connect(); \n");
	file.write("\n");
	file.write("// socket connection \n");
	file.write("socket.connect(server); \n");
	file.write("\n");
	file.write("// socket events \n");
	file.write("route.sockets(); \n");
	file.write("\n");
	file.write("// starting server ] \n");
	file.write("server.listen(8080); \n");
	file.write("console.log('listening at http:\/\/localhost:8080/');");

	// create libraries
	createLibs();
	createSrc();
}

// create libraries
function createLibs(){
	// create directory
	if (!fs.existsSync("libs")){
	    fs.mkdirSync("libs");

	    // create urls.js in main folder
	    createDependentFiles();
	}
}

// create necessary files
function createDependentFiles(){
	createImportFile();
	createNetworkFile();
	createApiFile();
	createSecureFile();
	createDbFile();
	createFormFile();
	createSocketFile();
	createPrebuilds();
	createResponseFile();
}

// create import file
function createImportFile(){
	// truncate file if exist
	fs.truncate('libs/imports.js', function(){
		// do nothing
	})

	// creating url open
	var file = fs.createWriteStream('libs/imports.js', {
	  	flags: 'a' // 'a' means appending (old data will be preserved)
	});

	file.write('var fs=require("fs"),settings=require("./../settings.js"),imports=function(module){var url=__dirname+"/"+module+".js";if(-1!==module.indexOf(".js")&&(url=__dirname+"/"+module),"settings"==module)return url=__dirname,url=url.slice(0,url.length-4)+module+".js",require(url);if(fs.existsSync(url))return require(url);if(-1!==settings.INSTALLED_APPS.indexOf(module)){var urls=(url=__dirname).slice(0,url.length-4)+module+"/urls.js",models=url.slice(0,url.length-4)+module+"/models.js",socket=url.slice(0,url.length-4)+module+"/socket.js",views=url.slice(0,url.length-4)+module+"/views.js";return{urls:require(urls),models:require(models),socket:require(socket),views:require(views)}}try{return require(module)}catch(e){throw"Module could not be found!"}};module.exports=imports;');
}

// create network file
function createNetworkFile(){
	// truncate file if exist
	fs.truncate('libs/Network.js', function(){
		// do nothing
	})

	// creating url open
	var file = fs.createWriteStream('libs/Network.js', {
	  	flags: 'a' // 'a' means appending (old data will be preserved)
	});

	file.write('const uri=imports("url"),settings=imports("settings");exports.page=function(t,n,o){var e=settings.root+o;t.get(n,function(t,n){n.sendFile(e,{"Content-Type":"text/html"})})},exports.get=function(t,n,o){t.get(n,function(t,n){t.query,o(t,n)})},exports.post=function(t,n,o){t.route(n).post(function(t,n){t.body,o(t,n)})};');
}

// create api file
function createApiFile(){
	// truncate file if exist
	fs.truncate('libs/api.js', function(){
		// do nothing
	})

	// creating url open
	var file = fs.createWriteStream('libs/api.js', {
	  	flags: 'a' // 'a' means appending (old data will be preserved)
	});

	file.write('var Network=imports("Network"),get=function(t,e,o){Network.get(t,e,o)},post=function(t,e,o){Network.post(t,e,o)},page=function(t,e,o){Network.page(t,e,o)};exports.method={get:get,post:post,page:page};');
}

// create response file
function createResponseFile(){
	// truncate file if exist
	fs.truncate('libs/response.js', function(){
		// do nothing
	})

	// creating url open
	var file = fs.createWriteStream('libs/response.js', {
	  	flags: 'a' // 'a' means appending (old data will be preserved)
	});

	file.write('var swig=imports("swig"),settings=imports("settings"),renderToResponse=function(e,n,s){var n=settings.root+"/"+n,t=swig.compileFile(n)(s);e.writeHead(200,{"Content-Type":"text/html"}),e.end(t)},render=function(e,n){e.send(n)},HttpResponse=function(e,n){e.json(n)};module.exports={renderToResponse:renderToResponse,render:render,HttpResponse:HttpResponse};');
}

// create secure file
function createSecureFile(){
	// truncate file if exist
	fs.truncate('libs/Secure.js', function(){
		// do nothing
	})

	// creating url open
	var file = fs.createWriteStream('libs/Secure.js', {
	  	flags: 'a' // 'a' means appending (old data will be preserved)
	});

	file.write('var CryptoJS=imports("crypto-js"),settings=imports("settings");exports.encode=function(t){return CryptoJS.HmacSHA1(t,settings.secret).toString()};');
}

// create db file
function createDbFile(){
	// truncate file if exist
	fs.truncate('libs/db.js', function(){
		// do nothing
	})

	// creating url open
	var file = fs.createWriteStream('libs/db.js', {
	  	flags: 'a' // 'a' means appending (old data will be preserved)
	});


	file.write('var mongoose=imports("mongoose"),Schema=mongoose.Schema,settings=imports("settings");exports.connect=function(){var o=settings.db.username,n=settings.db.password,e=settings.db.host,t=settings.db.database,s=settings.db.authSource,c="mongodb://"+o+":"+n+"@"+e+"/"+t+"?authSource="+s;mongoose.connect(c);var r=mongoose.connection;r.on("connected",function(){console.log("Mongoose default connection open to "+e)}),r.on("error",function(o){console.log("Mongoose default connection error: "+o)}),r.on("disconnected",function(){console.log("Mongoose default connection disconnected")})},exports.models=function(o,n){var e=new Schema(n);return mongoose.model(o,e)},exports.drop=function(o){return mongoose.connection.db.dropCollection(o)},exports.removeDB=function(){return mongoose.connection.db.dropDatabase()},exports.import=function(o){var n=__dirname;return n=n.slice(0,n.length-4)+o+"/models.js",require(n)};');
}

// create form file
function createFormFile(){
	// truncate file if exist
	fs.truncate('libs/form.js', function(){
		// do nothing
	})

	// creating url open
	var file = fs.createWriteStream('libs/form.js', {
	  	flags: 'a' // 'a' means appending (old data will be preserved)
	});

	// file
	file.write('function haveField(e,t){var n="";return t.map(function(t,a){-1==Object.keys(e).indexOf(t)&&(n=t)}),n}function notNull(e){var t="";try{Object.keys(e).map(function(n,a){0===e[n].length&&(t=n)})}catch(e){t=e}return t}exports.isValid=function(e,t){var n={status:!1,message:null},a=haveField(e,t);if(a)return n.message=a+" not provided",n;var r=notNull(e);return r?(n.message=r+" can\'t be null",n):(n.status=!0,n)};');
}

// create socket file
function createSocketFile(){
	// truncate file if exist
	fs.truncate('libs/socket.js', function(){
		// do nothing
	})

	// creating socket lib
	var file = fs.createWriteStream('libs/socket.js', {
	  	flags: 'a' // 'a' means appending (old data will be preserved)
	});

	file.write('function addEvents(t){var e=require("./../"+settings.projectname+"/urls.js").sockets();null!==e&&void 0!==e&&Object.keys(e).map(function(o,n){e[o](t)}.bind(t))}var socketio=imports("socket.io"),settings=imports("settings"),socketData={};exports.connect=function(t){socketio(t).on("connection",t=>{socketData.id=t.id,t.on("user",function(){console.log(socketData.id+" connected"),t.emit("userConnect",socketData.id)}),addEvents(t),t.on("disconnect",function(){console.log(socketData.id+" disconnected")})})},exports.import=function(t){var e=__dirname;return e=e.slice(0,e.length-4)+t+"/socket.js",require(e)};');
}

// prebuilds
function createPrebuilds(){
	// create directory
	if (!fs.existsSync("libs/prebuild")){
	    fs.mkdirSync("libs/prebuild");

	    // create urls.js in main folder
	    createPrebuildLibs();
	}
}

// create prebuild libs
function createPrebuildLibs(){
	// truncate file if exist
	fs.truncate('libs/prebuild/userModel.js', function(){
		// do nothing
	})

	// creating url open
	var file = fs.createWriteStream('libs/prebuild/userModel.js', {
	  	flags: 'a' // 'a' means appending (old data will be preserved)
	});

	file.write('var db=imports("db"),userSchema={username:{type:String,required:!0,unique:!0},password:{type:String,required:!0},fname:{type:String,required:!0},lname:{type:String,required:!0},phno:{type:String,required:!0,unique:!0},address:{type:String,required:!0}},permissionsSchema={name:{type:String,required:!0,unique:!0},access:{type:String,required:!0}},userPermissionsSchema={userId:{type:String,ref:"user"},permissionId:{type:String,ref:"permissions"}},userAddressSchema={userId:{type:Number,ref:"user"},userAddress:{type:String,required:!0}},User=db.models("user",userSchema),permissions=db.models("permissions",permissionsSchema),userPermissions=db.models("userPermissions",userPermissionsSchema),Address=db.models("addresses",userAddressSchema);exports.User=User,exports.Permissions=permissions,exports.userPermissions=userPermissions,exports.Address=Address;
');
}

// create source folder
function createSrc(){
	// create directory
	if (!fs.existsSync("src")){
	    fs.mkdirSync("src");

	    // create src and static files
	  	console.log("creating static files...");
	  	createStaticFolder();
	    console.log("creating src files...");
	    createIndexFile();
	}
}

// create static folder
function createStaticFolder(){
	// create directory
	if (!fs.existsSync("src/static")){
	    fs.mkdirSync("src/static");

	    // create js folder
	    createJsFolder();
	    createFontsFolder();
	    createCssFolder();
	}
}

// create static js folder
function createJsFolder(){
	// create directory
	if (!fs.existsSync("src/static/js")){
	    fs.mkdirSync("src/static/js");

	    // create client socket events
	    createClientSocketEvents();
	}
}

// create fonts folder
function createFontsFolder(){
	// create directory
	if (!fs.existsSync("src/static/fonts")){
	    fs.mkdirSync("src/static/fonts");
	}
}

// create css folder
function createCssFolder(){
	// create directory
	if (!fs.existsSync("src/static/css")){
	    fs.mkdirSync("src/static/css");

	    // download font
	    downloadFont();
	    // create fonts.css
	    createFontsCss();
	    // create styles css
	    createStylesCss();
	}
}

// download font
function downloadFont(){
	var fontUrl = "http://officeshop.co.in/dmode/Roboto-Regular.ttf";
	var file = fs.createWriteStream("src/static/fonts/Roboto-Regular.ttf");

	file.on('open', function(fd) {
		var request = http.get(fontUrl, function(response) {
		  	response.pipe(file);
		});
    });
}

function createFontsCss(){
	// truncate file if exist
	fs.truncate('src/static/css/fonts.css', function(){
		// do nothing
	})

	// creating url open
	var file = fs.createWriteStream('src/static/css/fonts.css', {
	  	flags: 'a' // 'a' means appending (old data will be preserved)
	});

	file.write("@font-face {\n");
	file.write("\tfont-family: Roboto-Regular;\n");
	file.write("\tsrc: url('../fonts/Roboto-Regular.ttf');\n");
	file.write("}");
}

function createStylesCss(){
	// truncate file if exist
	fs.truncate('src/static/css/styles.css', function(){
		// do nothing
	})

	// creating url open
	var file = fs.createWriteStream('src/static/css/styles.css', {
	  	flags: 'a' // 'a' means appending (old data will be preserved)
	});

	file.write("html, body{\n");
	file.write("\tmargin : 0px;\n");
	file.write("\tpadding : 0px;\n");
	file.write("\tbackground-color: #000000;\n");
	file.write("}\n");
	file.write("\n");
	file.write(".container{\n");
	file.write("\tdisplay: table;\n");
	file.write("\twidth :100vw;\n");
	file.write("\theight: 100vh;\n");
	file.write("\tbackground-color : #1abc9c;\n");
	file.write("}\n");
	file.write("\n");
	file.write(".wrapper {\n");
	file.write("\tdisplay: table-cell;\n");
	file.write("\ttext-align:center;\n");
	file.write("\tvertical-align: middle;\n");
	file.write("\tpadding-left :calc(50% - 250px);\n");
	file.write("\tbox-shadow: 0px 0px 2px 1px gray;\n");
	file.write("}\n");
	file.write("\n");
	file.write(".body {\n");
	file.write("\tborder-style : solid;\n");
	file.write("\tborder-width : 1px;\n");
	file.write("\tborder-color :#16a085;\n");
	file.write("\twidth : 500px;\n");
	file.write("\theight : 400px;\n");
	file.write("\tbackground-color : #ecf0f1;\n");
	file.write("\tborder-radius: 8px;\n");
	file.write("\tfont-family: Roboto-Regular;\n");
	file.write("\tcolor : #7f8c8d;\n");
	file.write("}\n");
	file.write("\n");
	file.write(".paragraph {\n");
	file.write("\ttext-justify:inter-word;\n");
	file.write("\tmargin-left : 20px;\n");
	file.write("\tmargin-right : 20px;\n");
	file.write("}\n");
	file.write("\n");
	file.write(".marginTopSmall {\n");
	file.write("\tmargin-top: 40px;\n");
	file.write("}\n");
	file.write("\n");
	file.write(".subText {\n");
	file.write("\tcolor : #2F4F4F;\n");
	file.write("\tfont-size: 12px;\n");
	file.write("\tfont-weight: bold;\n");
	file.write("}\n");
	file.write("\n");
	file.write(".headText {\n");
	file.write("\tpadding : 8px;\n");
	file.write("}\n");
	file.write("\n");
	file.write(".leftAlign {\n");
	file.write("\ttext-align: left;\n");
	file.write("}\n");
	file.write("\n");
	file.write(".marginLeft {\n");
	file.write("\tmargin-left: 20px;\n");
	file.write("}\n");
}

// create socket event js
function createClientSocketEvents(){
	// truncate file if exist
	fs.truncate('src/static/js/socketEvents.js', function(){
		// do nothing
	})

	// creating url open
	var file = fs.createWriteStream('src/static/js/socketEvents.js', {
	  	flags: 'a' // 'a' means appending (old data will be preserved)
	});

	file.write("var socket=io('/');\n");
	file.write("// connecting client\n");
	file.write("socket.emit('user');\n");
	file.write("// Usage \n");
	file.write("// socket.emit('event') to call a socket event\n");
	file.write("// socket.on('event', callback) for triggering a socket event \n");
	file.write("/* \n");
	file.write("ex :-\n");
	file.write("\tsocket.emit('user'); \n");
	file.write("\n");
	file.write("\tsocket.on('userConnect', function(user){\n");
	file.write("\t\tconsole.log(user);\n");
	file.write("\t})\n");
	file.write("*/\n");
}

// create index file
function createIndexFile(){
	// truncate file if exist
	fs.truncate('src/index.html', function(){
		// do nothing
	})

	// creating url open
	var file = fs.createWriteStream('src/index.html', {
	  	flags: 'a' // 'a' means appending (old data will be preserved)
	});

	file.write("<!DOCTYPE html> \n");
	file.write("<html> \n");
	file.write("<head> \n");
	file.write("<title></title> \n");
	file.write("<link rel = 'stylesheet' type = 'text/css' href='css/fonts.css' /> \n");
	file.write("<link rel = 'stylesheet' type = 'text/css' href='css/styles.css' /> \n");
	file.write("</head> \n");
	file.write("<body>\n");
	file.write("<div class='container'>\n");
	file.write("\t<div class = 'wrapper'>\n");
	file.write("\t\t<div class = 'body'>\n");
	file.write("\t\t\t<h2>DMODE says Hello!</h2>\n");
	file.write("\t\t\t<p class = 'paragraph'>If you're viewing this page, that means you're successfully done with setting up a dmode project. DMODE is basically a MVT Node structure, that gives you rid of Node Callbacks. We're not done just here, we're improving and making things more easier for you. Now you can start making your Apps by writing simple javascript codes. For more, check github <a href='https://github.com/deepprakashp354/dmodev1.0.0/''>documentation</a>.</p>\n");
	file.write("\t\t\t<p class='paragraph subText marginTopSmall'>Now go buddy create your apps and make your project powerfull in the easiest way.</p>\n");
	file.write("\t\t\t<br />\n");
	file.write("\t\t\t<hr />\n");
	file.write("\t\t\t<div class='paragraph leftAlign marginLeft headText'>Commands</div>\n");
	file.write("\t\t\t<div class='paragraph subText leftAlign'>* dmode startproject</div>\n");
	file.write("\t\t\t<div class='paragraph subText leftAlign'>* dmode createapp [appname]</div>\n");
	file.write("\t\t\t<div class='paragraph subText leftAlign'>* dmode migratefonts</div>\n");
	file.write("\t\t</div>\n");
	file.write("\t</div>\n");
	file.write("</div>\n");
	file.write("\n");
	file.write("<script src='https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js'></script>\n")
	file.write("<script src='js/socketEvents.js'></script>\n")
	file.write("</body>\n");
	file.write("</html>");
}

// create app
function createApp(appname){
	// create directory
	if (!fs.existsSync(appname)){
	    fs.mkdirSync(appname);

	    // create urls.js in main folder
	    console.log("setting up your app...");
	    createModelJs(appname);
	    createSocketJs(appname);
	    createUrlJs(appname);
	    createViewJs(appname);
	}
}

// setting up app model
function createModelJs(appname){
	// truncate file if exist
	fs.truncate(appname+'/models.js', function(){
		// do nothing
	})

	// creating url open
	var file = fs.createWriteStream(appname+'/models.js', {
	  	flags: 'a' // 'a' means appending (old data will be preserved)
	});

	file.write("var db = imports('db');\n")
	file.write("// create schemas here\n")
	file.write("// var testSchema = {\n")
	file.write("// 		col1:{ type: String, required: true, unique: true },\n")
	file.write("// 		col2:{ type: String, required: true },\n")
	file.write("// };\n")
	file.write("\n")
	file.write("// create models here\n")
	file.write("// var Test = db.models('test', testSchema);\n")
	file.write("\n")
	file.write("// exporting models\n")
	file.write("// exports.Test = Test;")

}

// setting up app socket
function createSocketJs(appname){
	// truncate file if exist
	fs.truncate(appname+'/socket.js', function(){
		// do nothing
	})

	// creating url open
	var file = fs.createWriteStream(appname+'/socket.js', {
	  	flags: 'a' // 'a' means appending (old data will be preserved)
	});

	file.write("// Your socket events here\n");
	file.write("exports.testSocket = function(socket){\n");
	file.write("\t \/\/ socket.emit('target', 'message') to emit a message\n");
	file.write("\t \/\/ socket.on('event', callback) to trigger a socket event\n");
	file.write("}");
}

// setting up app url
function createUrlJs(appname){
	// truncate file if exist
	fs.truncate(appname+'/urls.js', function(){
		// do nothing
	})

	// creating url open
	var file = fs.createWriteStream(appname+'/urls.js', {
	  	flags: 'a' // 'a' means appending (old data will be preserved)
	});

	file.write("var views = require('./views.js');\n")
	file.write("\n");
	file.write("module.exports = {\n")
	file.write("// index : views.index\n");
	file.write("}\n")
}

// setting view js
function createViewJs(appname){
	// truncate file if exist
	fs.truncate(appname+'/views.js', function(){
		// do nothing
	})

	// creating url open
	var file = fs.createWriteStream(appname+'/views.js', {
	  	flags: 'a' // 'a' means appending (old data will be preserved)
	});

	file.write("var Secure = imports('Secure');\n");
	file.write("var models = imports('prebuild/userModel');\n")
	file.write("var HttpResponse = imports('response').HttpResponse;\n");
	file.write("/*\n");
	file.write("\twrite apis here,\n")
	file.write("*/\n");
	file.write("// login function\n");
	file.write("exports.index = function(request, response){\n");
	file.write("\tHttpResponse(response, {data : 'Hello DMODE!'});\n")
	file.write("}")
}
