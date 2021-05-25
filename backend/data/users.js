// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

// used to initialize data in the database

import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin',
        email: 'admin@ecommerce.com',
        password: bcrypt.hashSync('admin', 10),
        isAdmin: true
    },
    {
        name: 'Mario',
        email: 'mario@ecommerce.com',
        password: bcrypt.hashSync('mario', 10)
    },
    {
        name: 'Luca',
        email: 'luca@ecommerce.com',
        password: bcrypt.hashSync('luca', 10)
    },
    {
        name: 'Federico',
        email: 'federico@ecommerce.com',
        password: bcrypt.hashSync('federico', 10)
    },
    {
        name: 'Aurora',
        email: 'aurora@ecommerce.com',
        password: bcrypt.hashSync('aurora', 10)
    }
]

export default users