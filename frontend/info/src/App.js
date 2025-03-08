import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Register from "./Register.js";
import Home from "./Inbox.js";
import Login from "./Login.js";
import Header from "./header/Header.js";
import Configure from './configure/Configure.js';
import UsersList from './users/UsersListPage.jsx';
import UserPage from './UserPage.js';
import Reports from './reports/Reports.jsx';
import BlackList from './BlackList.js';
import { useState } from 'react';
import Pages from './pages/Pages.jsx';

import pageList from './pages_list/pagesList.js';
import TasksPage from './tasks/TasksPage.jsx';
import Report from './reports/Report.jsx';

export default function App() {
  const [lang, setLang] = useState("English (UK)");
  return (
    <>
      <BrowserRouter>
        <Header setLang={setLang} lang={lang}/>
        <Routes>
          {pageList()}
          <Route path='' element={<Home setLang={setLang} lang={lang} />}/>;
          <Route path='login' element={<Login/>}/>;
          <Route path='register' element={<Register/>}/>;
          <Route path='configure' element={<Configure setLang={setLang} lang={lang}/>}/>;
          <Route path='tasks' element={<TasksPage lang={lang} />}/>;
          <Route path='users' element={<UsersList lang={lang} />}/>;
          <Route path='users/:id' element={<UserPage lang={lang}/>}/>;
          <Route path='reports' element={<Reports lang={lang}/>}/>;
          <Route path='reports/:id' element={<Report lang={lang}/>}/>;
          <Route path='blackList' element={<BlackList lang={lang}/>}/>
          <Route path='pages' element={<Pages lang={lang}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}