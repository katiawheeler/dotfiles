eval "$(/opt/homebrew/bin/brew shellenv)"

export PATH="/opt/homebrew/opt/ruby/bin:$PATH"

export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init --path)"

export LOCAL_SCRIPTS_DIR="$HOME/code/dotfiles/scripts"
export PATH="$LOCAL_SCRIPTS_DIR:$PATH"

# Added by `rbenv init` on Fri Mar  6 09:32:51 CST 2026
eval "$(rbenv init - --no-rehash zsh)"
