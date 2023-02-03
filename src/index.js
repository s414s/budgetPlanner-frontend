import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import "./style.css";
import RouterAPP from './routes';

import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import API from './config/API';

const root = ReactDOM.createRoot(document.getElementById('root'));

const LogChecker = () => {

  const {pathname} = useLocation();
  const navigate = useNavigate();

  useEffect(()=> {
    try {
      API.get('users/get/me').then((res) => {
        if (!res.status) {
          return navigate('/login')
        } else {
          if ( ["/", "/login"].includes(pathname) ) { return navigate('/app/budgets') }
        }
        
      })

    } catch(error) {
      navigate('/login')
    }
  }, [])
}

root.render(
  <div className="main">
    <BrowserRouter>
    <LogChecker></LogChecker>
      <div className='compApp'>
        <RouterAPP />
      </div>
    </BrowserRouter>
  </div>
);