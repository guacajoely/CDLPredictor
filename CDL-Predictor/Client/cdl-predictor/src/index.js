import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/nav/navBar.js';
import { ApplicationViews } from './components/views/appViews.js';
import './index.css';


const container = document.getElementById("root")
const root = createRoot(container)

root.render(
  <BrowserRouter>
    
    <Routes>

      <Route path="*" element={
          <>
            <NavBar />
            <ApplicationViews />
          </>
      } />

	  </Routes>
  </BrowserRouter>
)