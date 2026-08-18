#!/bin/bash
set -euo pipefail

GREEN='\033[2;3;32m'
BRIGHT_GREEN='\033[1;32m'
GREY='\033[0;90m'
BLUE='\033[0;34m'
PURPLE='\033[38;5;90m'
ORANGE='\033[38;5;208m'
NC='\033[0m'

link() {
  ln -sf "$1" "$2"
  echo -e "  ${GREY}Linked $(basename "$2")${NC}"
}

install_skills() {
  # Pull the latest skills from upstream instead of syncing stale vendored copies.
  npx -y skills add mattpocock/skills -g -a claude-code -a codex -y
  npx -y skills add DietrichGebert/ponytail \
    -s ponytail -s ponytail-audit -s ponytail-review \
    -g -a claude-code -a codex -y
}

sync_local_skills() {
  local target="$1"
  local source="$PWD/.claude/skills"

  [ -d "$source" ] || return
  mkdir -p "$target"
  cp -R "$source/." "$target/"
  echo -e "  ${GREY}Copied local skills to $target${NC}"
}

echo ""
echo -e "${PURPLE}📁 Creating necessary directories...${NC}"
mkdir -p ~/.config/nvim

echo ""
echo -e "${BLUE}💻 Syncing zsh files...${NC}"
link "$PWD/zsh/.zshrc" ~/.zshrc
link "$PWD/zsh/.zprofile" ~/.zprofile
link "$PWD/zsh/.p10k" ~/.p10k
link "$PWD/zsh/zsh-syntax-highlighting" ~/zsh-syntax-highlighting
if [ ! -d ~/.oh-my-zsh ]; then
  echo -e "${BLUE}Installing Oh My Zsh${NC}"
  sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
else
  echo -e "  ${GREY}Oh My Zsh already installed, skipping${NC}"
fi

echo ""
echo -e "${BLUE}✏️ Syncing vim files...${NC}"
link "$PWD/.vimrc" ~/.vimrc

echo ""
echo -e "${BLUE}📓 Syncing neovim configuration...${NC}"
rm -rf ~/.config/nvim
link "$PWD/neovim" ~/.config/nvim
link "$PWD/.editorconfig" ~/.editorconfig

echo ""
echo -e "${BLUE}🖥️ Syncing wezterm configuration...${NC}"
rm -f ~/.wezterm.lua
link "$PWD/wezterm/.wezterm.lua" ~/.wezterm.lua

echo ""
echo -e "${BLUE}👻 Syncing Ghostty configuration...${NC}"
mkdir -p ~/.config/ghostty
rm -f ~/.config/ghostty/config
link "$PWD/ghostty/config" ~/.config/ghostty/config

echo ""
echo -e "${BLUE}🔗 Syncing Karabiner configuration...${NC}"
mkdir -p ~/.config/karabiner
rm -f ~/.config/karabiner/karabiner.json
link "$PWD/karabiner/karabiner.json" ~/.config/karabiner/karabiner.json

echo ""
echo -e "${BLUE}🤖 Syncing Claude configuration...${NC}"
mkdir -p ~/.claude/commands ~/.claude/agents
rm -f ~/.claude/CLAUDE.md
link "$PWD/.claude/CLAUDE.md" ~/.claude/CLAUDE.md

for file in "$PWD"/.claude/commands/*; do
  [ -f "$file" ] || continue
  filename=$(basename "$file")
  ln -sf "$file" ~/.claude/commands/"$filename"
  echo -e "  ${GREY}Linked $filename${NC}"
done

for file in "$PWD"/.claude/agents/*; do
  [ -f "$file" ] || continue
  filename=$(basename "$file")
  ln -sf "$file" ~/.claude/agents/"$filename"
  echo -e "  ${GREY}Linked $filename${NC}"
done

echo ""
echo -e "${BLUE}🧠 Installing agent skills via skills.sh...${NC}"
if command -v npx >/dev/null 2>&1; then
  install_skills
else
  echo -e "  ${ORANGE}npx not found — skipping skill install. Install Node.js, then re-run.${NC}"
fi
sync_local_skills ~/.claude/skills
sync_local_skills ~/.codex/skills



echo ""
echo -e "${BLUE}⌨️  Syncing QMK keymap...${NC}"
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
if [ -d ~/Library/Application\ Support/Raycast/Extensions ]; then
  if [ ! -L ~/Library/Application\ Support/Raycast/Extensions ]; then
    echo -e "  ${GREY}Backing up existing Raycast extensions...${NC}"
    mv ~/Library/Application\ Support/Raycast/Extensions ~/Library/Application\ Support/Raycast/Extensions.backup.$(date +%Y%m%d_%H%M%S)
  else
    unlink ~/Library/Application\ Support/Raycast/Extensions
  fi
fi
ln -sf "$PWD/raycast/extensions" ~/Library/Application\ Support/Raycast/Extensions
echo -e "  ${GREY}Linked Raycast extensions${NC}"

config_file=$(ls "$PWD/raycast/"*.rayconfig 2>/dev/null | head -1)
if [ -n "$config_file" ] && [ -f "$config_file" ]; then
  cp "$config_file" ~/Library/Application\ Support/Raycast/
  echo -e "  ${GREY}Copied Raycast configuration file${NC}"
  echo -e "  ${ORANGE}To import: Open Raycast > Settings > Advanced > Import Configuration${NC}"
fi

echo ""
echo -e "${BRIGHT_GREEN}✅ Done! Configuration files have been linked. 🚀${NC}"
