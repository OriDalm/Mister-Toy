import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { useState } from 'react'
import { Provider } from 'react-redux'
import './assets/css/main.css'

import { store } from './store/store'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './pages/ToyEdit'
import { ToyIndex } from './pages/ToyIndex'
import { MultipleSelectCheckmarks } from './cmps/MultipleSelectCheckmarks'
import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './pages/HomePage'
import { AboutUs } from './pages/AboutUs'
import { ToyDashboard } from './pages/ToyDashboard'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className='main-layout app'>
          <AppHeader />
          <main>
            <Routes>
              <Route element={<HomePage />} path='/' />
              <Route element={<AboutUs />} path='/about' />
              <Route element={<ToyDashboard />} path='/dashboard' />
              <Route element={<ToyIndex />} path='/toy' />
              <Route element={<ToyDetails />} path='/toy/details/:toyId' />
              <Route element={<ToyEdit />} path='/toy/edit/:toyId' />
              <Route element={<ToyEdit />} path='/toy/edit' />
              <Route element={<MultipleSelectCheckmarks />} path='/dropdown' />
            </Routes>
          </main>
          {/* <AppFooter /> */}
        </section>
      </Router>
    </Provider>
  )
}
