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
