
header() {
    echo "\033[38;5;165m\n$1\n\033[m"
}

header 'Installing dependencies...'
yarn install

header 'Configuring database...'
yarn db:init
NODE_ENV=test yarn db:init

header 'Running tests...'
yarn test

