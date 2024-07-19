# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH="/Users/zp29/.oh-my-zsh"
export PROMPT_COMMAND='echo -ne "\033];${PWD##*/}\007"; ':"$PROMPT_COMMAND";

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
# ZSH_THEME="random"
ZSH_THEME="robbyrussell"
# ZSH_THEME="cloud"

# Set list of themes to pick from when loading at random
# Setting this variable when ZSH_THEME=random will cause zsh to load
# a theme from this variable instead of looking in $ZSH/themes/
# If set to an empty array, this variable will have no effect.
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion.
# Case-sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
# DISABLE_AUTO_UPDATE="true"

# Uncomment the following line to automatically update without prompting.
# DISABLE_UPDATE_PROMPT="true"

# Uncomment the following line to change how often to auto-update (in days).
# export UPDATE_ZSH_DAYS=13

# Uncomment the following line if pasting URLs and other text is messed up.
# DISABLE_MAGIC_FUNCTIONS="true"

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# Caution: this setting can cause issues with multiline prompts (zsh 5.7.1 and newer seem to work)
# See https://github.com/ohmyzsh/ohmyzsh/issues/5765
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# You can set one of the optional three formats:
# "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# or set a custom format using the strftime function format specifications,
# see 'man strftime' for details.
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse extract)
# Add wisely, as too many plugins slow down shell startup.

# plugins=(git)
plugins=(
  git
  sublime
  zsh-autosuggestions
  zsh-syntax-highlighting
  z
  extract
  zsh-vi-mode
)

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

alias ClickAliServer="ssh root@47.100.199.74"
alias iptest="curl cip.cc"
alias pip="pip3"
alias python="python3"
alias ClickServer="ssh ubuntu@174.129.49.188 -i ~/click/click-cordova/click-server/file/server-pem/server.pem"
alias resetCommit="git reset --soft HEAD^"
alias m1="arch -x86_64"
alias getip="ifconfig | grep inet"

# alias flutter="/Users/zp29/Developer/Flutter/bin/flutter"
export PATH=/Users/zp29/Developer/flutter/bin:$PATH


alias googleLink=" export http_proxy=http://192.168.1.2:1087;export https_proxy=http://192.168.1.2:1087; "
alias githubLink=" git config --global https.proxy http://192.168.1.2:1087 "
alias githubUnLink=" git config --global --unset http.proxy "

# alias googleLink ='f() { export http_proxy=http://$1;export https_proxy=http://$1; };f'

alias gcloud="~/Downloads/App\ Down/google-cloud-sdk/bin/gcloud"

alias lvim="~/.local/bin/lvim"


# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

# export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

nvminit ()
{
version=${1:-14} export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")";
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; # This loads nvm
nvm use $version;
node -v;
}

mpcitg() {
  npm run build:itg
  tar -cvf dist.tar dist/
  sshpass -p "Admin..." scp -rp dist.tar root@172.30.103.2:/home/eoop/tools/bbraun-itg/mpc-web/;
  # scp -rp dist.tar root@172.30.103.2:/home/eoop/tools/bbraun-itg/mpc-web/
  curl https://tower-itg.bbraunchina.cn/hooks/itg-deploy-mpc-web
  rm -rf dist.tar
}
mvzip() {
  if [ "$#" -eq 0 ]; then
    echo "Usage: mvzip <version>"
    return 1
  fi

  zip_name="${PWD##*/}-$1.zip"

  zip -r "$zip_name" dist

  if [ "$#" -eq 1 ]; then
    upload_file "./$zip_name"
    # pushd .
    # mv -f "$zip_name" ~/Downloads/29/snippet/file
    # cd ~/Downloads/29/snippet/
    # ga .
    # gcmsg "Upload:'$zip_name'"
    # gp
    # popd
    rm -rf "$zip_name"
  fi
}

# mvzip() {
#   if [ "$#" -eq 0 ]; then
#     echo "Usage: mvzip <version>"
#     return 1
#   fi

#   zip_name="${PWD##*/}-$1.zip"

#   zip -r "$zip_name" dist

#   # Copy locally
#   # http://60.205.115.49/down/1.txt
#   printf "wget -O ./$zip_name http://60.205.115.49/down/$zip_name" | pbcopy

#   if [ "$#" -eq 1 ]; then
#     # /var/www/html/down 
#     sshpass -p "Admin..." scp -rp "$zip_name" root@60.205.115.49:/var/www/html/down/"";
#     rm -rf "$zip_name"
#   fi
# }


