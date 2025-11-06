#!/bin/bash

GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}Installing formulae...${NC}"
brew install $(<brew/formulae.txt)

echo -e "${GREEN}Installing casks...${NC}"
brew install $(<brew/casks.txt)