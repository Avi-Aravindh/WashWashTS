import React from 'react';
import AppContext from './AppContext';

export default function withAppContext(Component) {
  return function contextComponent(props) {
    return (
      <AppContext.Consumer>
        {(context) => <Component {...props} context={context} />}
      </AppContext.Consumer>
    );
  };
}
