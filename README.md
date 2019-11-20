# Vim-preview

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

Open any `.png` or `.jpg` file and press <kbd>p</kbd>. Or open any file and press <kbd>;p</kbd>.

## Configuration

Set global variable to `1` to enable or `0` to disable. Ex:

    let g:vim_svelte_plugin_load_full_syntax = 1

| variable                     | description                                 | default                 |
|------------------------------|---------------------------------------------|-------------------------|
| `g:preview_open_browser`     | Command to open browser with generated html | 'open'                  |
| `g:preview_image_filetypes`  | Filetypes to preview with `<img>`           | 'png,jpg,jpeg,webp,ico' |
| `g:preview_video_filetypes`  | Filetypes to preview with `<video>`         | 'mp4,webm'              |
| `g:preview_audio_filetypes`  | Filetypes to preview with `<audio>`         | 'mp3'                   |
| `g:preview_object_filetypes` | Filetypes to preview with `<object>`        | 'pdf,swf'               |

## Development

The preview page is `public/index.html` based on React. Run

    npm install 
    npm start

Then open `public/index.html`. You can look at `src/index.js`, `public/index.html` and `public/index.css` first.
