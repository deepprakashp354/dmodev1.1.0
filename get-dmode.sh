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
		sudo wget -P /tmp/dmode-temp/ "https://s3.us-east-2.amazonaws.com/dmodev2.0.1/linux/dmode-linux-v2.0.1.zip"
		sudo wget  -P /tmp/dmode-temp/ "https://s3.us-east-2.amazonaws.com/dmodev2.0.1/linux/dmode.sh"

		# creating executable
		echo "setting up enviroment variable.."
		sudo chmod +x /tmp/dmode-temp/dmode.sh

		# moving file to usr/local/bin
		echo "copying files.."
		# sudo apt-get install unzip
		sudo unzip /tmp/dmode-temp/dmode-linux-v2.0.1.zip -d /tmp/dmode-temp/
		sudo mkdir -p /usr/local/bin/dmode/
		sudo mv /tmp/dmode-temp/dmode.obfuscated/* /usr/local/bin/dmode/
		sudo mv /tmp/dmode-temp/dmode.sh /usr/bin/dmode

		# removing temp file
		echo "removing temp files..."
		# sudo rm -rf /tmp/dmode-temp

		# getting permission
		echo "getting permission..."
		sudo chown root: /usr/bin/dmode
		sudo chmod 755 /usr/bin/dmode

		# done message
		echo "done..."

	else
		echo "Usage : ./get-dmode.sh install"
	fi
done