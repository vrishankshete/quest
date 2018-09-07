import React from 'react';
import Questions from './src/components/Questions/Questions';
import Home from './src/components/Home/Home';
import Results from './src/components/Results/Results';
import Loading from './src/components/Loading/Loading';
import Stage from './src/components/Stage/Stage';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/store/rootReducer';
import { createStackNavigator } from 'react-navigation';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './src/store/rootSaga';

const RootStack = createStackNavigator({
  Home: Home,
  Questions: Questions,
  Results: Results,
  Stage: Stage
},
{
  initialRouteName: 'Home',
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, compose(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack/>
      </Provider>
    );
  }
}