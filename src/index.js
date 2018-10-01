import { Store } from './js/model';
import { View } from './js/view';
import { Controller } from './js/controller';

import './css/styles.css';

const store = new Store;
const view =  new View;
const controller = new Controller(store, view);

controller.setInitialView();