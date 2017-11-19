#!/bin/bash

IFS=' ' read -a COMMAND <<< "$*"

# if install
if [[ ${COMMAND[0]} == "install" ]];
then
	# create package
	node /usr/local/bin/dmode.js createpackage
	# command for dmode install
	# node /usr/local/bin/dmode.js install
	echo "Installing Cli Dependencies"
	npm install --save chalk@^1.1.3 clear@0.0.1 clui@^0.3.6 figlet@^1.2.0 inquirer@^3.1.1 node-cmd@^3.0.0

	echo "Installing Other Dependencies"
	npm install --save jsonwebtoken@^8.1.0 async@^2.4.1 body-parser@^1.17.2 child-process@^1.0.2 cookie-parser@^1.4.3 crypto-js@^3.1.9-1 express@^4.15.3 mongoose@^4.10.7 multer@^1.3.0 promise@^8.0.0 readline-sync@^1.4.7 socket.io@^2.0.3 swig@^1.4.2 nodemon@^1.11.0
# start project
elif [[ ${COMMAND[0]} == "startproject" ]]; 
then
	# dmode start project command
	# with react-redux-template
	if [[ ${COMMAND[1]} == "react-redux-template" ]];
	then
		# installing react-redux dependencies
		npm install --save babel-core@^6.21.0 babel-loader@^6.2.10 babel-plugin-add-module-exports@^0.2.1 babel-plugin-react-html-attrs@^2.0.0 babel-plugin-transform-class-properties@^6.23.0 babel-plugin-transform-decorators-legacy@^1.3.4 babel-preset-es2015@^6.18.0 babel-preset-react@^6.16.0 babel-preset-stage-0@^6.16.0 react@^15.4.1 react-cookie@^1.0.4 react-dom@^15.4.1 react-redux@^5.0.1 react-router@^3.0.0 react-router-redux@^4.0.7 redux@^3.6.0 redux-devtools@^3.3.1 redux-localstorage@^0.4.1 redux-logger@^2.7.4 redux-promise-middleware@^4.2.0 redux-thunk@^2.1.0 webpack@^1.14.0 webpack-bundle-tracker@^0.1.0 webpack-dev-middleware@^1.10.1 webpack-dev-server@^1.16.2
		node /usr/local/bin/dmode.js startproject ${COMMAND[1]}
	# with react-template
	elif [[ ${COMMAND[1]} == "react-template" ]];
	then
		# installing react-redux dependencies
		npm install --save babel-core@^6.21.0 babel-loader@^6.2.10 babel-plugin-add-module-exports@^0.2.1 babel-plugin-react-html-attrs@^2.0.0 babel-plugin-transform-class-properties@^6.23.0 babel-plugin-transform-decorators-legacy@^1.3.4 babel-preset-es2015@^6.18.0 babel-preset-react@^6.16.0 babel-preset-stage-0@^6.16.0 react@^15.4.1 react-cookie@^1.0.4 react-dom@^15.4.1 react-router@^3.0.0 webpack@^1.14.0 webpack-bundle-tracker@^0.1.0 webpack-dev-middleware@^1.10.1 webpack-dev-server@^1.16.2
		node /usr/local/bin/dmode.js startproject ${COMMAND[1]}
	# with plane html template
	elif [[ ${COMMAND[1]} == "" ]];
	then
		# with plain html template
		node /usr/local/bin/dmode.js startproject ${COMMAND[1]}
	# wrong command
	else
		# error commands from startproject
		node /usr/local/bin/dmode.js errorstartproject
	fi
# create app
elif [[ ${COMMAND[0]} == "createapp" ]];
then
	node /usr/local/bin/dmode.js createapp ${COMMAND[1]}
# migrate fonts
elif [[ ${COMMAND[0]} == "migratefonts" ]];
then
	node /usr/local/bin/dmode.js migratefonts
# version
elif [[ ${COMMAND[0]} == "-v" ]];
then
	echo "v1.1.0"
else
	node /usr/local/bin/dmode.js error
fi