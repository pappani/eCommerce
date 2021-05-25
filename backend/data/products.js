// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

// used to initialize data in the database
const products = [
  {
    name: 'iPhone 12 Pro Max',
    image: '/images/iphone.jpg',
    description:
      'Smartphone top di gamma di Apple, modello da 128 GB',
    brand: 'Apple',
    category: 'Smartphone',
    price: 1299.00,
    countInStock: 7,
    avgRating: 5.0,
    numReviews: 8,
  },
  {
    name: 'MacBook Pro 13 M1',
    image: '/images/macbook.jpg',
    description:
      'Laptop da 13.3 pollici, processore ARM M1 e 512GB di SSD',
    brand: 'Apple',
    category: 'Computer',
    price: 1799.00,
    countInStock: 7,
    avgRating: 5.0,
    numReviews: 6,
  },
  {
    name: 'Surface Laptop 3',
    image: '/images/surface.jpg',
    description:
      'Laptop da 13.5 pollici, processore Intel i5 e 128GB di SSD',
    brand: 'Microsoft',
    category: 'Computer',
    price: 799.00,
    countInStock: 4,
    avgRating: 5.0,
    numReviews: 2,
  },
  {
    name: 'Samsung Galaxy Note 20',
    image: '/images/galaxynote.jpg',
    description:
      'Con connettività 5G e fotocamera da 108 megapixel',
    brand: 'Samsung',
    category: 'Smartphone',
    price: 999.00,
    countInStock: 5,
    avgRating: 5,
    numReviews: 4,
  },
  {
    name: 'Samsung Galaxy S21 Ultra',
    image: '/images/samsungs21.jpg',
    description:
      'Con connettività 5G e fotocamera da 108 megapixel',
    brand: 'Samsung',
    category: 'Smartphone',
    price: 1499.00,
    countInStock: 5,
    avgRating: 4.5,
    numReviews: 3,
  },
  {
    name: 'Samsung A31',
    image: '/images/samsunga31.jpg',
    description:
      'Smartphone entry-level da 6.4 pollici',
    brand: 'Samsung',
    category: 'Smartphone',
    price: 199.00,
    countInStock: 7,
    avgRating: 4.5,
    numReviews: 10,
  },
  {
    name: 'Google Nest Mini',
    image: '/images/google.jpg',
    description:
      'Altoparlante smart per ascoltare musica, radio, notizie, ricette, e tanto altro',
    brand: 'Google',
    category: 'Domotica',
    price: 34.99,
    countInStock: 0,
    avgRating: 4,
    numReviews: 26,
  },
  {
    name: 'Cuffie True-Wireless AirPods',
    image: '/images/airpods.jpg',
    description:
      'Cuffie True-Wireless con BlueTooth, 2 auricolari e custodia con ricarica senza fili',
    brand: 'Apple',
    category: 'Accessori',
    price: 159.00,
    countInStock: 10,
    avgRating: 5,
    numReviews: 1,
  },
  {
    name: 'Lampadina Smart LED RGB',
    image: '/images/ledrgb.jpg',
    description:
      'Lampadina compatibile con Google Assistant, 8W LED RGB',
    brand: 'Philips',
    category: 'Domotica',
    price: 15.99,
    countInStock: 10,
    avgRating: 4,
    numReviews: 1,
  },
  {
    name: 'Mouse HP Wireless',
    image: '/images/mouse.jpg',
    description:
      'Mouse senza fili',
    brand: 'HP',
    category: 'Accessori',
    price: 12.99,
    countInStock: 40,
    avgRating: 3,
    numReviews: 1,
  },
  {
    name: 'Stampante Laser HP',
    image: '/images/stampante.jpg',
    description:
      'Stampante laser bianco e nero, formato A4',
    brand: 'HP',
    category: 'Accessori',
    price: 109.00,
    countInStock: 12,
    avgRating: 4.5,
    numReviews: 3,
  },
  {
    name: 'Hard Disk WD 1TB',
    image: '/images/harddisk.jpg',
    description:
      'Hard disk esterno per conservare tutti i tuoi file',
    brand: 'WD',
    category: 'Accessori',
    price: 59.99,
    countInStock: 20,
    avgRating: 5,
    numReviews: 4,
  },
  {
    name: 'Computer Gaming HP',
    image: '/images/gaming.jpg',
    description:
      'Computer da gaming, processore Intel Core i7 e scheda video dedicata',
    brand: 'HP',
    category: 'Computer',
    price: 1199.00,
    countInStock: 3,
    avgRating: 4,
    numReviews: 1,
  },
  {
    name: 'Nintendo Switch',
    image: '/images/switch.jpg',
    description:
      'Console portatile, joycon inclusi',
    brand: 'Nintendo',
    category: 'Console',
    price: 329.99,
    countInStock: 10,
    avgRating: 5,
    numReviews: 6,
  },
  {
    name: 'XBOX Series S',
    image: '/images/xbox.jpg',
    description:
      'Console da gioco di Microsoft',
    brand: 'Microsoft',
    category: 'Console',
    price: 299.99,
    countInStock: 1,
    avgRating: 5,
    numReviews: 1,
  },
  {
    name: 'Sony PlayStation 5',
    image: '/images/playstation.jpg',
    description:
      "Console da gioco di Sony, digital edition",
    brand: 'Sony',
    category: 'Console',
    price: 399.99,
    countInStock: 2,
    avgRating: 5,
    numReviews: 2,
  }
]

export default products
