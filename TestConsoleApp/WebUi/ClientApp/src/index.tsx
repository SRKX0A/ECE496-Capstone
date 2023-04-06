import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './redux/reduxStore';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee, faDeleteLeft, faEye, faPlus, faCog, faEdit,faMultiply, faChevronRight, faChevronLeft, faUserShield, faTabletScreenButton, faTabletButton,
  faUsers, faCircleXmark,faCircle, faHeartPulse, faBolt, faMagnifyingGlass, faTableColumns, faBuilding, faBars, faCirclePlus, faFileInvoiceDollar, faFileLines, 
  faFlag, faDoorClosed, faPersonShelter, faTicket, faAddressBook, faLocationDot, faBox, faCube, faIdCard, faCircleInfo, faScrewdriverWrench, faReply, faKey, faCreditCard, faUser,
 faWallet, faArrowRight, faPhone, faEnvelope, faWrench, faClock, faDownload, faFloppyDisk, faHouse, faPlay} from '@fortawesome/free-solid-svg-icons'

 library.add( faCheckSquare, faCoffee, faDeleteLeft, faEye, faPlus,faCog, faEdit, faMultiply, faChevronRight, faChevronLeft, faUserShield, faTabletScreenButton, 
  faTabletButton, faUsers,faCircleXmark,faCircle, faHeartPulse, faBolt, faMagnifyingGlass, faTableColumns, faBuilding, faBars, faCirclePlus, faFileInvoiceDollar, faFileLines,
   faFlag, faDoorClosed,faPersonShelter, faTicket, faAddressBook, faLocationDot, faBox, faCube, faIdCard, faCircleInfo,faScrewdriverWrench, faReply, 
   faKey,faCreditCard, faUser, faWallet, faArrowRight, faPhone, faEnvelope, faWrench, faClock, faDownload, faFloppyDisk, faHouse, faPlay, faDownload)
   
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
