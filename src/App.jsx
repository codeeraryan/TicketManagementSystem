import React, { useState } from 'react';
import { DashboardView } from './screens/DashboardView';
import { LoginView } from './screens/LoginView';

import { useFirebase } from './context/FirebaseProvider';
import CustomerView from './screens/CustomerView';

const App = () => {
  const userDetails=useFirebase();
  
 
  const [view, setView] = useState('dashboard'); // 'dashboard' or 'login'

  return( userDetails.loading?((userDetails.user.email=="customer@support.com")? <CustomerView setView={setView} />:(userDetails.user.email=="agent@support.com")?<DashboardView setView={setView} />:<LoginView/>) : ( <LoginView setView={setView} />))
};

export default App;