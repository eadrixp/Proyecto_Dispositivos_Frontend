import React, { useState, useEffect, useCallback } from 'react';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import CardImage from '../../images/cards/cards-07.png';
import ProductCard from '../../components/ProductCard';
import { getAllProducts } from '../../components/Admin_Components/Services/productService';
import Loader from '../../common/Loader';

const ECommerce: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState(''); // Input temporal para el buscador
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 12;

  // Función para cargar productos con debounce
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllProducts({
        page: currentPage,
        limit: productsPerPage,
        search: searchTerm || undefined,
      });
      
      // Respuesta del backend: { status, data, pagination }
      if (response && response.status === 'success') {
        setProducts(response.data || []);
        setTotalProducts(response.pagination.totalItems || 0);
        setTotalPages(response.pagination.totalPages || 1);
      } else {
        setProducts([]);
        setTotalProducts(0);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setProducts([]);
      setTotalProducts(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm]);

  // Cargar productos cuando cambian los filtros
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Debounce para la búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput);
      setCurrentPage(1); // Resetear a página 1 al buscar
    }, 500); // Espera 500ms después de que el usuario deje de escribir

    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <>
      {/* Banner Principal */}
      <div className="mb-6 overflow-hidden rounded-lg shadow-md">
        <img 
          src={CardImage} 
          alt="Dashboard Banner" 
          className="w-full h-50 object-cover" 
        />
      </div>

      {/* Buscador */}
      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
        <div className="w-full md:w-2/3">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos por nombre, código o descripción..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded-lg border border-stroke bg-white px-4 py-3 pl-11 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 fill-gray-400"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                fill=""
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                fill=""
              />
            </svg>
          </div>
          {searchInput && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              🔍 Buscando "{searchInput}"...
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSearchInput('');
              setSearchTerm('');
              setCurrentPage(1);
            }}
            className="rounded-lg border border-stroke bg-white px-4 py-3 text-black transition-colors hover:bg-gray-100 dark:border-strokedark dark:bg-boxdark dark:text-white dark:hover:bg-meta-4"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      {/* Grid de productos */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader />
        </div>
      ) : products.length > 0 ? (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-black dark:text-white">
              Productos Disponibles
            </h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {totalProducts} productos encontrados
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            {products.map((product: any, index: number) => (
              <ProductCard
                key={product.id || index}
                id={product.id}
                image={product.image || product.image_url || `https://via.placeholder.com/300x200?text=${encodeURIComponent(product.name || 'Producto')}`}
                name={product.name || 'Producto sin nombre'}
                category={product.code || 'Sin código'} // Usamos el código como "categoría"
                price={parseFloat(product.price) || 0}
                stock={product.stock}
                description={product.description}
              />
            ))}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-stroke bg-white px-4 py-2 text-black transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-strokedark dark:bg-boxdark dark:text-white dark:hover:bg-meta-4"
              >
                Anterior
              </button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`h-10 w-10 rounded-lg border transition-colors ${
                        currentPage === pageNumber
                          ? 'border-primary bg-primary text-white'
                          : 'border-stroke bg-white text-black hover:bg-gray-100 dark:border-strokedark dark:bg-boxdark dark:text-white dark:hover:bg-meta-4'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-stroke bg-white px-4 py-2 text-black transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-strokedark dark:bg-boxdark dark:text-white dark:hover:bg-meta-4"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <svg
            className="mb-4 h-24 w-24 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
            No se encontraron productos
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm
              ? 'Intenta ajustar tu búsqueda o usa otros términos'
              : 'No hay productos disponibles en este momento'}
          </p>
        </div>
      )}

      {/* Sección de gráficos y estadísticas */}
      <div className="mt-8 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
