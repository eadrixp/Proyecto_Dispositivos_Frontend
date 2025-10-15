import React from 'react';

interface ProductCardProps {
  id?: number;
  image: string;
  name: string;
  category: string;
  price: number;
  sold?: number;
  stock?: number;
  description?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  category,
  price,
  stock,
  description,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-stroke bg-white shadow-default transition-all duration-300 hover:shadow-lg dark:border-strokedark dark:bg-boxdark">
      {/* Imagen del producto */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-meta-4">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            // Imagen placeholder si falla la carga
            e.currentTarget.src = `https://via.placeholder.com/300x200/3C50E0/FFFFFF?text=${encodeURIComponent(name.substring(0, 20))}`;
          }}
        />
        
        {/* Badge de código del producto */}
        <div className="absolute top-2 left-2">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-white shadow-md">
            {category}
          </span>
        </div>

        {/* Badge de stock bajo (opcional) */}
        {stock !== undefined && stock < 10 && stock > 0 && (
          <div className="absolute top-2 right-2">
            <span className="rounded-full bg-warning px-3 py-1 text-xs font-medium text-white shadow-md">
              ¡Pocas unidades!
            </span>
          </div>
        )}

        {/* Badge de sin stock (opcional) */}
        {stock !== undefined && stock === 0 && (
          <div className="absolute top-2 right-2">
            <span className="rounded-full bg-danger px-3 py-1 text-xs font-medium text-white shadow-md">
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="p-4">
        {/* Nombre del producto */}
        <h3 className="mb-2 text-lg font-semibold text-black line-clamp-2 dark:text-white">
          {name}
        </h3>

        {/* Descripción (si existe) */}
        {description && (
          <p className="mb-3 text-sm text-gray-600 line-clamp-2 dark:text-gray-400">
            {description}
          </p>
        )}

        {/* Precio */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">
              Q {parseFloat(price.toString()).toLocaleString('es-GT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          {/* Botón de acción */}
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            Ver más
          </button>
        </div>

        {/* Stock (si está disponible) */}
        {stock !== undefined && (
          <div className="mt-3 pt-3 border-t border-stroke dark:border-strokedark">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Stock disponible:</span>
              <span className={`font-semibold ${
                stock === 0 ? 'text-danger' : 
                stock < 10 ? 'text-warning' : 
                'text-success'
              }`}>
                {stock} unidades
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
