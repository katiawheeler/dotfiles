 #!/bin/bash

GREEN='\033[2;3;32m'
BRIGHT_GREEN='\033[1;32m'
GREY='\033[0;90m'
BLUE='\033[0;34m'
PURPLE='\033[38;5;90m'
ORANGE='\033[38;5;208m'
NC='\033[0m' # No Color

  echo ""
  echo -e "${PURPLE}📁 Creating necessary directories...${NC}"
mkdir -p ~/.config/nvim

  echo ""
  echo -e "${BLUE}💻 Syncing zsh files...${NC}"
ln -sf "$PWD/zsh/.zshrc" ~/.zshrc
ln -sf "$PWD/zsh/.zprofile" ~/.zprofile
ln -sf "$PWD/zsh/.p10k" ~/.p10k
ln -sf "$PWD/zsh/zsh-syntax-highlighting" ~/zsh-syntax-highlighting

  echo ""
  echo -e "${BLUE}✏️ Syncing vim files...${NC}"
ln -sf "$PWD/.vimrc" ~/.vimrc

  echo ""
  echo -e "${BLUE}📓 Syncing neovim configuration...${NC}"
rm -rf ~/.config/nvim
ln -sf "$PWD/neovim" ~/.config/nvim
ln -sf "$PWD/.editorconfig" ~/.editorconfig

  echo ""
  echo -e "${BLUE}🖥️ Syncing wezterm configuration...${NC}"
rm -rf ~/.wezterm.lua
ln -sf "$PWD/wezterm/.wezterm.lua" ~/.wezterm.lua

  echo ""
  echo -e "${BLUE}👻 Syncing Ghostty configuration...${NC}"
mkdir -p ~/.config/ghostty
rm -rf ~/.config/ghostty/config
ln -sf "$PWD/ghostty/config" ~/.config/ghostty/config

  echo ""
  echo -e "${BLUE}🔗 Syncing Karabiner configuration...${NC}"
mkdir -p ~/.config/karabiner
rm -rf ~/.config/karabiner/karabiner.json
ln -sf "$PWD/karabiner/karabiner.json" ~/.config/karabiner/karabiner.json

  echo ""
  echo -e "${BLUE}🤖 Syncing Claude configuration...${NC}"
mkdir -p ~/.claude/commands
mkdir -p ~/.claude/agents
mkdir -p ~/.claude/skills
rm -rf ~/.claude/CLAUDE.md
ln -sf "$PWD/.claude/CLAUDE.md" ~/.claude/CLAUDE.md

for file in "$PWD"/.claude/commands/*; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        ln -sf "$file" ~/.claude/commands/"$filename"
        echo -e "  ${GREY}Linked $filename${NC}"
    fi
done

for file in "$PWD"/.claude/agents/*; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        ln -sf "$file" ~/.claude/agents/"$filename"
        echo -e "  ${GREY}Linked $filename${NC}"
    fi
done

# Handle skills with subdirectories
for dir in "$PWD"/.claude/skills/*/; do
    if [ -d "$dir" ]; then
        dirname=$(basename "$dir")
        mkdir -p ~/.claude/skills/"$dirname"
        for file in "$dir"*; do
            if [ -f "$file" ]; then
                filename=$(basename "$file")
                ln -sf "$file" ~/.claude/skills/"$dirname"/"$filename"
                echo -e "  ${GREY}Linked skills/$dirname/$filename${NC}"
            fi
        done
    fi
done

  echo ""
  echo -e "${BLUE}⌨️  Syncing QMK keymap...${NC}"
# Check both rev1 and rev2
if [ -d ~/qmk_firmware/keyboards/gmmk/pro/rev1/ansi/keymaps ]; then
    QMK_KEYMAP_PATH=~/qmk_firmware/keyboards/gmmk/pro/rev1/ansi/keymaps/mac
    QMK_KEYBOARD="gmmk/pro/rev1/ansi"
elif [ -d ~/qmk_firmware/keyboards/gmmk/pro/rev2/ansi/keymaps ]; then
    QMK_KEYMAP_PATH=~/qmk_firmware/keyboards/gmmk/pro/rev2/ansi/keymaps/mac
    QMK_KEYBOARD="gmmk/pro/rev2/ansi"
else
    echo -e "  ${ORANGE}Warning: QMK firmware directory not found. Skipping keymap sync.${NC}"
    echo -e "  ${GREY}Install QMK with: brew install qmk/qmk/qmk && qmk setup${NC}"
    QMK_KEYMAP_PATH=""
fi

if [ -n "$QMK_KEYMAP_PATH" ]; then
    rm -rf "$QMK_KEYMAP_PATH"
    ln -sf "$PWD/qmk/mac" "$QMK_KEYMAP_PATH"
    echo -e "  ${GREY}Linked QMK keymap${NC}"
    echo ""
    echo -e "  ${ORANGE}To flash your keyboard:${NC}"
    echo -e "  ${GREY}1. Run: qmk flash -kb $QMK_KEYBOARD -km mac${NC}"
    echo -e "  ${GREY}2. When prompted, enter bootloader mode by pressing: Fn + Backslash${NC}"
    echo -e "  ${GREY}3. The firmware will compile and flash automatically${NC}"
fi

  echo ""
  echo -e "${BLUE}⚡ Syncing Raycast configuration...${NC}"
mkdir -p ~/Library/Application\ Support/Raycast
# Link extensions directory
if [ -d ~/Library/Application\ Support/Raycast/Extensions ]; then
    # Backup existing extensions if they exist
    if [ ! -L ~/Library/Application\ Support/Raycast/Extensions ]; then
        echo -e "  ${GREY}Backing up existing Raycast extensions...${NC}"
        mv ~/Library/Application\ Support/Raycast/Extensions ~/Library/Application\ Support/Raycast/Extensions.backup.$(date +%Y%m%d_%H%M%S)
    else
        unlink ~/Library/Application\ Support/Raycast/Extensions
    fi
fi
ln -sf "$PWD/raycast/extensions" ~/Library/Application\ Support/Raycast/Extensions
echo -e "  ${GREY}Linked Raycast extensions${NC}"

# Copy config file to Raycast directory for easy import
# Note: .rayconfig files need to be imported through Raycast's UI
# Raycast > Settings > Advanced > Import Configuration
config_file=$(ls "$PWD/raycast/"*.rayconfig 2>/dev/null | head -1)
if [ -n "$config_file" ] && [ -f "$config_file" ]; then
    cp "$config_file" ~/Library/Application\ Support/Raycast/
    echo -e "  ${GREY}Copied Raycast configuration file${NC}"
    echo -e "  ${ORANGE}To import: Open Raycast > Settings > Advanced > Import Configuration${NC}"
fi

  echo ""
  echo -e "${BRIGHT_GREEN}✅ Done! Configuration files have been linked. 🚀${NC}"
