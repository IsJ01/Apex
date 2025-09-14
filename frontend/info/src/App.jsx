import {Routes, Route, BrowserRouter} from 'react-router-dom';

import Login from "./Login.jsx";
import Home from "./Inbox.jsx";
import Layout from "./Layout.jsx";
import Register from './Register.jsx';
import Configure from './configure/Configure.jsx';
// import UsersList from './users/UsersListPage.jsx';
// import UserPage from './UserPage.js';
// import Reports from './reports/Reports.jsx';
// import BlackList from './BlackList.js';
import { AppProvider } from './AppProvider.jsx';
// import Pages from './pages/Pages.jsx';

// import pageList from './pages_list/pagesList.js';
// import TasksPage from './tasks/TasksPage.jsx';
// import Report from './reports/Report.jsx';

export default function App() {
  return (
    <>
      <AppProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* {pageList()} */}
              <Route path='' element={<Home/>}/>; 
              <Route path='login' element={<Login/>}/>;
              <Route path='register' element={<Register/>}/>;
              <Route path='configure' element={<Configure/>}/>;
              {/*
              <Route path='tasks' element={<TasksPage lang={lang} />}/>;
              <Route path='users' element={<UsersList lang={lang} />}/>;
              <Route path='users/:id' element={<UserPage lang={lang}/>}/>;
              <Route path='reports' element={<Reports lang={lang}/>}/>;
              <Route path='reports/:id' element={<Report lang={lang}/>}/>;
              <Route path='blackList' element={<BlackList lang={lang}/>}/>
              <Route path='pages' element={<Pages lang={lang}/>}/> */}
            </Routes>
          </Layout>
        </BrowserRouter>
      </AppProvider>
    </>
  );
}