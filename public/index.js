var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window = window,
    files = _window.files,
    config = _window.config;
var imageTypes = config.imageTypes,
    videoTypes = config.videoTypes,
    audioTypes = config.audioTypes,
    objectTypes = config.objectTypes;

var packageTypes = 'gz,zip,tar,iso,dmg';

var Medias = function (_React$Component) {
  _inherits(Medias, _React$Component);

  function Medias(props) {
    _classCallCheck(this, Medias);

    var _this = _possibleConstructorReturn(this, (Medias.__proto__ || Object.getPrototypeOf(Medias)).call(this, props));

    _this.state = {
      files: []
    };
    return _this;
  }

  _createClass(Medias, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var files = this.props.files.map(function (file) {
        var fullpath = file.path;
        var name = fullpath.split('/').splice(-1)[0];
        var matchedType = name.match(/\.(\w*)$/);
        var type = matchedType && matchedType[1];
        var size = _this2.getFileSize(file.size);
        return {
          fullpath: fullpath,
          name: name,
          type: type,
          size: size
        };
      }).sort(function (a, b) {
        if (_this2.isMatchType(imageTypes, a.type) && !_this2.isMatchType(imageTypes, b.type)) {
          return -1;
        }
        if (a.size === '0B') {
          return 1;
        }
        if (b.size === '0B') {
          return -1;
        }
      });

      this.setState({
        files: files
      }, function () {
        Promise.all([_this2.handleImages(files)]).then(function () {
          _this2.setState({
            files: JSON.parse(JSON.stringify(files))
          });
        });
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.files !== prevProps.files) {
        this.setState({
          files: this.props.files
        });
      }
    }
  }, {
    key: 'getFileSize',
    value: function getFileSize(size) {
      var result = void 0;
      if (size > 1000 * 1000) {
        // MB
        result = size / (1000 * 1000) + 'M';
      } else if (size > 1000) {
        // KB
        result = size / 1000 + 'K';
      } else {
        // B
        result = size + 'B';
      }
      return result.replace(/\.\d*/, '');
    }
  }, {
    key: 'handleImages',
    value: function handleImages(files) {
      var _this3 = this;

      var filteredFiles = files.filter(function (file) {
        return _this3.isMatchType(imageTypes, file.type);
      });
      var loads = filteredFiles.map(this.getImagesDimensions);
      return Promise.all(loads).then(function (values) {
        values.forEach(function (value, index) {
          filteredFiles[index].dimensions = value;
        });
      });
    }
  }, {
    key: 'isMatchType',
    value: function isMatchType(types, type) {
      if (types && type && type.match(new RegExp(types.split(',').join('|')))) {
        return true;
      }
    }
  }, {
    key: 'getFileContent',
    value: function getFileContent(file) {
      var content = void 0;
      if (this.isMatchType(imageTypes, file.type)) {
        content = React.createElement('img', { src: file.fullpath, alt: file.name });
      }
      if (this.isMatchType(videoTypes, file.type)) {
        content = React.createElement(
          'video',
          { controls: true },
          React.createElement('source', { src: file.fullpath, type: 'video/' + file.type })
        );
      }
      if (this.isMatchType(audioTypes, file.type)) {
        content = React.createElement('audio', { controls: true, src: file.fullpath });
      }
      if (this.isMatchType(objectTypes, file.type)) {
        content = React.createElement('object', { data: file.fullpath, type: 'application/' + file.type });
      }
      if (this.isMatchType(packageTypes, file.type)) {
        content = React.createElement(
          'div',
          null,
          '\uD83D\uDDC3'
        );
      }
      if (file.size === '0B') {
        content = React.createElement(
          'div',
          null,
          '\uD83D\uDCC1'
        );
      } else if (!file.type) {
        content = React.createElement(
          'div',
          null,
          '\u2699'
        );
      }

      if (!content) {
        content = React.createElement(
          'div',
          null,
          '\uD83D\uDCC4'
        );
      }

      return content;
    }
  }, {
    key: 'getImagesDimensions',
    value: function getImagesDimensions(file) {
      return new Promise(function (resolve, reject) {
        var image = new Image();
        image.src = file.fullpath;
        image.onload = function () {
          resolve([image.naturalWidth, image.naturalHeight]);
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var files = this.state.files;

      return React.createElement(
        'div',
        { className: 'container' },
        files.map(function (file) {
          var fullpath = file.fullpath,
              name = file.name,
              size = file.size,
              dimensions = file.dimensions;

          return React.createElement(
            'a',
            {
              className: 'item',
              key: name,
              href: fullpath
            },
            React.createElement(
              'div',
              { className: 'info' },
              React.createElement(
                'span',
                null,
                name
              ),
              React.createElement(
                'span',
                { className: 'extra' },
                dimensions ? size + ', ' + dimensions[0] + 'x' + dimensions[1] : size
              )
            ),
            React.createElement(
              'div',
              { className: 'content' },
              _this4.getFileContent(file)
            )
          );
        })
      );
    }
  }]);

  return Medias;
}(React.Component);

var domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(Medias, { files: files }), domContainer);