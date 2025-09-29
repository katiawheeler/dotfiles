 #!/bin/bash

GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}Creating necessary directories...${NC}"
mkdir -p ~/.config/nvim

echo -e "${GREEN}Syncing zsh files...${NC}"
ln -sf "$PWD/zsh/.zshrc" ~/.zshrc
ln -sf "$PWD/zsh/.zprofile" ~/.zprofile
ln -sf "$PWD/zsh/.p10k" ~/.p10k
ln -sf "$PWD/zsh/zsh-syntax-highlighting" ~/zsh-syntax-highlighting

echo -e "${GREEN}Syncing vim files...${NC}"
ln -sf "$PWD/.vimrc" ~/.vimrc

echo -e "${GREEN}Syncing neovim configuration...${NC}"
rm -rf ~/.config/nvim
ln -sf "$PWD/neovim" ~/.config/nvim
ln -sf "$PWD/.editorconfig" ~/.editorconfig

echo -e "${GREEN}Syncing wezterm configuration...${NC}"
rm -rf ~/.wezterm.lua
ln -sf "$PWD/wezterm/.wezterm.lua" ~/.wezterm.lua

echo -e "${GREEN}Syncing Karabiner configuration...${NC}"
mkdir -p ~/.config/karabiner
rm -rf ~/.config/karabiner/karabiner.json
ln -sf "$PWD/karabiner/karabiner.json" ~/.config/karabiner/karabiner.json

echo -e "${GREEN}Syncing Claude configuration...${NC}"
mkdir -p ~/.claude/commands
mkdir -p ~/.claude/agents
rm -rf ~/.claude/CLAUDE.md
ln -sf "$PWD/.claude/CLAUDE.md" ~/.claude/CLAUDE.md

for file in "$PWD"/.claude/commands/*; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        ln -sf "$file" ~/.claude/commands/"$filename"
        echo -e "  ${GREEN}Linked $filename${NC}"
    fi
done

for file in "$PWD"/.claude/agents/*; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        ln -sf "$file" ~/.claude/agents/"$filename"
        echo -e "  ${GREEN}Linked $filename${NC}"
    fi
done

echo -e "${GREEN}Done! Configuration files have been linked.${NC}"
