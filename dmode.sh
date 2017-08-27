#!/bin/bash

IFS=' ' read -a COMMAND <<< "$*"

# if install
if [ ${COMMAND[0]} == "install" ];
then 
	# declare -a cliDependencies=("chalk@^1.1.3" "clear@0.0.1" "clui@^0.3.6" "figlet@^1.2.0" "inquirer@^3.1.1" "node-cmd@^3.0.0");
	# declare -a otherDependencies=("async@^2.4.1" "body-parser@^1.17.2" "child-process@^1.0.2" "cookie-parser@^1.4.3" "crypto-js@^3.1.9-1" "express@^4.15.3" "mongoose@^4.10.7" "multer@^1.3.0" "promise@^8.0.0" "readline-sync@^1.4.7" "socket.io@^2.0.3" "swig@^1.4.2");

	# create package
	node /usr/local/bin/dmode.js createpackage
	# command for dmode install
	# node /usr/local/bin/dmode.js install
	echo "Installing Cli Dependencies"
	npm install --save chalk@^1.1.3 clear@0.0.1 clui@^0.3.6 figlet@^1.2.0 inquirer@^3.1.1 node-cmd@^3.0.0

	echo "Installing Other Dependencies"
	npm install --save async@^2.4.1 body-parser@^1.17.2 child-process@^1.0.2 cookie-parser@^1.4.3 crypto-js@^3.1.9-1 express@^4.15.3 mongoose@^4.10.7 multer@^1.3.0 promise@^8.0.0 readline-sync@^1.4.7 socket.io@^2.0.3 swig@^1.4.2 nodemon@^1.11.0
# start project
elif [ ${COMMAND[0]} == "startproject" ]; 
then
	# dmode start project command
	node /usr/local/bin/dmode.js startproject
# create app
elif [ ${COMMAND[0]} == "createapp" ];
then
	node /usr/local/bin/dmode.js createapp ${COMMAND[1]}
# migrate fonts
elif [ ${COMMAND[0]} == "migratefonts" ];
then
	node /usr/local/bin/dmode.js migratefonts
# version
elif [ ${COMMAND[0]} == "-v" ];
then
	echo "v1.0.0"
else
	node /usr/local/bin/dmode.js error
fi

