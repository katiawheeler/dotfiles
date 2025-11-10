# dotfiles

Collection of config files for multiple tools and scripts for my Mac setups.

## Install

To use, simply clone the repo and run `bash install.sh` from the root of the repo.

## Removal

Use the `bash unlink.sh` command to _just_ break the symlinks.

> [!CAUTION]
> Destructive action below

Use the `bash uninstall.sh` command to break the symlinks **AND** delete the added configuration files.

## Full comp clean setup

### Install oh-my-zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Install Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Install all packages at once

```bash
bash homebrew.sh
```

### Install the dotfiles

```bash
bash install.sh
```

### Current formulae

```
node
neovim
karabiner-elements
claude-code
wezterm
cursor
zed
raycast
rectangle
```

## Inventory

### Core Configuration Files

- [.editorconfig](.editorconfig) - Editor settings for consistent code formatting across IDEs
- [.vimrc](.vimrc) - Vim editor configuration and keybindings
- [install.sh](install.sh) - Installation script that creates symlinks for all config files
- [unlink.sh](unlink.sh) - Removes symlinks without deleting config files
- [uninstall.sh](uninstall.sh) - Removes symlinks and deletes config files

### Terminal & Shell

- [zsh/](.zsh/) - Zsh shell configuration
  - [.zshrc](zsh/.zshrc) - Main Zsh configuration file
  - [.p10k.zsh](zsh/.p10k.zsh) - Powerlevel10k prompt theme configuration
  - `zsh-syntax-highlighting/` - Syntax highlighting plugin for Zsh

### Terminal Emulators

- [wezterm/](.wezterm/) - WezTerm terminal emulator configuration
  - [.wezterm.lua](wezterm/.wezterm.lua) - Lua-based WezTerm config

### Text Editors

- [neovim/](neovim/) - Neovim configuration
  - [init.lua](neovim/init.lua) - Main Neovim entry point
  - `lua/` - Lua configuration modules
  - `lazy-lock.json` - Plugin version lockfile
- [zed/](zed/) - Zed editor configuration
  - [settings.json](zed/settings.json) - Zed editor settings

### Keyboard Customization

- [karabiner/](karabiner/) - Karabiner-Elements keyboard remapping
  - [karabiner.json](karabiner/karabiner.json) - Active keyboard mappings
  - `automatic_backups/` - Timestamped backup configurations

### AI Assistant

- [.claude/](.claude/) - Claude Code configuration
  - [settings.json](.claude/settings.json) - Claude Code settings
  - `commands/` - Custom slash commands
  - `agents/` - Custom subagents

### Productivity Tools

- [raycast/](raycast/) - Raycast launcher configuration
  - `*.rayconfig` - Raycast configuration backup/export file
  - `extensions/` - Custom Raycast extensions
  - **Note**: After installation, import the `.rayconfig` file through Raycast's UI: Raycast > Settings > Advanced > Import Configuration
