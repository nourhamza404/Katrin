import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, Save, X, Loader2, Package, BookOpen, Mail, ShoppingBag, CheckCircle, XCircle, Clock, Eye, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { useNavigate } from 'react-router-dom';
import SeedProductsButton from './SeedProductsButton';
import AdminOrders from './AdminOrders';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'cakes' | 'cookies';
  image_url: string;
  is_popular: boolean;
  is_available: boolean;
}

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prep_time: string;
  cook_time: string;
  servings: string;
  difficulty: 'easy' | 'medium' | 'hard';
  image_url: string;
  category: string;
}

interface AdminPanelProps {
  currentUser: any;
}

export default function AdminPanel({ currentUser }: AdminPanelProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'products' | 'recipes' | 'orders'>('orders');
  const [products, setProducts] = useState<Product[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'cakes' as 'cakes' | 'cookies',
    image_url: '',
    is_popular: false,
    is_available: true,
  });

  const [recipeFormData, setRecipeFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    prep_time: '',
    cook_time: '',
    servings: '',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    image_url: '',
    category: '',
  });

  const ADMIN_EMAIL = 'nourhamza221@gmail.com';
  const isAdmin = currentUser?.email === ADMIN_EMAIL;

  useEffect(() => {
    if (activeTab === 'products') {
      loadProducts();
    } else {
      loadRecipes();
    }
  }, [activeTab]);

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

  const loadRecipes = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-48cde07a/recipes`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load recipes');
      }

      const data = await response.json();
      setRecipes(data.recipes || []);
    } catch (error) {
      console.error('Error loading recipes:', error);
      toast.error('Fehler beim Laden der Rezepte');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const productData = {
        id: editingProduct?.id || `product_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image_url: formData.image_url,
        is_popular: formData.is_popular,
        is_available: formData.is_available,
      };

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-48cde07a/products`, {
        method: editingProduct ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to save product');
      }

      toast.success(editingProduct ? 'Produkt aktualisiert!' : 'Produkt erstellt!');
      resetForm();
      loadProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Fehler beim Speichern');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image_url: product.image_url,
      is_popular: product.is_popular,
      is_available: product.is_available,
    });
    setIsEditing(true);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Produkt wirklich löschen?')) return;

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-48cde07a/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      toast.success('Produkt gelöscht!');
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Fehler beim Löschen');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'cakes',
      image_url: '',
      is_popular: false,
      is_available: true,
    });
    setEditingProduct(null);
    setIsEditing(false);
  };

  const handleRecipeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const recipeData = {
        id: editingRecipe?.id || `recipe_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        title: recipeFormData.title,
        description: recipeFormData.description,
        ingredients: recipeFormData.ingredients.split('\n').map((ingredient) => ingredient.trim()).filter((ingredient) => ingredient),
        instructions: recipeFormData.instructions.split('\n').map((instruction) => instruction.trim()).filter((instruction) => instruction),
        prep_time: recipeFormData.prep_time,
        cook_time: recipeFormData.cook_time,
        servings: recipeFormData.servings,
        difficulty: recipeFormData.difficulty,
        image_url: recipeFormData.image_url,
        category: recipeFormData.category,
      };

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-48cde07a/recipes`, {
        method: editingRecipe ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) {
        throw new Error('Failed to save recipe');
      }

      toast.success(editingRecipe ? 'Rezept aktualisiert!' : 'Rezept erstellt!');
      resetRecipeForm();
      loadRecipes();
    } catch (error) {
      console.error('Error saving recipe:', error);
      toast.error('Fehler beim Speichern');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRecipeEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setRecipeFormData({
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients.join('\n'),
      instructions: recipe.instructions.join('\n'),
      prep_time: recipe.prep_time,
      cook_time: recipe.cook_time,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      image_url: recipe.image_url,
      category: recipe.category,
    });
    setIsEditing(true);
  };

  const handleRecipeDelete = async (recipeId: string) => {
    if (!confirm('Rezept wirklich löschen?')) return;

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-48cde07a/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete recipe');
      }

      toast.success('Rezept gelöscht!');
      loadRecipes();
    } catch (error) {
      console.error('Error deleting recipe:', error);
      toast.error('Fehler beim Löschen');
    }
  };

  const resetRecipeForm = () => {
    setRecipeFormData({
      title: '',
      description: '',
      ingredients: '',
      instructions: '',
      prep_time: '',
      cook_time: '',
      servings: '',
      difficulty: 'medium',
      image_url: '',
      category: '',
    });
    setEditingRecipe(null);
    setIsEditing(false);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Bitte melden Sie sich an, um das Admin-Panel zu nutzen.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">Admin Panel</h1>
                <p className="text-gray-600">Produkte und Rezepte verwalten</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/email-preview')}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              E-Mail Design ansehen
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={() => {
              setActiveTab('orders');
              setIsEditing(false);
            }}
            className={`px-6 py-3 ${activeTab === 'orders' ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' : 'bg-gray-100 text-gray-700'} rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2`}
          >
            <ShoppingBag className="w-5 h-5" />
            Bestellungen
          </button>
          <button
            onClick={() => {
              setActiveTab('products');
              setIsEditing(false);
              setIsLoading(true);
            }}
            className={`px-6 py-3 ${activeTab === 'products' ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' : 'bg-gray-100 text-gray-700'} rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2`}
          >
            <Package className="w-5 h-5" />
            Produkte
          </button>
          <button
            onClick={() => {
              setActiveTab('recipes');
              setIsEditing(false);
              setIsLoading(true);
            }}
            className={`px-6 py-3 ${activeTab === 'recipes' ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' : 'bg-gray-100 text-gray-700'} rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2`}
          >
            <BookOpen className="w-5 h-5" />
            Rezepte
          </button>
        </div>

        {/* Add Product Button */}
        {!isEditing && activeTab === 'products' && (
          <div className="mb-6 flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Neues Produkt
            </motion.button>
            {products.length === 0 && <SeedProductsButton />}
          </div>
        )}

        {/* Add Recipe Button */}
        {!isEditing && activeTab === 'recipes' && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsEditing(true)}
            className="mb-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Neues Rezept
          </motion.button>
        )}

        {/* Product Form */}
        <AnimatePresence>
          {isEditing && activeTab === 'products' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-xl p-8 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-900">
                  {editingProduct ? 'Produkt bearbeiten' : 'Neues Produkt'}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Produktname *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                      placeholder="z.B. Schokoladentorte Deluxe"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Preis (€) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                      placeholder="45.00"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Beschreibung *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Beschreiben Sie das Produkt..."
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Bild URL *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      required
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                      placeholder="https://images.unsplash.com/..."
                    />
                    <button
                      type="button"
                      onClick={() => window.open('https://unsplash.com', '_blank')}
                      className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Unsplash
                    </button>
                  </div>
                  {formData.image_url && (
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="mt-3 w-32 h-32 object-cover rounded-xl"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/150?text=Bild+nicht+gefunden';
                      }}
                    />
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Kategorie *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="cakes"
                        checked={formData.category === 'cakes'}
                        onChange={(e) => setFormData({ ...formData, category: 'cakes' })}
                        className="w-4 h-4 text-pink-500 focus:ring-pink-500"
                      />
                      <span className="text-gray-700">Torten</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="cookies"
                        checked={formData.category === 'cookies'}
                        onChange={(e) => setFormData({ ...formData, category: 'cookies' })}
                        className="w-4 h-4 text-pink-500 focus:ring-pink-500"
                      />
                      <span className="text-gray-700">Cookies</span>
                    </label>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_popular}
                      onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                      className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500"
                    />
                    <span className="text-gray-700">Als beliebt markieren</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_available}
                      onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                      className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500"
                    />
                    <span className="text-gray-700">Verfügbar</span>
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Speichern...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        {editingProduct ? 'Aktualisieren' : 'Erstellen'}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    Abbrechen
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recipe Form */}
        <AnimatePresence>
          {isEditing && activeTab === 'recipes' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-xl p-8 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-900">
                  {editingRecipe ? 'Rezept bearbeiten' : 'Neues Rezept'}
                </h2>
                <button
                  onClick={resetRecipeForm}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleRecipeSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Titel *
                    </label>
                    <input
                      type="text"
                      required
                      value={recipeFormData.title}
                      onChange={(e) => setRecipeFormData({ ...recipeFormData, title: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                      placeholder="z.B. Schokoladentorte Deluxe"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Kategorie *
                    </label>
                    <input
                      type="text"
                      required
                      value={recipeFormData.category}
                      onChange={(e) => setRecipeFormData({ ...recipeFormData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                      placeholder="z.B. Torten"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Beschreibung *
                  </label>
                  <textarea
                    required
                    value={recipeFormData.description}
                    onChange={(e) => setRecipeFormData({ ...recipeFormData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Beschreiben Sie das Rezept..."
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Bild URL *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      required
                      value={recipeFormData.image_url}
                      onChange={(e) => setRecipeFormData({ ...recipeFormData, image_url: e.target.value })}
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                      placeholder="https://images.unsplash.com/..."
                    />
                    <button
                      type="button"
                      onClick={() => window.open('https://unsplash.com', '_blank')}
                      className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Unsplash
                    </button>
                  </div>
                  {recipeFormData.image_url && (
                    <img
                      src={recipeFormData.image_url}
                      alt="Preview"
                      className="mt-3 w-32 h-32 object-cover rounded-xl"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/150?text=Bild+nicht+gefunden';
                      }}
                    />
                  )}
                </div>

                {/* Ingredients */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Zutaten *
                  </label>
                  <textarea
                    required
                    value={recipeFormData.ingredients}
                    onChange={(e) => setRecipeFormData({ ...recipeFormData, ingredients: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Eine Zutat pro Zeile..."
                  />
                </div>

                {/* Instructions */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Zubereitungsanleitung *
                  </label>
                  <textarea
                    required
                    value={recipeFormData.instructions}
                    onChange={(e) => setRecipeFormData({ ...recipeFormData, instructions: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Ein Schritt pro Zeile..."
                  />
                </div>

                {/* Prep Time */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Vorbereitungszeit *
                  </label>
                  <input
                    type="text"
                    required
                    value={recipeFormData.prep_time}
                    onChange={(e) => setRecipeFormData({ ...recipeFormData, prep_time: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                    placeholder="z.B. 30 Minuten"
                  />
                </div>

                {/* Cook Time */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Kochzeit *
                  </label>
                  <input
                    type="text"
                    required
                    value={recipeFormData.cook_time}
                    onChange={(e) => setRecipeFormData({ ...recipeFormData, cook_time: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                    placeholder="z.B. 1 Stunde"
                  />
                </div>

                {/* Servings */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Portionen *
                  </label>
                  <input
                    type="text"
                    required
                    value={recipeFormData.servings}
                    onChange={(e) => setRecipeFormData({ ...recipeFormData, servings: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                    placeholder="z.B. 8"
                  />
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Schwierigkeit *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="easy"
                        checked={recipeFormData.difficulty === 'easy'}
                        onChange={(e) => setRecipeFormData({ ...recipeFormData, difficulty: 'easy' })}
                        className="w-4 h-4 text-pink-500 focus:ring-pink-500"
                      />
                      <span className="text-gray-700">Einfach</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="medium"
                        checked={recipeFormData.difficulty === 'medium'}
                        onChange={(e) => setRecipeFormData({ ...recipeFormData, difficulty: 'medium' })}
                        className="w-4 h-4 text-pink-500 focus:ring-pink-500"
                      />
                      <span className="text-gray-700">Mittel</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="hard"
                        checked={recipeFormData.difficulty === 'hard'}
                        onChange={(e) => setRecipeFormData({ ...recipeFormData, difficulty: 'hard' })}
                        className="w-4 h-4 text-pink-500 focus:ring-pink-500"
                      />
                      <span className="text-gray-700">Schwer</span>
                    </label>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Speichern...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        {editingRecipe ? 'Aktualisieren' : 'Erstellen'}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetRecipeForm}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    Abbrechen
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products List */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Alle Produkte ({products.length})</h2>
            </div>

            {isLoading ? (
              <div className="p-12 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-pink-500 mx-auto mb-3" />
                <p className="text-gray-600">Produkte werden geladen...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="p-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">Noch keine Produkte vorhanden</p>
                <p className="text-sm text-gray-500">Erstellen Sie Ihr erstes Produkt oder nutzen Sie die Beispielprodukte zum schnellen Start.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {products.map((product) => (
                  <div key={product.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      {/* Image */}
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-xl"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/150?text=Kein+Bild';
                        }}
                      />

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-gray-900 font-medium">{product.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">{product.price.toFixed(2)} €</p>
                            <div className="flex gap-2 mt-2">
                              {product.is_popular && (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-lg">
                                  Beliebt
                                </span>
                              )}
                              {!product.is_available && (
                                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-lg">
                                  Nicht verfügbar
                                </span>
                              )}
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                                {product.category === 'cakes' ? 'Torte' : 'Cookie'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Recipes List */}
        {activeTab === 'recipes' && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Alle Rezepte ({recipes.length})</h2>
            </div>

            {isLoading ? (
              <div className="p-12 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-pink-500 mx-auto mb-3" />
                <p className="text-gray-600">Rezepte werden geladen...</p>
              </div>
            ) : recipes.length === 0 ? (
              <div className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">Noch keine Rezepte vorhanden</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 text-pink-500 hover:text-pink-600 font-medium"
                >
                  Erstes Rezept erstellen
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {recipes.map((recipe) => (
                  <div key={recipe.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      {/* Image */}
                      <img
                        src={recipe.image_url}
                        alt={recipe.title}
                        className="w-24 h-24 object-cover rounded-xl"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/150?text=Kein+Bild';
                        }}
                      />

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-gray-900 font-medium">{recipe.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex gap-2 mt-2">
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                                {recipe.category}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                                {recipe.difficulty === 'easy' ? 'Einfach' : recipe.difficulty === 'medium' ? 'Mittel' : 'Schwer'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRecipeEdit(recipe)}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleRecipeDelete(recipe.id)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Orders List */}
        {activeTab === 'orders' && (
          <AdminOrders currentUser={currentUser} />
        )}
      </div>
    </div>
  );
}