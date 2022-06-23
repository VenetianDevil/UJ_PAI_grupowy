import React from 'react';
import "../_styles/loader.css";

export class LoaderComponent extends React.Component {

  render() {
    return (
      <div className="lds-facebook"><div></div><div></div><div></div></div>);
  }
}

