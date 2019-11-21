const { files, config } = window;
const { imageTypes, videoTypes, audioTypes, objectTypes, path } = config;
const packageTypes = 'gz,zip,tar,iso,dmg';

class Medias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    }
    document.title = path;
  }

  componentDidMount() {
    const files = this.props.files.map(file => {
      const fullpath = file.path;
      const name = fullpath.split('/').splice(-1)[0];
      const matchedType = name.match(/\.(\w*)$/);
      const type = matchedType && matchedType[1];
      const size = this.getFileSize(file.size);
      return ({
        fullpath, 
        name,
        type, 
        size,
      });
    }).sort((a, b) => {
      if (this.isMatchType(imageTypes, a.type) && !this.isMatchType(imageTypes, b.type)) {
        return -1;
      }
      if (!a.size) {
        return 1;
      }
      if (!b.size) {
        return -1;
      }
    });

    this.setState({
      files,
    }, () => {
      Promise.all([
        this.handleImages(files),
      ]).then(() => {
        this.setState({
          files: JSON.parse(JSON.stringify(files)),
        });
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.files !== prevProps.files) {
      this.setState({
        files: this.props.files,
      });
    }
  }

  getFileSize(size) {
    let result;
    if (size > 1000*1000) {
      // MB
      result = size / (1000*1000) + 'M';
    } else if (size > 1000) {
      // KB
      result = size / 1000 + 'K';
    } else if (size > 0) {
      // B
      result = size + 'B';
    } else {
      result = '';
    }
    return result.replace(/\.\d*/, '');
  }

  handleImages(files) {
    const filteredFiles = files.filter(
      file => this.isMatchType(imageTypes, file.type)
    );
    const loads = filteredFiles.map(this.getImagesDimensions);
    return Promise.all(loads).then(values => {
      values.forEach((value, index) => {
        filteredFiles[index].dimensions = value;
      })
    });
  }

  isMatchType(types, type) {
    if (types && type && type.match(new RegExp(types.split(',').join('|')))) {
      return true;
    }
  }

  getFileContent(file) {
    let content;
    if (this.isMatchType(imageTypes, file.type)) {
      content = (
        <img src={file.fullpath} alt={file.name} />
      );
    }  
    if (this.isMatchType(videoTypes, file.type)) {
      content = (
        <video controls>
          <source src={file.fullpath} type={'video/' + file.type}></source>
        </video>
      );
    }
    if (this.isMatchType(audioTypes, file.type)) {
      content = (
        <audio controls src={file.fullpath}></audio>
      )
    }
    if (this.isMatchType(objectTypes, file.type)) {
      content = (
        <object data={file.fullpath} type={'application/' + file.type}>
        </object>
      );
    }
    if (this.isMatchType(packageTypes, file.type)) {
      content = (
        <div>🗃</div>
      )
    }
    if (!file.size) {
      content = (
        <div>📁</div>
      )
    } else if (!file.type) {
      content = (
        <div>⚙</div>
      )
    }

    if (!content) {
      content = (
        <div>📄</div>
      )
    }

    return content;
  }

  getImagesDimensions(file) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = file.fullpath;
      image.onload = () => {
        resolve([image.naturalWidth, image.naturalHeight]);
      }
    });
  }

  render() {
    const files = this.state.files;

    return (
      <div className="page">
        <div>{path}</div>
        <div className="container">
          {files.map((file) => {
            const { fullpath, name, size, dimensions } = file;
            return (
              <a 
                className="item" 
                key={name} 
                href={fullpath}
                >
                <div className="info">
                  <span>{name}</span>
                  <span className="extra">
                    {dimensions ? (size +  ', ' + dimensions[0] + 'x' + dimensions[1]) : size}
                  </span>
                </div>
                <div className="content">
                  {this.getFileContent(file)}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<Medias files={files} />, domContainer);
