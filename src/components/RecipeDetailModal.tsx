import { X, Clock, Users, ChefHat, Printer, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Recipe } from '../data/recipesData';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RecipeDetailModal({ recipe, isOpen, onClose }: RecipeDetailModalProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  if (!recipe) return null;

  const handlePrint = () => {
    window.print();
    toast.success('Druckansicht wird vorbereitet');
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Von Favoriten entfernt' : 'Zu Favoriten hinzugefügt');
  };

  const difficultyColor = {
    'Einfach': 'text-green-600 bg-green-50',
    'Mittel': 'text-yellow-600 bg-yellow-50',
    'Schwer': 'text-red-600 bg-red-50'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-full flex items-start justify-center p-0 md:p-4 md:py-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-6xl bg-white md:rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button - Fixed */}
                <button
                  onClick={onClose}
                  className="fixed md:absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg z-20"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Header Image - Scrolls away */}
                <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                  <ImageWithFallback
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-white mb-3">{recipe.title}</h2>
                    <div className="flex items-center space-x-3">
                      <span className="text-white/90 text-base">{recipe.category}</span>
                      <span className="text-white/60">•</span>
                      <span className={`px-4 py-1.5 rounded-full text-sm ${difficultyColor[recipe.difficulty]}`}>
                        {recipe.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-white">
                  <div className="max-w-4xl mx-auto p-6 md:p-8 pb-12">
                    {/* Action Buttons */}
                    <div className="flex items-center justify-between mb-6 pb-6 border-b">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-5 h-5 text-pink-600" />
                          <div>
                            <p className="text-xs text-gray-500">Zubereitung</p>
                            <p className="text-sm">{recipe.prepTime}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ChefHat className="w-5 h-5 text-pink-600" />
                          <div>
                            <p className="text-xs text-gray-500">Backzeit</p>
                            <p className="text-sm">{recipe.cookTime}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-5 h-5 text-pink-600" />
                          <div>
                            <p className="text-xs text-gray-500">Portionen</p>
                            <p className="text-sm">{recipe.servings}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={handleFavorite}
                          className={`p-2 rounded-full transition-all hover:scale-110 ${
                            isFavorite ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={handlePrint}
                          className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <Printer className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-8">{recipe.description}</p>

                    {/* Two Column Layout */}
                    <div className="grid md:grid-cols-3 gap-8">
                      {/* Ingredients */}
                      <div className="md:col-span-1">
                        <h3 className="text-xl text-gray-900 mb-4 flex items-center">
                          <span className="text-2xl mr-2">🥣</span>
                          Zutaten
                        </h3>
                        <ul className="space-y-2">
                          {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-pink-600 mr-2 mt-1">•</span>
                              <span className="text-gray-700 text-sm">{ingredient}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Instructions */}
                      <div className="md:col-span-2">
                        <h3 className="text-xl text-gray-900 mb-4 flex items-center">
                          <span className="text-2xl mr-2">👨‍🍳</span>
                          Zubereitung
                        </h3>
                        <ol className="space-y-4">
                          {recipe.instructions.map((instruction, index) => (
                            <li key={index} className="flex">
                              <span className="flex-shrink-0 w-7 h-7 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">
                                {index + 1}
                              </span>
                              <span className="text-gray-700 text-sm flex-1">{instruction}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    {/* Tips */}
                    {recipe.tips && recipe.tips.length > 0 && (
                      <div className="mt-8 bg-yellow-50 rounded-xl p-6">
                        <h3 className="text-lg text-gray-900 mb-3 flex items-center">
                          <span className="text-xl mr-2">💡</span>
                          Profi-Tipps
                        </h3>
                        <ul className="space-y-2">
                          {recipe.tips.map((tip, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-yellow-600 mr-2 mt-1">✓</span>
                              <span className="text-gray-700 text-sm">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}