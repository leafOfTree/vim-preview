# Vim-preview

<p align="center">
<img alt="screenshot" src="https://raw.githubusercontent.com/leafOfTree/leafOfTree.github.io/master/vim-preview-screenshot.png" width="400" />
</p>

Open browser to preview files in current directory from vim.

## Installation

<details>
<summary><a>How to install</a></summary>

- [VundleVim][2]

        Plugin 'leafOfTree/vim-preview'

- [vim-pathogen][5]

        cd ~/.vim/bundle && \
        git clone https://github.com/leafOfTree/vim-preview --depth 1

- [vim-plug][7]

        Plug 'leafOfTree/vim-preview'
        :PlugInstall

- Or manually, clone this plugin to `path/to/this_plugin`, and add it to `rtp` in vimrc

        set rtp+=path/to/this_plugin

<br />
</details>

## Usage

Open any file in vim and call `:Preview`.

## Configuration

Set global variable to customize specific feature:

    let g:preview_image_filetypes = 'png,apng,jpg,jpeg,webp,ico,bmp,gif,svg'

| variable                     | description                                 | default                                                                  |
|------------------------------|---------------------------------------------|--------------------------------------------------------------------------|
| `g:preview_open_browser`     | Command to open browser with generated html | Mac: 'open',<br>Linux: 'xdg-open',<br>win32: 'start cmd /c start chrome' |
| `g:preview_image_filetypes`  | Filetypes to preview with `<img>`           | 'png,apng,jpg,jpeg,webp,ico,bmp,gif,svg'                                 |
| `g:preview_video_filetypes`  | Filetypes to preview with `<video>`         | 'mp4,webm,ogg'                                                           |
| `g:preview_audio_filetypes`  | Filetypes to preview with `<audio>`         | 'mp3,wav'                                                                |
| `g:preview_object_filetypes` | Filetypes to preview with `<object>`        | 'pdf,swf'                                                                |

## Development

The preview page at `./public/index.html` that is based on React. Run

    npm install 
    npm start

Then call `:Preview` . You can check `src/index.js`, `src/index.css` and `public/index.html` first.

[2]: https://github.com/VundleVim/Vundle.vim
[5]: https://github.com/tpope/vim-pathogen
[7]: https://github.com/junegunn/vim-plug
