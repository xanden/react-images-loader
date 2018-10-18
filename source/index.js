import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImageLoader extends Component {
  static propTypes = {
    loading: PropTypes.func,
    error: PropTypes.func,
    image: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  };

  state = {
    isLoading: true,
    isError: false,
    src: null,
    width: null,
    height: null,
    errMsg: null,
  };

  isCancelled = false;

  componentDidMount() {
    this.reload(this.props);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.src !== state.src) {
      return props;
    }
    return null;
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  reload = props => {
    // initialize
    this.setState({
      isLoading: true,
      isError: false,
      src: null,
      errMsg: null,
    });

    const image = new Image();

    image.src = props.src;
    image.onload = () => {
      !this.isCancelled &&
      this.setState({
        src: image.src,
        width: image.width,
        height: image.height,
        isLoading: false,
        isError: false,
        errMsg: null,
      });
      if (props.onLoad) {
        props.onLoad(image);
      }
    };
    image.onerror = err => {
      this.setState({
        src: null,
        width: null,
        height: null,
        isLoading: false,
        isError: true,
        errMsg: err,
      });
      if (props.onError) {
        props.onError(err);
      }
    };
  };

  render() {
    const { loading, error, image, style, className, alt } = this.props;
    const { src, width, height, isLoading, isError, errMsg } = this.state;

    if (loading && isLoading) {
      return loading();
    }
    if (error && isError && errMsg) {
      return error(errMsg);
    }
    if (src && image) {
      return image({ src, width, height });
    }
    if (src) {
      return (
        <img
          src={src}
          style={style}
          className={className}
          // width={width}
          // height={height}
          alt={alt}
        />
      );
    }

    return null;
  }
}

export default ImageLoader;
