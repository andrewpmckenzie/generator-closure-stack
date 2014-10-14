#!/bin/sh

##
# Closure Stack Bootstraper
# -------------------------
# Installs node, grunt, yeoman locally then scaffolds, bootstraps
# and runs a closure-stack project.
##

DEPENDENCIES_DIR="./dependencies"
TEMP_DIR="./tmp"
SOURCE_DIR="./src"

case $(uname) in
  Linux)  OS="linux"   ;;
  Darwin) OS="darwin"  ;;
  *)      OS="unknown" ;;
esac

NODE_DIR="${DEPENDENCIES_DIR}/node"
NODE_BIN="${NODE_DIR}/bin/node"
NODE_SYMLINK="./node"
NODE_VERSION="v0.10.31"
NODE_PACKAGE_URL="http://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}-${OS}-x64.tar.gz"
NODE_TEMP_TAR="${TEMP_DIR}/node.tar.gz"
NPM_BIN="${NODE_DIR}/bin/npm"

GRUNT_VERSION="0.1.13"
GRUNT_SYMLINK="./grunt"
GRUNT_DIR="./node_modules/grunt-cli"
GRUNT_BIN="${GRUNT_DIR}/bin/grunt"

YEOMAN_VERSION="1.3.2"
YEOMAN_DIR="./node_modules/yo"
YEOMAN_BIN="${YEOMAN_DIR}/cli.js"
YEOMAN_GENERATOR="closure-stack"
YEOMAN_GENERATOR_PACKAGE="../generator-closure-stack"

mkdir -p ${TEMP_DIR}

### Check preconditions
if [ "${OS}" == "unknown" ]; then
  echo "ERROR: unsupported operating system \"$(uname)\" (needs OSX or Linux)"
  exit 1
fi

### Helper functions
echo_with_indent() { # usage: echo_with_indent TEXT_TO_PRINT INDENT_LEVEL
  case $2 in
    1) INDENT="  - " ;;
    2) INDENT="    - " ;;
    *) INDENT="" ;;
  esac
  echo "${INDENT}$1"
}

### Gather project information

### Install dependencies

## Node
echo_with_indent "Checking node" 0
if [ ! -f "${NODE_BIN}" ] || [ ! "$(${NODE_BIN} -v)" == "${NODE_VERSION}" ]; then
  echo_with_indent "Installing node ${NODE_VERSION} (${OS})" 1

  if [ -d "${NODE_DIR}" ]; then
    echo_with_indent "Removing node directory so it can be updated" 2
    rm -r ${NODE_DIR}
  fi

  mkdir -p ${NODE_DIR}
  echo_with_indent "Getting ${NODE_PACKAGE_URL}" 2
  curl ${NODE_PACKAGE_URL} -#o ${NODE_TEMP_TAR}
  echo_with_indent "Extracting to ${NODE_DIR}" 2
  tar -C ${NODE_DIR} -xf ${NODE_TEMP_TAR} --strip-components 1
  rm ${NODE_TEMP_TAR}

  echo_with_indent "Making node symlink" 2
  rm -f ${NODE_SYMLINK}
  ln -s ${NODE_BIN} ${NODE_SYMLINK}
else
  echo_with_indent "node is fine" 1
fi

## Grunt
echo_with_indent "Checking grunt" 0
if [ ! -f ${GRUNT_BIN} ] || [ ! "$(${GRUNT_BIN} -V | grep grunt-cli)" == "grunt-cli v${GRUNT_VERSION}" ]; then
  echo_with_indent "Installing grunt v${GRUNT_VERSION} from npm" 1
  rm -fr ${GRUNT_DIR}
  ${NPM_BIN} install grunt-cli@${GRUNT_VERSION}

  echo_with_indent "Making grunt symlink" 2
  rm -f ${GRUNT_SYMLINK}
  ln -s ${GRUNT_BIN} ${GRUNT_SYMLINK}
else
  echo_with_indent "grunt is fine" 1
fi

## Generation
echo_with_indent "Checking project" 0
if [ ! -f ./package.json ]; then

  echo_with_indent "Checking yeoman" 1
  if [ ! -f ${YEOMAN_BIN} ] || [ ! "$(${YEOMAN_BIN} -v)" == "${YEOMAN_VERSION}" ]; then
    echo_with_indent "Installing yeoman v${YEOMAN_VERSION} from npm" 1
    rm -fr ${YEOMAN_DIR}
    ${NPM_BIN} install yo@${YEOMAN_VERSION}
    ${NPM_BIN} install ${YEOMAN_GENERATOR_PACKAGE}
  else
    echo_with_indent "yeoman is fine" 2
  fi

  echo_with_indent "Generating project" 1
  ${YEOMAN_BIN} ${YEOMAN_GENERATOR} $@

else
  echo_with_indent "project exists" 1
fi

${GRUNT_SYMLINK} setup
${GRUNT_SYMLINK} run:dev