mvzipPush (){
  zip -r "${PWD##*/}-$1" dist;
# mv "${PWD##*/}-$1".zip ~/Desktop
  scp -rp ${PWD##*/}.tar root@172.20.103.0:/home/eoop/tools/bbraun-itg/
}

gitpush ()
{
  branch=$(git symbolic-ref --short HEAD)
  git checkout $1;
  git merge $branch;
  git push;
  git checkout $branch;
  # open http://jenkins.movitech.cn:8888/view/%E8%B4%9D%E6%9C%97/;
  # exit
}


# quote


# Uncomment the following line to disable auto-setting terminal title.
DISABLE_AUTO_TITLE="true"
# 设置标题栏
function precmd () {
  print -Pn - '\e]0;%1~\a'
}
function fuckinit() {
  eval $(thefuck --alias)
}
function npminit() {
  npm config set registry https://registry.npmmirror.com;
  npm config get registry
}
#命令提示符
# RPROMPT=$(echo "$RED%D %T$FINISH")
# PROMPT=$(echo "💤zp29 $FINISH$(git_prompt_info)")

emojis_array[1]='👊#&#&打得一拳开，免得百拳来'
emojis_array[2]='🐶💪🏻🍎🏠⬆️🐜#&#&苟利国家生死以'
emojis_array[3]='🌇#&#&夕阳无限好，只是近黄昏'
emojis_array[4]='🈳️#&#&无'

rand=$( jot -r 1  0 $((${#emojis_array[@]} - 1)) )
emoji=${emojis_array[$rand]}
emojiFirst=${emoji%%#&#&*}
emojiLast=${emoji#*#&#&}

if [ ! "$emojiFirst" ];then
  echo -e "\033[42;33m © ➜ zp29 \033[0m"
  PROMPT="%(?:%{$fg_bold[green]%}🇨🇳 :%{$fg_bold[red]%}➜ )"
else
  echo "$emojiFirst ➜ $emojiLast"
  PROMPT="%(?:%{$fg_bold[green]%}$emojiFirst :%{$fg_bold[red]%}➜ )"
fi

PROMPT+=' %{$fg[cyan]%}%c%{$reset_color%} $(git_prompt_info)'

ZSH_THEME_GIT_PROMPT_PREFIX="%{$fg_bold[blue]%}git:(%{$fg[red]%}"
ZSH_THEME_GIT_PROMPT_SUFFIX="%{$reset_color%} "
ZSH_THEME_GIT_PROMPT_DIRTY="%{$fg[blue]%}) %{$fg[yellow]%}✗"
ZSH_THEME_GIT_PROMPT_CLEAN="%{$fg[blue]%})"

export HOMEBREW_NO_AUTO_UPDATE=true
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.cloud.tencent.com/homebrew-bottles

function isEmpty(){
  if [ "$(ls -A $1)" ]; then
    echo "huzzah"
  else 
    echo "has no files"
  fi
}

upload_file() {
    local file_path=$(realpath "$1")
    local expires=$(date -v +1d +%Y-%m-%d)
    local max_downloads=1
    local auto_delete=true
    local auth_token="72LCCXO.NQNB54J-H7K4VHK-J9CQ0G2-B7XV83T"

    # 打印请求参数
    # echo "File path: $file_path"
    # echo "Expires: $expires"

    # 使用 curl 上传文件并获取返回的 JSON 结果
    local response=$(curl --location 'https://file.io/' \
        --header 'accept: application/json' \
        --header "Authorization: Bearer $auth_token" \
        --form "file=@\"$file_path\"" \
        --form "expires=$expires" \
        --form "maxDownloads=$max_downloads" \
        --form "autoDelete=$auto_delete")

    # 打印完整的 JSON 结果以便调试
    # echo "Response: $response"

    # 解析 JSON 结果并提取 link 和 name 字段
    local link=$(echo $response | jq -r '.link')
    local name=$(echo $response | jq -r '.name')

    # 拼接结果并打印
    local result="Link: $link, Name: $name"
    echo $result

    # 将结果复制到剪贴板
    printf "wget -O ./$name $link" | pbcopy
}


export GITHUB_API_URL=http://124.220.157.23:8800
export GITHUB_SERVER_URL=https://github.com
export GITHUB_TOKEN=MTQ0OC5lZTQyZWZmYjA5MWE0YjE5MGRkYTMwYWE0YTBjNzE1Yw==

