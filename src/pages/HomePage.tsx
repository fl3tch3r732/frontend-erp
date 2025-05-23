import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ModuleCard from '../components/ui/ModuleCard';
import { modules } from '../data/modules';
import { BookOpen, Users, Award, Cpu } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 via-primary-800 to-primary-900 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Système de Gestion Universitaire
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Une plateforme complète et intuitive pour la gestion des ressources universitaires
              de l'IUT de Douala.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/login"
                className="bg-white text-primary-700 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Connexion
              </Link>
              <a
                href="#modules"
                className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Découvrir les modules
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Une Solution Complète
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Notre système est conçu pour simplifier tous les aspects de la gestion universitaire,
              de la planification des cours à la gestion des ressources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestion Académique</h3>
              <p className="text-gray-600">
                Planifiez et gérez efficacement les cours, emplois du temps et examens.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestion du Personnel</h3>
              <p className="text-gray-600">
                Suivez la disponibilité des enseignants et optimisez l'allocation des ressources.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="text-success-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suivi des Performances</h3>
              <p className="text-gray-600">
                Analysez les résultats et générez des rapports détaillés sur les performances.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center mb-4">
                <Cpu className="text-warning-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestion des Ressources</h3>
              <p className="text-gray-600">
                Optimisez l'utilisation des salles et des équipements techniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Nos Modules
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez l'ensemble des fonctionnalités disponibles dans notre système de gestion universitaire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Prêt à améliorer la gestion de votre université?
            </h2>
            <p className="text-gray-600 mb-8">
              Connectez-vous pour accéder à tous les modules et fonctionnalités du système.
            </p>
            <Link
              to="/login"
              className="inline-block bg-primary-600 text-white hover:bg-primary-700 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Commencer maintenant
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;