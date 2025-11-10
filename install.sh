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

echo -e "${GREEN}Syncing Raycast configuration...${NC}"
mkdir -p ~/Library/Application\ Support/Raycast
# Link extensions directory
if [ -d ~/Library/Application\ Support/Raycast/Extensions ]; then
    # Backup existing extensions if they exist
    if [ ! -L ~/Library/Application\ Support/Raycast/Extensions ]; then
        echo -e "  ${GREEN}Backing up existing Raycast extensions...${NC}"
        mv ~/Library/Application\ Support/Raycast/Extensions ~/Library/Application\ Support/Raycast/Extensions.backup.$(date +%Y%m%d_%H%M%S)
    else
        unlink ~/Library/Application\ Support/Raycast/Extensions
    fi
fi
ln -sf "$PWD/raycast/extensions" ~/Library/Application\ Support/Raycast/Extensions
echo -e "  ${GREEN}Linked Raycast extensions${NC}"

# Copy config file to Raycast directory for easy import
# Note: .rayconfig files need to be imported through Raycast's UI
# Raycast > Settings > Advanced > Import Configuration
config_file=$(ls "$PWD/raycast/"*.rayconfig 2>/dev/null | head -1)
if [ -n "$config_file" ] && [ -f "$config_file" ]; then
    cp "$config_file" ~/Library/Application\ Support/Raycast/
    echo -e "  ${GREEN}Copied Raycast configuration file${NC}"
    echo -e "  ${GREEN}To import: Open Raycast > Settings > Advanced > Import Configuration${NC}"
fi

echo -e "${GREEN}Done! Configuration files have been linked.${NC}"
