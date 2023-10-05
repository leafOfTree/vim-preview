"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"
" Functions {{{
"
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
function! Preview()
  if &filetype == 'fern'
    let saved_register = @*
    call fern#action#call('yank')
    let path = @*
    let @* = saved_register
  else
    let path = substitute(expand('%:p:h'), '.*file://', '', '')
  endif
  if !isdirectory(path)
    let path = substitute(path, '/[^/]*$', '', '')
  endif

  let files = glob(path.'/*', 0, 1)
  let fileInfo = ['window.files = ['] + map(files, function('s:GetFileInfo')) + ['];']
  let configInfo = ['window.config = {'] 
        \ + ['path: "'.path.'",']
        \ + ['imageTypes: "'.s:image_filetypes.'",'] 
        \ + ['videoTypes: "'.s:video_filetypes.'",'] 
        \ + ['audioTypes: "'.s:audio_filetypes.'",'] 
        \ + ['objectTypes: "'.s:object_filetypes.'",'] 
        \ + ['};']

  let savepath = s:plugin_path.'/../public/window.js'
  let htmlpath = s:plugin_path.'/../public/index.html'
  call writefile(fileInfo + configInfo, savepath)

  call system(s:open_browser.' '.htmlpath)
endfunction

function! s:GetFileInfo(key, path)
  return '{ path: "'.a:path.'", size: '.getfsize(a:path).', },'
endfunction

function! s:GetAutocmdFiletype(key, filetype)
  return '*.'.a:filetype
endfunction

function! s:GetDefaultOpenBrowserCommand()
  let cmd = ''
  if has('mac')
    let cmd = 'open'
  endif
  if has('linux')
    let cmd = 'xdg-open'
  endif
  if has('win32')
    let cmd = 'start cmd /c start chrome'
  endif
  return cmd
endfunction
"}}}

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"
" Config {{{
"
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let s:open_browser = exists("g:preview_open_browser")
      \ ? g:preview_open_browser
      \ : s:GetDefaultOpenBrowserCommand()
let s:image_filetypes = exists("g:preview_image_filetypes") 
      \ ? g:preview_image_filetypes
      \ : 'png,apng,jpg,jpeg,webp,ico,bmp,gif,svg'
let s:video_filetypes = exists("g:preview_video_filetypes") 
      \ ? g:preview_video_filetypes
      \ : 'mp4,webm,ogg'
let s:audio_filetypes = exists("g:preview_audio_filetypes") 
      \ ? g:preview_audio_filetypes
      \ : 'mp3,wav'
let s:object_filetypes = exists("g:preview_object_filetypes") 
      \ ? g:preview_object_filetypes
      \ : 'pdf,swf'

let s:plugin_path = expand('<sfile>:p:h')

command Preview call Preview()
