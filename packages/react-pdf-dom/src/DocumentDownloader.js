/* global URL */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PDFRenderer, Document, createElement, pdf } from '@react-pdf/core';
import omit from 'lodash.omit';

class Container extends Component {
  static displayName = 'DocumentDownloader';

  container = createElement('ROOT');

  constructor(props) {
    super(props);

    this.state = {
      document: undefined,
    };
  }

  componentDidMount() {
    this.mountNode = PDFRenderer.createContainer(this.container);

    PDFRenderer.updateContainer(
      <Document {...omit(this.props, ['height', 'width', 'children'])}>
        {this.props.children}
      </Document>,
      this.mountNode,
      this,
    );

    pdf(this.container)
      .toBlob()
      .then(blob => {
        const data = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = this.props.title || 'output.pdf';
        link.click();
        setTimeout(() => {
          // For Firefox it is necessary to delay revoking the ObjectURL
          URL.revokeObjectURL(data);
        }, 100);
      });
  }

  componentWillUnmount() {
    PDFRenderer.updateContainer(null, this.mountNode, this);
  }

  render() {
    return null;
  }
}

Container.propTypes = {
  children: PropTypes.node,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Container;
