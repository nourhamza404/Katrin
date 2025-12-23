import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, Clock, Package, Award, Users, Sparkles, Instagram, TrendingUp, ShoppingBag, CheckCircle, Gift } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { mockProducts } from '../data/mockData';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface HomePageProps {
  addToCart: (product: any, quantity: number) => void;
}

export default function HomePage({ addToCart }: HomePageProps) {
  const popularProducts = mockProducts.filter(p => p.popular).slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-100 via-pink-50 to-white pt-20 pb-32 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-300/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-600 to-pink-500 text-white px-5 py-2.5 rounded-full text-sm shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>Handgemacht mit Liebe seit 2020</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl text-gray-900 leading-tight"
              >
                Süße Träume<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-pink-500">
                  werden wahr
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 leading-relaxed"
              >
                Individuelle Torten und knusprige Cookies – frisch gebacken, 
                liebevoll dekoriert und genau nach Ihrem Geschmack.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/produkte"
                  className="group bg-gradient-to-r from-pink-600 to-pink-500 text-white px-8 py-4 rounded-full hover:from-pink-700 hover:to-pink-600 transition-all hover:scale-105 shadow-lg flex items-center space-x-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Produkte entdecken</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  to="/nach-wunsch"
                  className="bg-white text-pink-600 px-8 py-4 rounded-full border-2 border-pink-600 hover:bg-pink-50 transition-all hover:scale-105 shadow-md flex items-center space-x-2"
                >
                  <Gift className="w-5 h-5" />
                  <span>Individuelle Anfrage</span>
                </Link>
              </motion.div>

              {/* USPs */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-6 pt-4"
              >
                {[
                  { icon: Heart, text: '100% Handgemacht', color: 'from-pink-500 to-pink-600' },
                  { icon: Star, text: 'Premium Zutaten', color: 'from-yellow-500 to-yellow-600' },
                  { icon: Clock, text: 'Frisch gebacken', color: 'from-blue-500 to-blue-600' }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + idx * 0.1, type: 'spring' }}
                    className="text-center"
                  >
                    <div className={`bg-gradient-to-br ${item.color} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-sm text-gray-700 font-medium">{item.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80"
                    alt="Delicious cakes"
                    className="rounded-3xl shadow-2xl w-full"
                  />
                </motion.div>
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 12 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 px-6 py-3 rounded-full shadow-xl z-20"
              >
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span className="font-bold">Seit 2020</span>
                </div>
              </motion.div>
              
              {/* Customer Stats Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute -bottom-6 -left-6 bg-white px-6 py-4 rounded-2xl shadow-2xl z-20 border border-pink-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-pink-700 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-600 to-pink-800 border-2 border-white"></div>
                  </div>
                  <div>
                    <div className="flex text-yellow-400 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 font-medium">500+ glückliche Kunden</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beliebte Produkte */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-5 py-2.5 rounded-full text-sm mb-6 shadow-lg"
          >
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">Bestseller</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-6">Beliebte Produkte</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Diese handgemachten Kreationen werden von unseren Kunden besonders geliebt
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {popularProducts.map((product, idx) => (
            <EnhancedProductCard 
              key={product.id} 
              product={product} 
              addToCart={addToCart}
              delay={idx * 0.1}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link
            to="/produkte"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-600 to-pink-500 text-white px-8 py-4 rounded-full hover:from-pink-700 hover:to-pink-600 transition-all hover:scale-105 shadow-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Alle Produkte entdecken</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Kategorie-Karten */}
      <section className="bg-gradient-to-br from-white to-pink-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-6">Unsere Kategorien</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Entdecken Sie unsere vielfältigen Kreationen – von kunstvollen Torten bis zu knusprigen Cookies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <CategoryCard
              title="Torten & Kuchen"
              description="Kunstvolle Torten für jeden Anlass – von klassisch bis extravagant"
              image="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80"
              link="/produkte?category=cakes"
              icon="🎂"
              delay={0}
            />
            <CategoryCard
              title="Cookies"
              description="Knusprige, handgemachte Cookies in vielen leckeren Variationen"
              image="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80"
              link="/produkte?category=cookies"
              icon="🍪"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Prozess */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-6">So einfach geht's</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              In nur 3 Schritten zu Ihrer Traumtorte
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                number: "1",
                title: "Wählen oder Gestalten",
                description: "Wählen Sie aus unserem Sortiment oder erstellen Sie Ihre individuelle Torte nach Wunsch.",
                icon: ShoppingBag,
                color: "from-pink-500 to-pink-600"
              },
              {
                number: "2",
                title: "Bestellen",
                description: "Geben Sie Ihre Bestellung auf und wählen Sie Ihren Wunschtermin für Lieferung oder Abholung.",
                icon: CheckCircle,
                color: "from-blue-500 to-blue-600"
              },
              {
                number: "3",
                title: "Genießen",
                description: "Wir backen frisch für Sie und Sie können Ihre Traumtorte genießen!",
                icon: Sparkles,
                color: "from-yellow-500 to-yellow-600"
              }
            ].map((step, idx) => (
              <ProcessStep key={idx} {...step} delay={idx * 0.2} />
            ))}
          </div>
        </div>
      </section>

      {/* Über mich */}
      <section className="bg-gradient-to-br from-pink-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                alt="Baker at work"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-pink-600 to-pink-500 text-white px-8 py-6 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <Award className="w-8 h-8" />
                  <div>
                    <p className="text-2xl font-bold">5+</p>
                    <p className="text-sm text-pink-100">Jahre Erfahrung</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm">
                <Heart className="w-4 h-4" />
                <span>Über Katrin Sweets</span>
              </div>

              <h2 className="text-4xl md:text-5xl text-gray-900">
                Backen mit Leidenschaft & Liebe zum Detail
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Hallo! Ich bin Katrin, und ich liebe es, Menschen mit meinen 
                handgemachten Kreationen glücklich zu machen. Seit 2020 backe 
                ich mit Leidenschaft Torten und Cookies, die nicht nur fantastisch 
                schmecken, sondern auch wunderschön aussehen.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Jedes Stück wird mit hochwertigen Zutaten und viel Liebe zum 
                Detail hergestellt. Ob für Geburtstage, Hochzeiten oder einfach 
                nur zum Genießen – ich freue mich darauf, auch für Sie zu backen!
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { icon: Users, label: '500+ Kunden', color: 'from-pink-500 to-pink-600' },
                  { icon: Package, label: '2000+ Bestellungen', color: 'from-blue-500 to-blue-600' },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className={`bg-gradient-to-br ${stat.color} text-white p-6 rounded-2xl shadow-lg`}
                  >
                    <stat.icon className="w-8 h-8 mb-2" />
                    <p className="font-bold text-lg">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
              
              <Link
                to="/nach-wunsch"
                className="inline-flex items-center space-x-2 text-pink-600 hover:text-pink-700 transition-colors font-medium group"
              >
                <span>Jetzt individuelle Anfrage stellen</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Instagram Galerie */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <a 
              href="https://www.instagram.com/katrensweet/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2.5 rounded-full text-sm mb-6 shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all hover:scale-105"
            >
              <Instagram className="w-4 h-4" />
              <span className="font-medium">@katrensweet</span>
            </a>
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-6">Unsere Kreationen</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Folgen Sie uns auf Instagram für mehr Inspiration und Einblicke hinter die Kulissen
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
              'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80',
              'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&q=80',
              'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=80',
              'https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=400&q=80',
              'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&q=80',
              'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&q=80',
              'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80'
            ].map((image, idx) => (
              <motion.a
                key={idx}
                href="https://www.instagram.com/katrensweet/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="aspect-square overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all cursor-pointer group relative"
              >
                <ImageWithFallback
                  src={image}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all hover:scale-105 shadow-lg"
            >
              <Instagram className="w-5 h-5" />
              <span>Folgen Sie uns auf Instagram</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative bg-gradient-to-br from-pink-600 to-pink-700 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 rounded-full text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Exklusive Angebote & Rezepte</span>
            </div>

            <h2 className="text-4xl md:text-5xl text-white">
              Verpassen Sie keine Neuigkeiten!
            </h2>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Melden Sie sich für unseren Newsletter an und erhalten Sie exklusive Angebote, 
              neue Rezepte und Einblicke hinter die Kulissen
            </p>
            <NewsletterForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function EnhancedProductCard({ product, addToCart, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full group"
    >
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.popular && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm flex items-center space-x-1 shadow-lg">
            <Star className="w-3 h-3 fill-current" />
            <span className="font-medium">Beliebt</span>
          </div>
        )}
      </div>
      
      <div className="p-5 space-y-4 flex flex-col flex-1">
        <div className="space-y-2">
          <h3 className="text-gray-900 truncate group-hover:text-pink-600 transition-colors">{product.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        </div>
        
        <div className="space-y-3 mt-auto pt-2">
          <div>
            <div className="text-2xl text-pink-600 font-bold">€{product.price.toFixed(2)}</div>
            <div className="text-xs text-gray-500">pro Stück</div>
          </div>
          
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full bg-gradient-to-r from-pink-600 to-pink-500 text-white py-2.5 rounded-full hover:from-pink-700 hover:to-pink-600 transition-all hover:scale-105 shadow-md flex items-center justify-center space-x-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Hinzufügen</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ProcessStep({ number, title, description, delay, icon: Icon, color }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative text-center space-y-6"
    >
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
        className={`w-20 h-20 bg-gradient-to-br ${color} text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg relative`}
      >
        <Icon className="w-10 h-10" />
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-gray-900 rounded-full flex items-center justify-center text-sm font-bold shadow-md">
          {number}
        </div>
      </motion.div>
      <h3 className="text-xl text-gray-900 font-medium">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function CategoryCard({ title, description, image, link, icon, delay }: any) {
  return (
    <Link to={link}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all flex flex-col h-full cursor-pointer group relative"
      >
        <div className="relative h-80 overflow-hidden flex-shrink-0">
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Floating Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.3, type: 'spring' }}
            className="absolute top-6 right-6 w-16 h-16 bg-white rounded-full flex items-center justify-center text-4xl shadow-lg"
          >
            {icon}
          </motion.div>
        </div>
        
        <div className="p-8 space-y-4 flex flex-col flex-1">
          <h3 className="text-3xl text-gray-900 group-hover:text-pink-600 transition-colors">{title}</h3>
          <p className="text-gray-600 text-lg flex-1 leading-relaxed">{description}</p>
          <div className="flex items-center text-pink-600 font-medium group-hover:translate-x-2 transition-transform">
            <span>Jetzt entdecken</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      toast.success('Vielen Dank! Sie wurden erfolgreich angemeldet! 🎉');
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ihre E-Mail-Adresse"
          className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50 shadow-lg"
          required
        />
        <button
          type="submit"
          className="px-8 py-4 rounded-full bg-white text-pink-600 hover:bg-gray-100 transition-all hover:scale-105 whitespace-nowrap disabled:opacity-50 shadow-lg font-medium"
          disabled={loading}
        >
          {loading ? 'Laden...' : 'Anmelden'}
        </button>
      </div>
    </form>
  );
}