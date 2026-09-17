import 'dotenv/config';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import { camarasDataValencia,camarasDataGVA } from './data/camarasData';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export interface CamaraGVA {
  //id: string;
  nombre: string;
  latitud: number;
  longitud: number;
  url: string;
  fuente: string;
  fechaRegistro: Date;
}

async function main() {
  console.log('🌱 Procesando roles...');

  const roles = [
    { nombre: 'Administrador' },
    { nombre: 'Manager' },
    { nombre: 'Técnico' },
  ];

  const roleMap: Record<string, string> = {};

  for (const role of roles) {
    const created = await prisma.role.upsert({
      where: { nombre: role.nombre },
      update: {},
      create: { nombre: role.nombre },
    });
    roleMap[role.nombre] = created.id;
  }

  console.log('✅ Roles procesados correctamente.');

  console.log('🌱 Procesando usuarios...');
  /*
  const users = [
    {
      name: 'Juan',
      secondname: 'García',
      email: 'juan@tragsa.com',
      password: '123456',
      roleName: 'Administrador',
    },
    {
      name: 'Ana',
      secondname: 'Martínez',
      email: 'ana@tragsa.com',
      password: '123456',
      roleName: 'Manager',
    },
    {
      name: 'Pedro',
      secondname: 'López',
      email: 'plopez@tragsa.com',
      password: '123456',
      roleName: 'Técnico',
    },
  ];
*/


const users = [
    {
    name: 'Administrador',
    secondname: 'Administrador',
    email: 'admin@tragsa.com',
    password: '123456',
    roleName: 'Administrador',
  },
  {
    name: 'Antonio',
    secondname: 'Vicente Galvañ Vicente',
    email: 'antonio.vicente.galvan@tragsa.com',
    password: '123456',
    roleName: 'Técnico',
  },
  {
    name: 'Celia',
    secondname: 'Hernandis Sanz',
    email: 'celia.hernandis@tragsa.com',
    password: '123456',
    roleName: 'Técnico',
  },
  {
    name: 'Cristina',
    secondname: 'del Rey Ballesteros',
    email: 'cristina.delrey@tragsa.com',
    password: '123456',
    roleName: 'Técnico',
  },
  {
    name: 'César',
    secondname: 'Donado-Mazarrón Morales',
    email: 'cesar.donado-mazarron@tragsa.com',
    password: '123456',
    roleName: 'Técnico',
  },
  {
    name: 'Gorka',
    secondname: 'Sanz Monllor',
    email: 'gorka.sanz@tragsa.com',
    password: '123456',
    roleName: 'Técnico',
  },
  {
    name: 'Iago',
    secondname: 'Letellier Tena',
    email: 'iago.letellier@tragsa.com',
    password: '123456',
    roleName: 'Técnico',
  },
  {
    name: 'Javier',
    secondname: 'de Pedraza Carrera',
    email: 'javier.depedraza@tragsa.com',
    password: '123456',
    roleName: 'Técnico',
  },
  {
    name: 'José',
    secondname: 'Cayetano Martínez Barberá',
    email: 'jose.cayetano@tragsa.com',
    password: '123456',
    roleName: 'Técnico',
  },
  {
    name: 'José Manuel',
    secondname: 'Belda Carrascosa',
    email: 'josemanuel.belda@tragsa.com',
    password: '123456',
    roleName: 'Técnico',
  },
  {
    name: 'Juan',
    secondname: 'Ballester Pérez',
    email: 'juan.ballester@tragsa.com',
    password: '123456',
    roleName: 'Técnico',
  },
  {
    name: 'Liliana Noemi',
    secondname: 'Romero Alonso',
    email: 'liliana.romero@tragsa.com',
    password: '123456',
    roleName: 'Técnico',
  },
  {
    name: 'Lorena',
    secondname: 'Bellver Martínez',
    email: 'lorena.bellver@tragsa.com',
    password: '123456',
    roleName: 'Técnico',
  },
  {
    name: 'Menchu',
    secondname: 'Díaz Aparisi',
    email: 'menchu.diaz@tragsa.com',
    password: '123456',
    roleName: 'Técnico',
  },
  {
    name: 'Nacho',
    secondname: 'Espinós Conejo',
    email: 'nacho.espinos@tragsa.com',
    password: '123456',
    roleName: 'Manager',
  },
  {
    name: 'Natalia',
    secondname: 'Varandela Espinosa',
    email: 'natalia.varandela@tragsa.com',
    password: '123456',
    roleName: 'Técnico',
  },
  {
    name: 'Raúl',
    secondname: 'Hervás González',
    email: 'raul.hervas@tragsa.com',
    password: '123456',
    roleName: 'Técnico',
  },
  {
    name: 'Raúl',
    secondname: 'del Río de Blas',
    email: 'raul.delrio@tragsa.com',
    password: '123456',
    roleName: 'Técnico',
  },
  {
    name: 'Reyes Gabriela',
    secondname: 'Segura Ramón',
    email: 'reyes.gabriela@tragsa.com',
    password: '123456',
    roleName: 'Técnico',
  },
  {
    name: 'Ángel',
    secondname: 'del Hierro Yubero',
    email: 'angel.delhierro@tragsa.com',
    password: '123456',
    roleName: 'Técnico',
  },
  {
    name: 'Óscar',
    secondname: 'González Pelayo',
    email: 'oscar.gonzalez@tragsa.com',
    password: '123456',
    roleName: 'Manager',
  },
  {
    name: 'Ana Isabel',
    secondname: 'Soriano Rustarazo',
    email: 'ana.isabel.soriano@tragsa.com',
    password: '123456',
    roleName: 'Administrador',
  },
  {
    name: 'Rafael',
    secondname: 'Gimeno García',
    email: 'rafael.gimeno@tragsa.com',
    password: '123456',
    roleName: 'Administrador',
  },
];


  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        secondname: user.secondname,
        password: hashedPassword,
        roleId: roleMap[user.roleName],
      },
      create: {
        name: user.name,
        secondname: user.secondname,
        email: user.email,
        password: hashedPassword,
        mustChangePassword: true,
        roleId: roleMap[user.roleName],
      },
    });
  }

  console.log('✅ Usuarios procesados correctamente.');

  console.log('🌱 Procesando tareas por usuario...');

  const tareas = [
    {
      nombre: 'Revisión de cámaras DGT',
      fechaInicio: new Date('2026-09-01'),
      horasEstimadas: 20.5,
      userEmail: 'juan@tragsa.com',
    },
    {
      nombre: 'Mantenimiento base de datos',
      fechaInicio: new Date('2026-09-05'),
      horasEstimadas: 15.0,
      userEmail: 'ana@tragsa.com',
    },
    {
      nombre: 'Actualización de endpoints API',
      fechaInicio: new Date('2026-09-10'),
      horasEstimadas: 25.0,
      userEmail: 'plopez@tragsa.com',
    },
  ];

  for (const tarea of tareas) {
    const user = await prisma.user.findUnique({
      where: { email: tarea.userEmail },
    });

    if (user) {
      await prisma.tareaUsuario.create({
        data: {
          nombre: tarea.nombre,
          fechaInicio: tarea.fechaInicio,
          horasEstimadas: tarea.horasEstimadas,
          userId: user.id,
        },
      });
    }
  }

  console.log('✅ Tareas procesadas correctamente.');

  console.log('🌱 Procesando cámaras GVA...');

  // Inserción en lote omitiendo duplicados (ajusta 'camara' si el modelo en tu schema.prisma tiene otro nombre)
  await prisma.camaraGva.createMany({
    data: camarasDataGVA,
    skipDuplicates: true,
  });

    await prisma.camaraGva.createMany({
    data: camarasDataValencia,
    skipDuplicates: true,
  });

  console.log('✅ Cámaras procesadas correctamente.');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
