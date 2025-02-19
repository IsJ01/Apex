import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Register from "./Register.js";
import Home from "./Inbox.js";
import Login from "./Login.js";
import Header from "./Header.js";
import Configure from './configure/Configure.js';
import UsersList from './UsersList.js';
import UserPage from './UserPage.js';
import Reports from './Reports.js';
import BlackList from './BlackList.js';
import { useState } from 'react';
import Pages from './pages/Pages.jsx';

import pageList from './pages_list/pagesList.js';

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
          <Route path='configure' element={<Configure setLang={setLang} lang={lang} />}/>;
          <Route path='users' element={<UsersList lang={lang} />}/>;
          <Route path='users/:id' element={<UserPage/>}/>;
          <Route path='reports' element={<Reports/>}/>;
          <Route path='blackList' element={<BlackList/>}/>
          <Route path='pages' element={<Pages/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}