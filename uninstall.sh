#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${RED}Uninstalling dotfiles configuration...${NC}"

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

echo -e "${GREEN}Unlinking Ghostty configuration...${NC}"
[ -L ~/.config/ghostty/config ] && unlink ~/.config/ghostty/config

echo -e "${GREEN}Unlinking Karabiner configuration...${NC}"
[ -L ~/.config/karabiner/karabiner.json ] && unlink ~/.config/karabiner/karabiner.json

echo -e "${GREEN}Unlinking Claude configuration...${NC}"
[ -L ~/.claude/CLAUDE.md ] && unlink ~/.claude/CLAUDE.md

# Remove command symlinks that match files in this repo
if [ -d ~/.claude/commands ]; then
    for file in "$PWD"/.claude/commands/*; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            if [ -L ~/.claude/commands/"$filename" ]; then
                unlink ~/.claude/commands/"$filename"
                echo -e "  ${GREEN}Unlinked $filename${NC}"
            fi
        fi
    done
fi

# Remove agent symlinks that match files in this repo
if [ -d ~/.claude/agents ]; then
    for file in "$PWD"/.claude/agents/*; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            if [ -L ~/.claude/agents/"$filename" ]; then
                unlink ~/.claude/agents/"$filename"
                echo -e "  ${GREEN}Unlinked $filename${NC}"
            fi
        fi
    done
fi

echo -e "${GREEN}Unlinking Raycast configuration...${NC}"
[ -L ~/Library/Application\ Support/Raycast/Extensions ] && unlink ~/Library/Application\ Support/Raycast/Extensions

# Remove directories that were created by install (only if empty)
echo -e "${GREEN}Cleaning up empty directories...${NC}"
rmdir ~/.config/ghostty 2>/dev/null || true
rmdir ~/.config/karabiner 2>/dev/null || true
rmdir ~/.config/nvim 2>/dev/null || true
rmdir ~/.claude/commands 2>/dev/null || true
rmdir ~/.claude/agents 2>/dev/null || true

echo -e "${RED}Done! All dotfiles symlinks have been unlinked.${NC}"
