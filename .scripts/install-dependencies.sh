#!/bin/sh

PACKAGES=(nodeunit@0.5.1 nodelint@0.4.0)
ENVIRONMENT=$(uname -s)

function fatalError() {
    echo "\033[31m----------------------------------------"
    echo "FATAL ERROR: $1"
    echo "----------------------------------------\033[0m"
    exit 1;
}

function warn() {
    echo "\033[33m----------------------------------------"
    echo "Warning: $1"
    echo "----------------------------------------\033[0m"
}

echo "Checking Dependencies..."
if [[ ! $(which node) ]]; then

    warn "Node.js not found. Installing..."

    if [[ $ENVIRONMENT == "Darwin" ]]; then

        if [[ ! $(which brew) ]]; then
            warn "Homebrew not found. Installing..."
            ruby -e "$(curl -fsSL https://gist.github.com/raw/323731/install_homebrew.rb)"
        fi

        brew install node

    elif [[ $ENVIRONMENT == "Linux" ]]; then

        # Totally untested
        git clone --depth 1 https://github.com/joyent/node.git
        cd node
        export JOBS=2 # optional, sets number of parallel commands.
        mkdir ~/local
        ./configure --prefix=$HOME/local/node
        make
        make install
        export PATH=$HOME/local/node/bin:$PATH

    else

        fatalError "You're probably running Windows. Please build node into Cygwin. More information here: https://github.com/joyent/node/wiki/Installation"

    fi
fi

if [[ ! $(which npm) ]]; then
    warn "NPM not found. Installing..."
    curl http://npmjs.org/install.sh | sh
fi

for i in ${PACKAGES[@]}
do
    if [[ ! $(npm la | grep $i) ]]; then
        echo "Installing " $i "..."
        npm install $i
    fi
done
