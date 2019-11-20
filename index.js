class Images extends React.Component {
  render() {
    return (
      <div>
        {this.props.list.map(item => item)}
      </div>
    );
  }
}

const list = ['./medias/1.png', './medias/2.png']

const domContainer = document.querySelector('#root');
ReactDOM.render(<Images list={list} />, domContainer);
