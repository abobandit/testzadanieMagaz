import { instance } from "../axios/axios";

export function signup(data) {
  return instance.post('/auth/register', data)
}

export function auth(data) {
  return instance.post('/auth/login', data)
}

export function profile() {
  return instance.get('/auth/profile')
}

export function edit(data) {
  return instance.post('/auth/edit',data)
}

export function logout() {
  return instance.post('/auth/logout')
}