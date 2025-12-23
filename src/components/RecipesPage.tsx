import { useState } from 'react';
import { Clock, Users, ChefHat } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { recipes, Recipe } from '../data/recipesData';
import RecipeDetailModal from './RecipeDetailModal';
import { toast } from 'sonner@2.0.3';

export default function RecipesPage() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [email, setEmail] = useState('');

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
    <div className="min-h-screen bg-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-100 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl text-gray-900 mb-4"
          >
            Rezepte & Tipps
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Backe wie ein Profi – mit unseren bewährten Rezepten und Expertentipps
          </motion.p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Category Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'Alle Rezepte' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recipes Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl text-gray-900">
            {filteredRecipes.length} {filteredRecipes.length === 1 ? 'Rezept' : 'Rezepte'}
          </h2>
        </div>
        
        {filteredRecipes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe}
                index={index}
                onClick={() => setSelectedRecipe(recipe)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">
              Keine Rezepte gefunden. Versuche einen anderen Suchbegriff.
            </p>
          </div>
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

function RecipeCard({ recipe, index, onClick }: { recipe: Recipe; index: number; onClick: () => void }) {
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
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer flex flex-col h-full"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden group flex-shrink-0">
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
      </div>
      
      <div className="p-5 space-y-3 flex flex-col flex-1">
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
              <span className="text-pink-600">📊</span>
            </div>
            <p className="text-xs text-gray-600">{recipe.difficulty}</p>
          </div>
        </div>
        
        <button className="w-full bg-pink-600 text-white py-2 rounded-full hover:bg-pink-700 transition-all hover:scale-105 text-sm mt-auto">
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