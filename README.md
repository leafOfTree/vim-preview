# Vim-preview

Open browser to preview files in current directory from vim.

## Usage

Open any `.png` or `.jpg` file and press <kbd>p</kbd>. Or open any file and press <kbd>;p</kbd>.

## Configuration

Set global variable to `1` to enable or `0` to disable. Ex:

    let g:vim_svelte_plugin_load_full_syntax = 1

| variable                     | description                                 | default                 |
|------------------------------|---------------------------------------------|-------------------------|
| `g:preview_open_browser`     | Command to open browser with generated html | 'open'                  |
| `g:preview_image_filetypes`  | Image filetypes to preview                  | 'png,jpg,jpeg,webp,ico' |
| `g:preview_video_filetypes`  | Video filetypes to preview                  | 'mp4,webm'              |
| `g:preview_audio_filetypes`  | Audio filetypes to preview                  | 'mp3'                   |
| `g:preview_object_filetypes` | Object filetypes to preview                 | 'pdf,swf'               |

## Development

The preview page is `public/index.html` based on React. Run

    npm install 
    npm start

Then open `public/index.html`. You can look at `src/index.js`, `public/index.html` and `public/index.css` first.
