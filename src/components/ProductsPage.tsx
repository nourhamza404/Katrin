import { useState, useEffect } from 'react';
import { Eye, ChevronRight, SlidersHorizontal, Grid3x3, List, Heart, Star, ShoppingCart, Sparkles, TrendingUp, ChevronDown, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ProductQuickView from './ProductQuickView';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface ProductsPageProps {
  category?: 'cookies' | 'cakes';
  addToCart: (product: any, quantity: number) => void;
}

export default function ProductsPage({ category, addToCart }: ProductsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(category || 'all');
  const [sortBy, setSortBy] = useState('popular');
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-48cde07a/products`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load products');
      }

      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Fehler beim Laden der Produkte');
    } finally {
      setIsLoading(false);
    }
  };

  let filteredProducts = products;
  
  if (selectedCategory !== 'all') {
    filteredProducts = products.filter(p => p.category === selectedCategory);
  }

  // Filter by price range
  filteredProducts = filteredProducts.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'popular') {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
  } else if (sortBy === 'name') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  }

  const categoryInfo = {
    all: {
      title: 'Alle Produkte',
      description: 'Entdecken Sie unsere handgemachten Leckereien für jeden Anlass',
      icon: '🎂',
      gradient: 'from-pink-100 to-white'
    },
    cookies: {
      title: 'Cookies',
      description: 'Knusprige, handgemachte Cookies in vielen leckeren Variationen',
      icon: '🍪',
      gradient: 'from-amber-100 to-white'
    },
    cakes: {
      title: 'Torten & Kuchen',
      description: 'Kunstvolle Torten für jeden Anlass – von klassisch bis extravagant',
      icon: '🎂',
      gradient: 'from-pink-100 to-white'
    }
  };

  const currentInfo = categoryInfo[selectedCategory as keyof typeof categoryInfo] || categoryInfo.all;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      {/* Header */}
      <div className={`bg-gradient-to-br ${currentInfo.gradient} py-16 relative overflow-hidden`}>
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-sm text-gray-600 mb-6"
          >
            <Link to="/" className="hover:text-pink-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-pink-600">{currentInfo.title}</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-6xl mb-4"
            >
              {currentInfo.icon}
            </motion.div>
            <h1 className="text-4xl md:text-5xl text-gray-900 mb-4">
              {currentInfo.title}
            </h1>
            <p className="text-xl text-gray-600">
              {currentInfo.description}
            </p>
            
            {/* Product Count */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-pink-600" />
              <span className="text-sm text-gray-700">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Produkt' : 'Produkte'} verfügbar
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Filters & Sort Bar */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white border-b shadow-sm sticky top-16 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              {[
                { value: 'all', label: 'Alle', icon: '🎉' },
                { value: 'cakes', label: 'Torten', icon: '🎂' },
                { value: 'cookies', label: 'Cookies', icon: '🍪' }
              ].map((cat) => (
                <motion.button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full transition-all flex items-center space-x-2 ${
                    selectedCategory === cat.value
                      ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-3">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-gray-100 text-gray-700 px-4 py-2 pr-10 rounded-full hover:bg-gray-200 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="popular">⭐ Beliebteste</option>
                  <option value="price-low">💰 Preis aufsteigend</option>
                  <option value="price-high">💎 Preis absteigend</option>
                  <option value="name">🔤 Name A-Z</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-full transition-all ${
                    viewMode === 'grid'
                      ? 'bg-pink-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-full transition-all ${
                    viewMode === 'list'
                      ? 'bg-pink-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Products Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {[...Array(8)].map((_, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                  <div className="h-8 bg-gray-200 rounded mt-4"></div>
                  <div className="h-10 bg-gray-300 rounded-full mt-4"></div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredProducts.map((product, idx) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    addToCart={addToCart}
                    onQuickView={() => setQuickViewProduct(product)}
                    delay={idx * 0.05}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {filteredProducts.map((product, idx) => (
                  <ProductListItem 
                    key={product.id} 
                    product={product} 
                    addToCart={addToCart}
                    onQuickView={() => setQuickViewProduct(product)}
                    delay={idx * 0.05}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-5xl">🔍</div>
            </div>
            <h3 className="text-2xl text-gray-900 mb-2">Keine Produkte gefunden</h3>
            <p className="text-gray-600 mb-6">
              Versuchen Sie, die Filter anzupassen oder eine andere Kategorie zu wählen.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setPriceRange([0, 100]);
              }}
              className="bg-gradient-to-r from-pink-600 to-pink-500 text-white px-6 py-3 rounded-full hover:from-pink-700 hover:to-pink-600 transition-all hover:scale-105 shadow-lg"
            >
              Alle Filter zurücksetzen
            </button>
          </motion.div>
        )}
      </div>

      {/* Call to Action */}
      {filteredProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
        >
          <div className="bg-gradient-to-r from-pink-600 to-pink-500 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl mb-4">Nichts Passendes gefunden?</h2>
              <p className="text-xl text-pink-100 mb-6 max-w-2xl mx-auto">
                Lassen Sie uns gemeinsam Ihre individuelle Traumtorte kreieren – genau nach Ihren Wünschen!
              </p>
              <Link
                to="/nach-wunsch"
                className="inline-flex items-center space-x-2 bg-white text-pink-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
              >
                <Sparkles className="w-5 h-5" />
                <span>Individuelle Anfrage stellen</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      <ProductQuickView 
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        addToCart={addToCart}
      />
    </div>
  );
}

function ProductCard({ product, addToCart, onQuickView, delay }: any) {
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all flex flex-col h-full group"
    >
      <div className="relative h-56 overflow-hidden flex-shrink-0">
        <ImageWithFallback
          src={product.image_url || product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          {product.popular && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.2, type: 'spring' }}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm flex items-center space-x-1 shadow-lg"
            >
              <Star className="w-3 h-3 fill-current" />
              <span>Beliebt</span>
            </motion.div>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsLiked(!isLiked);
              toast.success(isLiked ? 'Von Favoriten entfernt' : 'Zu Favoriten hinzugefügt');
            }}
            className={`ml-auto p-2 rounded-full backdrop-blur-sm transition-all ${
              isLiked 
                ? 'bg-pink-600 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={onQuickView}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-gray-900 px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
          >
            <Eye className="w-4 h-4" />
            <span>Schnellansicht</span>
          </button>
        </div>
      </div>
      
      <div className="p-5 space-y-3 flex flex-col flex-1">
        <div>
          <h3 className="text-gray-900 mb-1 truncate group-hover:text-pink-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 uppercase tracking-wide flex items-center space-x-1">
            <span>{product.category === 'cakes' ? '🎂' : '🍪'}</span>
            <span>{product.category === 'cakes' ? 'Torte' : 'Cookie'}</span>
          </p>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 flex-1">{product.description}</p>
        
        <div className="pt-2 mt-auto space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl text-pink-600">€{product.price.toFixed(2)}</div>
              <div className="text-xs text-gray-500">pro Stück</div>
            </div>
            
            <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center transition-colors shadow-sm"
              >
                −
              </motion.button>
              <span className="w-6 text-center text-sm font-medium">{quantity}</span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center transition-colors shadow-sm"
              >
                +
              </motion.button>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              addToCart(product, quantity);
              setQuantity(1);
            }}
            className="w-full bg-gradient-to-r from-pink-600 to-pink-500 text-white py-2.5 rounded-full hover:from-pink-700 hover:to-pink-600 transition-all shadow-md flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>In den Warenkorb</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function ProductListItem({ product, addToCart, onQuickView, delay }: any) {
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all flex flex-col md:flex-row group"
    >
      <div className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden flex-shrink-0">
        <ImageWithFallback
          src={product.image_url || product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.popular && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm flex items-center space-x-1 shadow-lg">
            <Star className="w-3 h-3 fill-current" />
            <span>Beliebt</span>
          </div>
        )}
      </div>

      <div className="flex-1 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl text-gray-900 mb-1 group-hover:text-pink-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 uppercase tracking-wide flex items-center space-x-1">
                <span>{product.category === 'cakes' ? '🎂' : '🍪'}</span>
                <span>{product.category === 'cakes' ? 'Torte' : 'Cookie'}</span>
              </p>
            </div>
            <button
              onClick={() => {
                setIsLiked(!isLiked);
                toast.success(isLiked ? 'Von Favoriten entfernt' : 'Zu Favoriten hinzugefügt');
              }}
              className={`p-2 rounded-full transition-all ${
                isLiked 
                  ? 'bg-pink-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <button
            onClick={onQuickView}
            className="text-pink-600 hover:text-pink-700 text-sm flex items-center space-x-1"
          >
            <Eye className="w-4 h-4" />
            <span>Details ansehen</span>
          </button>
        </div>

        <div className="flex flex-col items-end space-y-3 w-full md:w-auto">
          <div className="text-right">
            <div className="text-3xl text-pink-600">€{product.price.toFixed(2)}</div>
            <div className="text-xs text-gray-500">pro Stück</div>
          </div>
          
          <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              −
            </button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              +
            </button>
          </div>

          <button
            onClick={() => {
              addToCart(product, quantity);
              setQuantity(1);
            }}
            className="w-full md:w-auto bg-gradient-to-r from-pink-600 to-pink-500 text-white px-6 py-2.5 rounded-full hover:from-pink-700 hover:to-pink-600 transition-all shadow-md flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>In den Warenkorb</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}