
header() {
    echo "\033[38;5;165m\n$1\n\033[m"
}

header 'Configuring dev and test database...'
yarn db:init
NODE_ENV=test yarn db:init

header 'Running tests...'
yarn test

