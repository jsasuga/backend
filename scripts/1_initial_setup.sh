#!/bin/bash

# install nvm on server
sudo apt install curl
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# install required npm and node versions
nvm install 18.9.1
npm install --global yarn

# install backend dependencies
cd ~/backend
nvm use 18.9.1
yarn
cd ~
