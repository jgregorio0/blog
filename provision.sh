#https://wiki-ebabel.herokuapp.com/index.php?title=Vagrant-nodejs-angularjs-tutorial

 #! /bin/bash
 if [ ! -f /home/vagrant/already-installed-flag ]
 then
   echo "*********UBUNTU UPDATE*********"
   sudo apt-get update
   lsb_release -a

   echo "*********BUILD ESSENTIAL*********"
   sudo apt-get -qq -y install build-essential libssl-dev

   echo "*********INSTALL TREE*********"
   apt-get -qq -y install tree
   tree --version

   echo "*********INSTALL UNZIP*********"
   apt-get -qq -y install unzip
   unzip -v
   touch /home/vagrant/already-installed-flag

   echo "*********INSTALL GIT*********"
   apt-get -qq -y install git
   git --version
   git config --global user.name "jgregorio"
   git config --global user.email gregoriojesus0@gmail.com

   #echo "*********INSTALL NVM && NODEJS && NPM*********"
   #TODO change to user vagrant??
  #cd /home/vagrant
  #git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
  #echo "source ~/.nvm/nvm.sh" >> ~/.profile
  #source ~/.profile
  #nvm install 8.12
  #nvm alias default 8.12
  #node -v
  #npm -v

  #echo "*********INSTALL VUE CLI*********"
  #npm install -g vue-cli

  #echo "*********INSTALL PROJECT*********"
  #cd /home/vagrant/project
  #npm install

   echo "*********Done!*********"
 else
   echo "already installed flag set : /home/vagrant/already-installed-flag"
 fi
