import axios from 'axios'
import { auth } from './auth'

const BASE = 'http://localhost:8080'

const api = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = auth.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error),
)

export const login = (email, password) =>
  api.post('/ms-usuarios/api/usuarios/login', { email, password }).then((r) => r.data)

export const getPlanes = () =>
  api.get('/ms-planes/api/planes').then((r) => r.data)

export const getPlanesByMunicipio = (municipioId) =>
  api.get(`/ms-planes/api/planes/municipio/${municipioId}`).then((r) => r.data)

export const getPlan = (id) =>
  api.get(`/ms-planes/api/planes/${id}`).then((r) => r.data)

export const createPlan = (plan) =>
  api.post('/ms-planes/api/planes', plan).then((r) => r.data)

export const updatePlan = (id, plan) =>
  api.put(`/ms-planes/api/planes/${id}`, plan).then((r) => r.data)

export const deletePlan = (id) =>
  api.delete(`/ms-planes/api/planes/${id}`)

export const getMunicipios = () =>
  api.get('/ms-cobertura/api/cobertura/municipios').then((r) => r.data)

export const crearMunicipio = (nombre, departamento) =>
  api.post('/ms-cobertura/api/municipios', { nombre, departamento }).then((r) => r.data)

export const getCoberturaByMunicipio = (id) =>
  api.get(`/ms-cobertura/api/cobertura/municipios/${id}`).then((r) => r.data)

export const getCoberturas = () =>
  api.get('/ms-cobertura/api/cobertura/').then((r) => r.data)

export const asignarCobertura = (municipioId, tecnologia) =>
  api.post(`/ms-cobertura/api/cobertura/asignar/${municipioId}?tecnologia=${tecnologia}`).then((r) => r.data)

export const deleteCobertura = (id) =>
  api.delete(`/ms-cobertura/api/cobertura/${id}`)

export const enviarContacto = (data) =>
  api.post('/ms-contacto/api/contacto', data, { responseType: 'text' }).then((r) => r.data)

export default api
