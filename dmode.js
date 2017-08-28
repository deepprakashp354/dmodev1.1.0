function createPackageJson(){fs.truncate("package.json",function(){});var e=fs.createWriteStream("package.json",{flags:"a"});e.write("{\n"),e.write('\t"name": "",\n'),e.write('\t"version": "1.0.0",\n'),e.write('\t"description": "",\n'),e.write('\t"main": "server.js",\n'),e.write('\t"dependencies": {},\n'),e.write('\t"devDependencies": {},\n'),e.write('\t"scripts": {\n'),e.write('\t\t"test": "echo \\"Error: no test specified\\" && exit 1",\n'),e.write('\t\t"dev": "nodemon server.js"\n'),e.write("\t},\n"),e.write('\t"author": "",\n'),e.write('\t"license": ""\n'),e.write("}\n")}function updatePackageJson(e){var t=e.projectname,r=e.description,n=e.author,s=e.license;fs.readFile("package.json","utf8",function(e,i){if(e)throw e;(i=JSON.parse(i)).name=t,i.description=r,i.author=n,i.license=s,i=JSON.stringify(i),fs.writeFile("package.json",i,"utf8",function(){})})}function installCliDependencies(e,t){console.log("installing cli dependencies...")}function installOtherDependencies(){console.log("installing other dependencies...")}function createSettings(e){updatePackageJson({projectname:e.projectname,description:e.description,author:e.author,license:e.license});var t="LetsfindthewayoutthereV.1",r=e.dbname,n="127.0.0.1",s=e.dbusername,i=e.dbpassword,o="admin";0!==e.secret.length&&(t=e.secret),0!==e.dbhost.length&&(n=e.dbhost),0!==e.dbauth.length&&(o=e.dbauth),fs.truncate("settings.js",function(){});var a=fs.createWriteStream("settings.js",{flags:"a"});a.write("exports.root = __dirname+'/src';\n"),a.write("exports.projectname = '"+e.projectname+"';\n"),a.write("exports.secret = '"+t+"';\n"),a.write("\n"),a.write("// database credentials\n"),a.write("exports.db = { \n"),a.write("\tdatabase : '"+r+"',\n"),a.write("\thost : '"+n+"',\n"),a.write("\tusername : '"+s+"',\n"),a.write("\tpassword : '"+i+"',\n"),a.write("\tauthSource : '"+o+"'\n"),a.write("}\n"),a.write("\n"),a.write("// fonts\n"),a.write("exports.fonts = [\n"),a.write("\t'Roboto-Regular.ttf',\n"),a.write("]\n"),a.write("\n"),a.write("exports.INSTALLED_APPS=[\n"),a.write("\t//'your app name'\n"),a.write("]"),createMainFolder(e.projectname)}function createMainFolder(e){fs.existsSync(e)||(fs.mkdirSync(e),createMainUrlsJs(e))}function createMainUrlsJs(e){fs.truncate(e+"/urls.js",function(){});var t=fs.createWriteStream(e+"/urls.js",{flags:"a"});t.write("\n"),t.write("var Network = imports('Network');\n"),t.write("var api = imports('api');\n"),t.write("// methods\n"),t.write("var method = api.method;\n"),t.write("//var appSocket = importSocket('app')"),t.write("//map your routes here\n"),t.write("exports.api = function(router){\n"),t.write("\tmethod.page(router, '/', '/index.html')\n"),t.write("}\n"),t.write("\n"),t.write("// connect your socket events\n"),t.write("exports.sockets = function(){\n"),t.write("\treturn {\n"),t.write("\t\t//test : appSocket.testSocket,\n"),t.write("\t}\n"),t.write("}\n"),createServer(e)}function createServer(e){fs.truncate("server.js",function(){});var t=fs.createWriteStream("server.js",{flags:"a"});t.write("global.imports = require('./libs/imports.js');\n"),t.write("global.importSocket = require('./libs/socket.js').import;\n"),t.write("global.importModel = require('./libs/db.js')\n"),t.write("const express = require('express');\n"),t.write("const http = require('http');\n"),t.write("const bodyParser = require('body-parser');\n"),t.write("const cookieParser = require('cookie-parser');\n"),t.write("const api = express.Router();\n"),t.write("\n"),t.write("// custom libs\n"),t.write("const socket = imports('socket');\n"),t.write("const settings = imports('settings');\n"),t.write("const db = imports('db');\n"),t.write("const route = require('./"+e+"/urls.js');\n"),t.write("\n"),t.write("// initilizing express\n"),t.write("const app = express();\n"),t.write("\n"),t.write("// creating server\n"),t.write("const server = http.createServer(app);\n"),t.write("\n"),t.write("// configuring express \n"),t.write("app.use(express.static(settings.root+'/static/'));\n"),t.write("app.use(cookieParser());\n"),t.write("app.use(bodyParser.urlencoded({ extended : true})); \n"),t.write("app.use(bodyParser.json());\n"),t.write("app.use('/', api);\n"),t.write("\n"),t.write("// api routing \n"),t.write("route.api(api); \n"),t.write("\n"),t.write("// db connect \n"),t.write("db.connect(); \n"),t.write("\n"),t.write("// socket connection \n"),t.write("socket.connect(server); \n"),t.write("\n"),t.write("// socket events \n"),t.write("route.sockets(); \n"),t.write("\n"),t.write("// starting server ] \n"),t.write("server.listen(8080); \n"),t.write("console.log('listening at http://localhost:8080/');"),createLibs(),createSrc()}function createLibs(){fs.existsSync("libs")||(fs.mkdirSync("libs"),createDependentFiles())}function createDependentFiles(){createImportFile(),createNetworkFile(),createApiFile(),createSecureFile(),createDbFile(),createFormFile(),createSocketFile(),createPrebuilds(),createResponseFile()}function createImportFile(){fs.truncate("libs/imports.js",function(){}),fs.createWriteStream("libs/imports.js",{flags:"a"}).write('var fs=require("fs"),settings=require("./../settings.js"),imports=function(module){var url=__dirname+"/"+module+".js";if(-1!==module.indexOf(".js")&&(url=__dirname+"/"+module),"settings"==module)return url=__dirname,url=url.slice(0,url.length-4)+module+".js",require(url);if(fs.existsSync(url))return require(url);if(-1!==settings.INSTALLED_APPS.indexOf(module)){var urls=(url=__dirname).slice(0,url.length-4)+module+"/urls.js",models=url.slice(0,url.length-4)+module+"/models.js",socket=url.slice(0,url.length-4)+module+"/socket.js",views=url.slice(0,url.length-4)+module+"/views.js";return{urls:require(urls),models:require(models),socket:require(socket),views:require(views)}}try{return require(module)}catch(e){throw"Module could not be found!"}};module.exports=imports;')}function createNetworkFile(){fs.truncate("libs/Network.js",function(){}),fs.createWriteStream("libs/Network.js",{flags:"a"}).write('const uri=imports("url"),settings=imports("settings");exports.page=function(t,n,o){var e=settings.root+o;t.get(n,function(t,n){n.sendFile(e,{"Content-Type":"text/html"})})},exports.get=function(t,n,o){t.get(n,function(t,n){t.query,o(t,n)})},exports.post=function(t,n,o){t.route(n).post(function(t,n){t.body,o(t,n)})},exports.put=function(t,n,o){t.put(n,function(t,n){t.body,o(t,n)})},exports.delete=function(t,n,o){t.delete(n,function(t,n){t.body,o(t,n)})};')}function createApiFile(){fs.truncate("libs/api.js",function(){}),fs.createWriteStream("libs/api.js",{flags:"a"}).write('var Network=imports("Network"),get=function(t,e,o){Network.get(t,e,o)},post=function(t,e,o){Network.post(t,e,o)},put=function(t,e,o){Network.put(t,e,o)},deleteMethod=function(t,e,o){Network.delete(t,e,o)},page=function(t,e,o){Network.page(t,e,o)};exports.method={get:get,post:post,put:put,delete:deleteMethod,page:page};')}function createResponseFile(){fs.truncate("libs/response.js",function(){}),fs.createWriteStream("libs/response.js",{flags:"a"}).write('var swig=imports("swig"),settings=imports("settings"),renderToResponse=function(e,n,s){var n=settings.root+"/"+n,t=swig.compileFile(n)(s);e.writeHead(200,{"Content-Type":"text/html"}),e.end(t)},render=function(e,n){e.send(n)},HttpResponse=function(e,n){e.json(n)};module.exports={renderToResponse:renderToResponse,render:render,HttpResponse:HttpResponse};')}function createSecureFile(){fs.truncate("libs/Secure.js",function(){}),fs.createWriteStream("libs/Secure.js",{flags:"a"}).write('var CryptoJS=imports("crypto-js"),settings=imports("settings");exports.encode=function(t){return CryptoJS.HmacSHA1(t,settings.secret).toString()};')}function createDbFile(){fs.truncate("libs/db.js",function(){}),fs.createWriteStream("libs/db.js",{flags:"a"}).write('var mongoose=imports("mongoose"),Schema=mongoose.Schema,settings=imports("settings");exports.connect=function(){var o=settings.db.username,n=settings.db.password,e=settings.db.host,t=settings.db.database,s=settings.db.authSource,c="mongodb://"+o+":"+n+"@"+e+"/"+t+"?authSource="+s;mongoose.connect(c);var r=mongoose.connection;r.on("connected",function(){console.log("Mongoose default connection open to "+e)}),r.on("error",function(o){console.log("Mongoose default connection error: "+o)}),r.on("disconnected",function(){console.log("Mongoose default connection disconnected")})},exports.models=function(o,n){var e=new Schema(n);return mongoose.model(o,e)},exports.drop=function(o){return mongoose.connection.db.dropCollection(o)},exports.removeDB=function(){return mongoose.connection.db.dropDatabase()},exports.import=function(o){var n=__dirname;return n=n.slice(0,n.length-4)+o+"/models.js",require(n)};')}function createFormFile(){fs.truncate("libs/form.js",function(){}),fs.createWriteStream("libs/form.js",{flags:"a"}).write('function haveField(e,t){var n="";return t.map(function(t,a){-1==Object.keys(e).indexOf(t)&&(n=t)}),n}function notNull(e){var t="";try{Object.keys(e).map(function(n,a){0===e[n].length&&(t=n)})}catch(e){t=e}return t}exports.isValid=function(e,t){var n={status:!1,message:null},a=haveField(e,t);if(a)return n.message=a+" not provided",n;var r=notNull(e);return r?(n.message=r+" can\'t be null",n):(n.status=!0,n)};')}function createSocketFile(){fs.truncate("libs/socket.js",function(){}),fs.createWriteStream("libs/socket.js",{flags:"a"}).write('function addEvents(t){var e=require("./../"+settings.projectname+"/urls.js").sockets();null!==e&&void 0!==e&&Object.keys(e).map(function(o,n){e[o](t)}.bind(t))}var socketio=imports("socket.io"),settings=imports("settings"),socketData={};exports.connect=function(t){socketio(t).on("connection",t=>{socketData.id=t.id,t.on("user",function(){console.log(socketData.id+" connected"),t.emit("userConnect",socketData.id)}),addEvents(t),t.on("disconnect",function(){console.log(socketData.id+" disconnected")})})},exports.import=function(t){var e=__dirname;return e=e.slice(0,e.length-4)+t+"/socket.js",require(e)};')}function createPrebuilds(){fs.existsSync("libs/prebuild")||(fs.mkdirSync("libs/prebuild"),createPrebuildLibs())}function createPrebuildLibs(){fs.truncate("libs/prebuild/userModel.js",function(){}),fs.createWriteStream("libs/prebuild/userModel.js",{flags:"a"}).write('var db=imports("db"),userSchema={username:{type:String,required:!0,unique:!0},password:{type:String,required:!0},fname:{type:String,required:!0},lname:{type:String,required:!0},phno:{type:String,required:!0,unique:!0},address:{type:String,required:!0}},permissionsSchema={name:{type:String,required:!0,unique:!0},access:{type:String,required:!0}},userPermissionsSchema={userId:{type:String,ref:"user"},permissionId:{type:String,ref:"permissions"}},userAddressSchema={userId:{type:Number,ref:"user"},userAddress:{type:String,required:!0}},User=db.models("user",userSchema),permissions=db.models("permissions",permissionsSchema),userPermissions=db.models("userPermissions",userPermissionsSchema),Address=db.models("addresses",userAddressSchema);exports.User=User,exports.Permissions=permissions,exports.userPermissions=userPermissions,exports.Address=Address;')}function createSrc(){fs.existsSync("src")||(fs.mkdirSync("src"),console.log("creating static files..."),createStaticFolder(),console.log("creating src files..."),createIndexFile())}function createStaticFolder(){fs.existsSync("src/static")||(fs.mkdirSync("src/static"),createJsFolder(),createFontsFolder(),createCssFolder())}function createJsFolder(){fs.existsSync("src/static/js")||(fs.mkdirSync("src/static/js"),createClientSocketEvents())}function createFontsFolder(){fs.existsSync("src/static/fonts")||fs.mkdirSync("src/static/fonts")}function createCssFolder(){fs.existsSync("src/static/css")||(fs.mkdirSync("src/static/css"),downloadFont(),createFontsCss(),createStylesCss())}function downloadFont(){var e=fs.createWriteStream("src/static/fonts/Roboto-Regular.ttf");e.on("open",function(t){http.get("http://officeshop.co.in/dmode/Roboto-Regular.ttf",function(t){t.pipe(e)})})}function createFontsCss(){fs.truncate("src/static/css/fonts.css",function(){});var e=fs.createWriteStream("src/static/css/fonts.css",{flags:"a"});e.write("@font-face {\n"),e.write("\tfont-family: Roboto-Regular;\n"),e.write("\tsrc: url('../fonts/Roboto-Regular.ttf');\n"),e.write("}")}function createStylesCss(){fs.truncate("src/static/css/styles.css",function(){});var e=fs.createWriteStream("src/static/css/styles.css",{flags:"a"});e.write("html, body{\n"),e.write("\tmargin : 0px;\n"),e.write("\tpadding : 0px;\n"),e.write("\tbackground-color: #000000;\n"),e.write("}\n"),e.write("\n"),e.write(".container{\n"),e.write("\tdisplay: table;\n"),e.write("\twidth :100vw;\n"),e.write("\theight: 100vh;\n"),e.write("\tbackground-color : #1abc9c;\n"),e.write("}\n"),e.write("\n"),e.write(".wrapper {\n"),e.write("\tdisplay: table-cell;\n"),e.write("\ttext-align:center;\n"),e.write("\tvertical-align: middle;\n"),e.write("\tpadding-left :calc(50% - 250px);\n"),e.write("\tbox-shadow: 0px 0px 2px 1px gray;\n"),e.write("}\n"),e.write("\n"),e.write(".body {\n"),e.write("\tborder-style : solid;\n"),e.write("\tborder-width : 1px;\n"),e.write("\tborder-color :#16a085;\n"),e.write("\twidth : 500px;\n"),e.write("\theight : 400px;\n"),e.write("\tbackground-color : #ecf0f1;\n"),e.write("\tborder-radius: 8px;\n"),e.write("\tfont-family: Roboto-Regular;\n"),e.write("\tcolor : #7f8c8d;\n"),e.write("}\n"),e.write("\n"),e.write(".paragraph {\n"),e.write("\ttext-justify:inter-word;\n"),e.write("\tmargin-left : 20px;\n"),e.write("\tmargin-right : 20px;\n"),e.write("}\n"),e.write("\n"),e.write(".marginTopSmall {\n"),e.write("\tmargin-top: 40px;\n"),e.write("}\n"),e.write("\n"),e.write(".subText {\n"),e.write("\tcolor : #2F4F4F;\n"),e.write("\tfont-size: 12px;\n"),e.write("\tfont-weight: bold;\n"),e.write("}\n"),e.write("\n"),e.write(".headText {\n"),e.write("\tpadding : 8px;\n"),e.write("}\n"),e.write("\n"),e.write(".leftAlign {\n"),e.write("\ttext-align: left;\n"),e.write("}\n"),e.write("\n"),e.write(".marginLeft {\n"),e.write("\tmargin-left: 20px;\n"),e.write("}\n")}function createClientSocketEvents(){fs.truncate("src/static/js/socketEvents.js",function(){});var e=fs.createWriteStream("src/static/js/socketEvents.js",{flags:"a"});e.write("var socket=io('/');\n"),e.write("// connecting client\n"),e.write("socket.emit('user');\n"),e.write("// Usage \n"),e.write("// socket.emit('event') to call a socket event\n"),e.write("// socket.on('event', callback) for triggering a socket event \n"),e.write("/* \n"),e.write("ex :-\n"),e.write("\tsocket.emit('user'); \n"),e.write("\n"),e.write("\tsocket.on('userConnect', function(user){\n"),e.write("\t\tconsole.log(user);\n"),e.write("\t})\n"),e.write("*/\n")}function createIndexFile(){fs.truncate("src/index.html",function(){});var e=fs.createWriteStream("src/index.html",{flags:"a"});e.write("<!DOCTYPE html> \n"),e.write("<html> \n"),e.write("<head> \n"),e.write("<title></title> \n"),e.write("<link rel = 'stylesheet' type = 'text/css' href='css/fonts.css' /> \n"),e.write("<link rel = 'stylesheet' type = 'text/css' href='css/styles.css' /> \n"),e.write("</head> \n"),e.write("<body>\n"),e.write("<div class='container'>\n"),e.write("\t<div class = 'wrapper'>\n"),e.write("\t\t<div class = 'body'>\n"),e.write("\t\t\t<h2>DMODE says Hello!</h2>\n"),e.write("\t\t\t<p class = 'paragraph'>If you're viewing this page, that means you're successfully done with setting up a dmode project. DMODE is basically a MVT Node structure, that gives you rid of Node Callbacks. We're not done just here, we're improving and making things more easier for you. Now you can start making your Apps by writing simple javascript codes. For more, check github <a href='https://github.com/deepprakashp354/dmodev1.0.0/''>documentation</a>.</p>\n"),e.write("\t\t\t<p class='paragraph subText marginTopSmall'>Now go buddy create your apps and make your project powerfull in the easiest way.</p>\n"),e.write("\t\t\t<br />\n"),e.write("\t\t\t<hr />\n"),e.write("\t\t\t<div class='paragraph leftAlign marginLeft headText'>Commands</div>\n"),e.write("\t\t\t<div class='paragraph subText leftAlign'>* dmode startproject</div>\n"),e.write("\t\t\t<div class='paragraph subText leftAlign'>* dmode createapp [appname]</div>\n"),e.write("\t\t\t<div class='paragraph subText leftAlign'>* dmode migratefonts</div>\n"),e.write("\t\t</div>\n"),e.write("\t</div>\n"),e.write("</div>\n"),e.write("\n"),e.write("<script src='https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js'><\/script>\n"),e.write("<script src='js/socketEvents.js'><\/script>\n"),e.write("</body>\n"),e.write("</html>")}function createApp(e){fs.existsSync(e)||(fs.mkdirSync(e),console.log("setting up your app..."),createModelJs(e),createSocketJs(e),createUrlJs(e),createViewJs(e))}function createModelJs(e){fs.truncate(e+"/models.js",function(){});var t=fs.createWriteStream(e+"/models.js",{flags:"a"});t.write("var db = imports('db');\n"),t.write("// create schemas here\n"),t.write("// var testSchema = {\n"),t.write("// \t\tcol1:{ type: String, required: true, unique: true },\n"),t.write("// \t\tcol2:{ type: String, required: true },\n"),t.write("// };\n"),t.write("\n"),t.write("// create models here\n"),t.write("// var Test = db.models('test', testSchema);\n"),t.write("\n"),t.write("// exporting models\n"),t.write("// exports.Test = Test;")}function createSocketJs(e){fs.truncate(e+"/socket.js",function(){});var t=fs.createWriteStream(e+"/socket.js",{flags:"a"});t.write("// Your socket events here\n"),t.write("exports.testSocket = function(socket){\n"),t.write("\t // socket.emit('target', 'message') to emit a message\n"),t.write("\t // socket.on('event', callback) to trigger a socket event\n"),t.write("}")}function createUrlJs(e){fs.truncate(e+"/urls.js",function(){});var t=fs.createWriteStream(e+"/urls.js",{flags:"a"});t.write("var views = require('./views.js');\n"),t.write("\n"),t.write("module.exports = {\n"),t.write("// index : views.index\n"),t.write("}\n")}function createViewJs(e){fs.truncate(e+"/views.js",function(){});var t=fs.createWriteStream(e+"/views.js",{flags:"a"});t.write("var Secure = imports('Secure');\n"),t.write("var models = imports('prebuild/userModel');\n"),t.write("var HttpResponse = imports('response').HttpResponse;\n"),t.write("/*\n"),t.write("\twrite apis here,\n"),t.write("*/\n"),t.write("// login function\n"),t.write("exports.index = function(request, response){\n"),t.write("\tHttpResponse(response, {data : 'Hello DMODE!'});\n"),t.write("}")}var fs=require("fs"),path=require("path"),http=require("http"),commands=process.argv;if("install"==commands[2])createPackageJson(),installCliDependencies().then(installOtherDependencies).catch(e=>{console.log(e)});else if("createpackage"==commands[2])createPackageJson();else if("startproject"==commands[2]){var cmd=require(process.cwd()+"/node_modules/node-cmd"),chalk=require(process.cwd()+"/node_modules/chalk"),clear=require(process.cwd()+"/node_modules/clear"),CLI=require(process.cwd()+"/node_modules/clui"),figlet=require(process.cwd()+"/node_modules/figlet"),inquirer=require(process.cwd()+"/node_modules/inquirer"),Spinner=CLI.Spinner;clear(),console.log(chalk.blue(figlet.textSync("DMODE",{horizontalLayout:"full"})));var questions=[{name:"projectname",type:"input",message:"Project Name : ",validate:function(e){return!!e.length||"Please enter your username or e-mail address"}},{name:"description",type:"input",message:"Description (optional) : ",validate:function(e){return!0}},{name:"author",type:"input",message:"Author (optional): ",validate:function(e){return!0}},{name:"license",type:"input",message:"License (default - ISC) : ",validate:function(e){return!0}},{name:"secret",type:"input",message:"App Secret (optional): ",validate:function(e){return!0}},{name:"dbname",type:"input",message:"DB Name : ",validate:function(e){return!!e.length||"Please enter your database name"}},{name:"dbhost",type:"input",message:"DB Host (default - 127.0.0.1): ",validate:function(e){return!0}},{name:"dbusername",type:"input",message:"DB Username : ",validate:function(e){return!!e.length||"Please enter your database username"}},{name:"dbpassword",type:"input",message:"DB Password : ",validate:function(e){return!!e.length||"Please enter your database password"}},{name:"dbauth",type:"input",message:"DB AuthSource (default - admin): ",validate:function(e){return!0}}];inquirer.prompt(questions).then(createSettings).catch(e=>{})}else if("createapp"==commands[2]){var chalk=require(process.cwd()+"/node_modules/chalk"),RESERVED_WORDS=["libs","lib","src","node_modules"],settings=require(process.cwd()+"/settings.js"),createFlag=!0,error=null;void 0==commands[3]?(createFlag=!1,error="Error : Please provide <appname>\n\n\tUsage : dmode createapp <appname>\n"):commands[3]==settings.projectname?(createFlag=!1,error="Error : <appname> should not be same as projectname\n\n\tUsage : dmode createapp <appname>\n"):-1!==settings.INSTALLED_APPS.indexOf(commands[3])?(createFlag=!1,error="Error : Cannot create multiple apps with same name\n\n\tUsage : dmode createapp <appname>\n"):-1!==RESERVED_WORDS.indexOf(commands[3])&&(createFlag=!1,error="Error : Reserved Words\n\n\tUsage : dmode createapp <appname>\n"),void 0!==commands[3]&&1==createFlag?createApp(commands[3]):console.log(chalk.red(error))}else if("migratefonts"==commands[2]){var settings=require(process.cwd()+"/settings.js");fs.truncate("src/static/css/fonts.css",function(){});var file=fs.createWriteStream("src/static/css/fonts.css",{flags:"a"});settings.fonts.map(function(e,t){var r=e.split(".");file.write("@font-face {\n"),file.write("\tfont-family: "+r[0]+";\n"),file.write("\tsrc: url('../fonts/"+e+"');\n"),file.write("}\n")}),console.log("Successfully migrated fonts")}else console.log("\nUsage : dmode <command>\n\n1. install\n2. startproject\n3. createapp\n4. migratefonts");

