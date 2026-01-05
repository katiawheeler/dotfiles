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

#------------------------------------------------------------------------------
# Aliases
# ------------------------------------------------------------------------------

# Directories
# alias vibe="cd ~/Desktop/mine/vibe"
# alias mine="cd ~/Desktop/mine"

# Commands
alias claude="devx claude"
alias vim="nvim"
alias ez="exec zsh"
alias codex="devx codex"

# Configs
alias zshrc="vim ~/.zshrc"
alias claude.json="vim ~/.claude.json"
alias CLAUDE.md="vim ~/.claude/CLAUDE.md"
alias settings.json="nvim ~/.claude/settings.json"
alias wezterm.lua="nvim ~/.wezterm.lua"

# ------------------------------------------------------------------------------
# p10k configuration
# ------------------------------------------------------------------------------
source /opt/homebrew/share/powerlevel10k/powerlevel10k.zsh-theme

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
source ~/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# ------------------------------------------------------------------------------
# Custom functions
# ------------------------------------------------------------------------------

# Graphite
gtlfg() { gt modify "$@" && gt sync -f && gt submit --stack --update-only; }

# Directories
vibe() {
    cd ~/Desktop/mine/vibe/$@
}

mine() {
    cd ~/Desktop/mine/$@
}

desktop() {
  cd ~/Desktop/$@
}

# Misc
cheat() {
  claude -p "$*" --model haiku --append-system-prompt "You are a concise cheat sheet. Provide ONLY the shortest possible answer - just the command, key combination, or flag needed. No explanations, no context, no formatting. Just the raw answer."
}
