import configurestore from "redux-mock-store";

import thunk from 'redux-thunk';

const middleware =[thunk];

const mockStore = configurestore(middleware as any)

const store = mockStore({});


export default store;