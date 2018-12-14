/* eslint-disable */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Example, Example2 } from './containers';

/**
 * 根据需要配置一级路由或者二级路由
 * @param {*}
 */
const Routes = ({ match }) => {
  return (
    <div className="router-con">
      {
        match && match.url ? (
          <div className="routers">
            <Switch>
              <Route exact path="/" component={Example} />
              <Route exact path="/Example" component={Example} />
              <Route exact path="/Example2" component={Example2} />
            </Switch>
          </div>) : (
            <div className="routers">
              <Switch>
                <Route exact path={`/`} component={Example} />
                <Route exact path={`/Example`} component={Example} />
                <Route exact path="/Example2" component={Example2} />
              </Switch>
            </div>
          )
      }
    </div>
  );
};
export default Routes;