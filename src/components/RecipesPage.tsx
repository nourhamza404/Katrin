import { useState } from 'react';
import { Clock, Users, ChefHat, BookOpen, Star, Sparkles, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { recipes, Recipe } from '../data/recipesData';
import RecipeDetailModal from './RecipeDetailModal';
import { toast } from 'sonner@2.0.3';

export default function RecipesPage() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [email, setEmail] = useState('');
  const [favoriteRecipes, setFavoriteRecipes] = useState<string[]>([]);

  const categories = ['all', 'Kuchen', 'Cookies', 'Cupcakes', 'Cremes & Frostings'];

  // Filter recipes
  let filteredRecipes = recipes;
  
  if (selectedCategory !== 'all') {
    filteredRecipes = filteredRecipes.filter(r => r.category === selectedCategory);
  }
  
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Newsletter-Anmeldung erfolgreich!', {
        description: `Wir haben eine Bestätigungsmail an ${email} gesendet.`,
      });
      setEmail('');
    }
  };

  const toggleFavorite = (recipeId: string) => {
    setFavoriteRecipes(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
    toast.success(
      favoriteRecipes.includes(recipeId) 
        ? 'Aus Favoriten entfernt' 
        : 'Zu Favoriten hinzugefügt'
    );
  };

  const tips = [
    {
      title: 'Perfekte Tortenschichten',
      tip: 'Für gleichmäßige Tortenschichten verwende einen Tortenring oder schneide mit einem langen, gezackten Messer vorsichtig horizontal durch den Kuchen.',
      icon: '🎂',
    },
    {
      title: 'Buttercreme glätten',
      tip: 'Für eine glatte Oberfläche die Torte zuerst mit einer dünnen Schicht Creme bestreichen (Crumb Coat), kühlen, dann die finale Schicht auftragen.',
      icon: '✨',
    },
    {
      title: 'Cookies gleichmäßig backen',
      tip: 'Verwende einen Eisportionierer für gleich große Cookies. Backe nur eine Temperatur und drehe das Blech nach der Hälfte der Backzeit.',
      icon: '🍪',
    },
    {
      title: 'Kuchen saftig halten',
      tip: 'Wickle fertige Kuchenschichten in Frischhaltefolie und lagere sie im Kühlschrank. So bleiben sie bis zu 3 Tage frisch und saftig.',
      icon: '💧',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-pink-100 via-pink-50 to-white py-16 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-600 to-pink-500 text-white px-5 py-2.5 rounded-full text-sm mb-6 shadow-lg"
          >
            <BookOpen className="w-4 h-4" />
            <span className="font-medium">Bewährte Rezepte</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-4"
          >
            Rezepte & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-pink-500">Tipps</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl"
          >
            Backe wie ein Profi – mit unseren bewährten Rezepten und Expertentipps
          </motion.p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Category Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map((category, idx) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all font-medium ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-md scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                {category === 'all' ? '✨ Alle Rezepte' : category}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Recipes Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-3xl text-gray-900 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-pink-600" />
            {filteredRecipes.length} {filteredRecipes.length === 1 ? 'Rezept' : 'Rezepte'}
          </h2>
        </motion.div>
        
        {filteredRecipes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe}
                index={index}
                isFavorite={favoriteRecipes.includes(recipe.id)}
                onToggleFavorite={() => toggleFavorite(recipe.id)}
                onClick={() => setSelectedRecipe(recipe)}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-pink-600" />
            </div>
            <h3 className="text-2xl text-gray-900 mb-2">Keine Rezepte gefunden</h3>
            <p className="text-gray-600 mb-6">
              Versuche einen anderen Suchbegriff oder wähle eine andere Kategorie.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="bg-gradient-to-r from-pink-600 to-pink-500 text-white px-6 py-3 rounded-full hover:from-pink-700 hover:to-pink-600 transition-all hover:scale-105 shadow-lg"
            >
              Alle Rezepte anzeigen
            </button>
          </motion.div>
        )}
      </section>

      {/* Tips Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl text-gray-900 mb-4">Back-Tipps vom Profi</h2>
            <p className="text-gray-600">
              Kleine Tricks für große Erfolge in der Küche
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <TipCard key={index} tip={tip} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorial Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <ChefHat className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl mb-4">Video-Tutorials</h2>
          <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
            Schaue dir unsere Video-Anleitungen an und lerne Schritt für Schritt, 
            wie du professionelle Torten und Desserts zauberst.
          </p>
          <button className="bg-white text-pink-600 px-8 py-3 rounded-full hover:bg-pink-50 transition-colors">
            Bald verfügbar
          </button>
        </motion.div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl text-gray-900 mb-4">
              Bleib auf dem Laufenden
            </h2>
            <p className="text-gray-600 mb-6">
              Melde dich für unseren Newsletter an und erhalte neue Rezepte, 
              Back-Tipps und exklusive Angebote direkt in dein Postfach.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Deine E-Mail-Adresse"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
              <button
                type="submit"
                className="bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition-all hover:scale-105 whitespace-nowrap"
              >
                Anmelden
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Recipe Detail Modal */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
}

function RecipeCard({ recipe, index, isFavorite, onToggleFavorite, onClick }: { recipe: Recipe; index: number; isFavorite: boolean; onToggleFavorite: () => void; onClick: () => void }) {
  const difficultyColor = {
    'Einfach': 'bg-green-100 text-green-700',
    'Mittel': 'bg-yellow-100 text-yellow-700',
    'Schwer': 'bg-red-100 text-red-700'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer flex flex-col h-full relative"
    >
      <div className="relative h-48 overflow-hidden group flex-shrink-0" onClick={onClick}>
        <ImageWithFallback
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs">
          {recipe.category}
        </div>
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs ${difficultyColor[recipe.difficulty]}`}>
          {recipe.difficulty}
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ${
            isFavorite 
              ? 'bg-pink-600 text-white hover:bg-pink-700' 
              : 'bg-white/90 text-gray-600 hover:bg-white hover:text-pink-600'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>
      
      <div className="p-5 space-y-3 flex flex-col flex-1" onClick={onClick}>
        <h3 className="text-lg text-gray-900 truncate">{recipe.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{recipe.description}</p>
        
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="text-center">
            <Clock className="w-4 h-4 text-pink-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600">{recipe.prepTime}</p>
          </div>
          <div className="text-center">
            <Users className="w-4 h-4 text-pink-600 mx-auto mb-1" />
            <p className="text-xs text-gray-600">{recipe.servings}</p>
          </div>
          <div className="text-center">
            <div className="w-4 h-4 flex items-center justify-center mx-auto mb-1">
              <span className="text-sm">📊</span>
            </div>
            <p className="text-xs text-gray-600">{recipe.difficulty}</p>
          </div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-pink-600 to-pink-500 text-white py-2.5 rounded-full hover:from-pink-700 hover:to-pink-600 transition-all hover:scale-105 text-sm mt-auto shadow-md">
          Rezept ansehen
        </button>
      </div>
    </motion.div>
  );
}

function TipCard({ tip, index }: { tip: any; index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-pink-50 rounded-2xl p-6 hover:bg-pink-100 transition-colors"
    >
      <div className="flex items-start space-x-4">
        <div className="text-4xl flex-shrink-0">{tip.icon}</div>
        <div>
          <h3 className="text-lg text-gray-900 mb-2">{tip.title}</h3>
          <p className="text-gray-600 text-sm">{tip.tip}</p>
        </div>
      </div>
    </motion.div>
  );
}