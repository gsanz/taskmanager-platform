export interface User {
  id: string;
  email: string;
  name: string;
  secondname?: string | null;
  telefonoEmpresa?: string | null;
  telefonoCorto?: string | null;
  roleId: string;
}

export interface TaskLog {
  id: string;
  tareaId: string;
  tareaNombre: string;
  fecha: string;
  descripcion: string;
  horas: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  nombre: string;
}

export interface Task {
  id: string;
  nombre: string;
  fechaInicio: string;
  horasEstimadas: number;
  userId: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  mustChangePassword: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
