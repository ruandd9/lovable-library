import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 rounded-xl gradient-primary">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Apostila<span className="text-primary">Pro</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Materiais de estudo de alta qualidade para você conquistar sua aprovação.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/catalogo" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Minha Conta
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Categorias</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Concursos Públicos
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Vestibulares
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  ENEM
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  OAB
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary" />
                contato@apostilapro.com
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-primary" />
                (11) 99999-9999
              </li>
              <li className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                São Paulo - SP, Brasil
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} ApostilaPro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
