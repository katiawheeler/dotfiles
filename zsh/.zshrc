# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# If you come from bash you might have to change your $PATH.
# export PATH=~/usr/bin:/bin:/usr/sbin:/sbin:$PATH

# Path to your Oh My Zsh installation.
export ZSH="$HOME/.oh-my-zsh"

ZSH_THEME="robbyrussell"

# Uncomment the following line if pasting URLs and other text is messed up.
# DISABLE_MAGIC_FUNCTIONS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

HIST_STAMPS="mm/dd/yyyy"

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(
	colorize
	dotenv
	macos
        brew
        sudo
        npm
	git
	)

source $ZSH/oh-my-zsh.sh

# ------------------------------------------------------------------------------
# User configuration after sourcing oh-my-zsh
# ------------------------------------------------------------------------------

# Preferred editor for local and remote sessions
if [[ -n $SSH_CONNECTION ]]; then
  export EDITOR='vim'
else
  export EDITOR='nvim'
fi

# node.js & nvm config
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion

# ------------------------------------------------------------------------------
# Aliases
# ------------------------------------------------------------------------------

# Directories
alias vibe="cd ~/Desktop/mine/vibe"
alias mine="cd ~/Desktop/mine"

# Commands
alias claude="devx claude"
alias vim="nvim"

# Configs
alias zshrc="vim ~/.zshrc"
alias claude.json="vim ~/.claude.json"
alias CLAUDE.md="vim ~/.claude/CLAUDE.md"

# ------------------------------------------------------------------------------
# p10k configuration
# ------------------------------------------------------------------------------
source ~/powerlevel10k/powerlevel10k.zsh-theme

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
source ~/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# ------------------------------------------------------------------------------
# Custom functions
# ------------------------------------------------------------------------------

# Custom functions
gtlfg() { gt modify "$@" && gt sync -f && gt submit --stack --update-only; }


# ------------------------------------------------------------------------------
# Shopify specific configuration
# ------------------------------------------------------------------------------
[ -f /opt/dev/dev.sh ] && source /opt/dev/dev.sh
if [ -e /Users/katiawheeler/.nix-profile/etc/profile.d/nix.sh ]; then . /Users/katiawheeler/.nix-profile/etc/profile.d/nix.sh; fi # added by Nix installer

[[ -f /opt/dev/sh/chruby/chruby.sh ]] && type chruby >/dev/null 2>&1 || chruby () { source /opt/dev/sh/chruby/chruby.sh; chruby "$@"; }

[[ -x /usr/local/bin/brew ]] && eval $(/usr/local/bin/brew shellenv)

# Added by tec agent
[[ -x /Users/katiawheeler/.local/state/tec/profiles/base/current/global/init ]] && eval "$(/Users/katiawheeler/.local/state/tec/profiles/base/current/global/init zsh)"
