#!/bin/bash

# getting input
for command in $*; do
	if [ ${command} == "install" ];
	then
		# create temp,
		# download files,
		# copy to /usr/local/bin/,
		# remove the temporary folder
		sudo mkdir -p /tmp/dmode-temp/;
		
		# download
		echo "downloading dmode cli..."
		sudo wget -P /tmp/dmode-temp/ "http://officeshop.co.in/dmode/dmode.js"
		sudo wget  -P /tmp/dmode-temp/ "http://officeshop.co.in/dmode/dmode.sh"

		# creating executable
		echo "setting up enviroment variable.."
		sudo chmod +x /tmp/dmode-temp/dmode.sh

		# moving file to usr/local/bin
		echo "copying files.."
		sudo cp /tmp/dmode-temp/dmode.js /usr/local/bin/
		sudo cp /tmp/dmode-temp/dmode.sh /usr/local/bin/
		sudo cp /tmp/dmode-temp/dmode.js /usr/bin/dmode
		sudo cp /tmp/dmode-temp/dmode.sh /usr/bin/dmode

		# removing temp file
		echo "removing temp files..."
		sudo rm -rf /tmp/dmode-temp

		# getting permission
		echo "getting permission..."
		sudo chown root: /usr/bin/dmode
		sudo chmod 755 /usr/bin/dmode
		sudo chown root: /usr/local/bin/dmode.sh
		sudo chmod 755 /usr/local/bin/dmode.sh

		# done message
		echo "done..."

	else
		echo "Usage : ./get-dmode.sh install"
	fi
done

