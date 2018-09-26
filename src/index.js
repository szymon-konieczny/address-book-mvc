import { Controller } from './js/controller';
import { on } from './js/helpers';

import './css/styles.css';

const listName = 'Address Book';

const controller = new Controller(listName);
const viewInit = controller.viewInit();

on(window, 'load', viewInit);