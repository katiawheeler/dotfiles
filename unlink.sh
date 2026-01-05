#!/bin/bash

GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}Unlinking zsh files...${NC}"
[ -L ~/.zshrc ] && unlink ~/.zshrc
[ -L ~/.zprofile ] && unlink ~/.zprofile
[ -L ~/.p10k ] && unlink ~/.p10k
[ -L ~/zsh-syntax-highlighting ] && unlink ~/zsh-syntax-highlighting

echo -e "${GREEN}Unlinking vim files...${NC}"
[ -L ~/.vimrc ] && unlink ~/.vimrc

echo -e "${GREEN}Unlinking neovim configuration...${NC}"
[ -L ~/.config/nvim ] && unlink ~/.config/nvim
[ -L ~/.editorconfig ] && unlink ~/.editorconfig

echo -e "${GREEN}Unlinking wezterm configuration...${NC}"
[ -L ~/.wezterm.lua ] && unlink ~/.wezterm.lua

echo -e "${GREEN}Unlinking Karabiner configuration...${NC}"
[ -L ~/.config/karabiner/karabiner.json ] && unlink ~/.config/karabiner/karabiner.json

echo -e "${GREEN}Unlinking Claude configuration...${NC}"
[ -L ~/.claude/CLAUDE.md ] && unlink ~/.claude/CLAUDE.md

echo -e "${GREEN}Unlinking Raycast configuration...${NC}"
[ -L ~/Library/Application\ Support/Raycast/Extensions ] && unlink ~/Library/Application\ Support/Raycast/Extensions
