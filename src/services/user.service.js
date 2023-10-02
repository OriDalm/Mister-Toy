import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  getEmptyCredentials,
  getUsers,
  getById,
}

window.us = userService

function getUsers() {
  return httpService.get(`user`)
}

async function login(userCred) {
  // const users = await storageService.query('user')
  // const user = users.find(user => user.username === userCred.username)
  const user = await httpService.post('auth/login', userCred)
  if (user) {
    return _saveLocalUser(user)
  }
}

function getById(userId) {
  return storageService.get(BASE_URL, userId)
}

async function signup(userCred) {
  // userCred.score = 10000
  if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
  // const user = await storageService.post('user', userCred)
  const user = await httpService.post('auth/signup', userCred)
  return _saveLocalUser(user)
}
async function logout() {
  await httpService.post('auth/logout')
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function _saveLocalUser(user) {
  // user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyCredentials() {
  return {
    username: '',
    password: '',
    fullname: '',
  }
}
// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()
