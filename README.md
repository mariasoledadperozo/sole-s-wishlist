# 🎁 Wishlist

Lista de deseos personal hecha con **React + Vite**, como proyecto de fin de semana.
Los regalos se cargan desde un archivo JSON y cada uno puede tener varias opciones de compra (nuevo o segunda mano, en distintas tiendas) para comparar precios.

## Funcionalidades
- Catálogo de regalos cargado desde `src/data/gifts.json`
- Galería de imágenes por regalo
- Prioridad y estado de cada regalo
- Varias opciones de compra con precio, tienda y enlace

## Tecnologías
React · Vite · JavaScript (ES6+)

## Arrancar
```bash
git clone https://github.com/mariasoledadperozo/wishlist.git
cd wishlist
npm install
npm run dev
```

## Estructura de datos
Cada regalo en `gifts.json` tiene este formato:

```json
{
  "id": 1,
  "slug": "kindle-paperwhite",
  "name": "Kindle Paperwhite",
  "description": "Lector de libros electrónicos para leer en cualquier sitio.",
  "images": ["/img/kindle-paper-white-1.jpg"],
  "priority": 1,
  "status": "Available",
  "options": [
    {
      "condition": "SecondHand",
      "price": 35,
      "currency": "EUR",
      "url": "https://es.wallapop.com/item/...",
      "storeName": "Wallapop",
      "notes": null
    }
  ]
}
```

| Campo | Descripción |
|---|---|
| `slug` | Identificador legible para la URL |
| `images` | Rutas dentro de `public/img/` |
| `priority` | Orden de importancia (1 = más alta) |
| `status` | Estado del regalo (p. ej. `Available`) |
| `options` | Dónde comprarlo: estado (`condition`), precio, moneda, enlace, tienda y notas |

## Próximos pasos
- Filtrar por estado y ordenar por prioridad
- Mostrar el precio más bajo de cada regalo
- Desplegar en GitHub Pages