import React from 'react';
import { Document } from '@react-pdf/dom';
import { Page } from '@react-pdf/core';
import Fractal from './Fractal';

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showDocument: true,
    };

    this.handleToggleShow = this.handleToggleShow.bind(this);
  }

  handleToggleShow() {
    this.setState({ showDocument: !this.state.showDocument });
  }

  render() {
    const { showDocument } = this.state;
    return (
      <div className="app">
        <div className="header">
          <h2>React PDF DOM bindings</h2>
        </div>

        <button onClick={this.handleToggleShow}>Toggle show</button>
        {showDocument && (
          <Document
            title="Fractals"
            author="John Doe"
            subject="Rendering fractals with react-pdf"
            keywords={['react', 'pdf', 'fractals']}
          >
            <Page size="A4">
              <Fractal steps={18} />
            </Page>

            <Page orientation="landscape" size="A4">
              <Fractal steps={14} />
            </Page>

            <Page size="B4">
              <Fractal steps={10} />
            </Page>
          </Document>
        )}
      </div>
    );
  }
}

export default App;
