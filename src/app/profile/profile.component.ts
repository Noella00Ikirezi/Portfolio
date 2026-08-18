import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  category: 'penetration-testing' | 'malware-analysis' | 'security-tools' | 'grc-audit' | 'research';
  githubUrl?: string;
  demoUrl?: string;
  icon: string;
}

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface Certification {
  name: string;
  issuer: string;
  year: string;
  icon: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileName = 'Noella IKIREZI';
  tagline = 'Cybersecurity Student | ESGI Master SI | Aspiring Security Expert';
  bio = 'Étudiante en Master SI à l\'ESGI, passionnée par la cybersécurité et l\'analyse de vulnérabilités. Je développe mes compétences en sécurité offensive, analyse de malware et développement d\'outils de sécurité.';

  contact = {
    email: 'noella.ikirezi@esgi.fr',
    github: 'github.com/Noella00Ikirezi',
    linkedin: 'linkedin.com/in/noella-ikirezi',
    twitter: '@noella_ikirezi'
  };

  skills: Skill[] = [
    { name: 'Python Programming', level: 85, category: 'Development' },
    { name: 'Network Security', level: 75, category: 'Infrastructure' },
    { name: 'Web Application Security', level: 70, category: 'Offensive Security' },
    { name: 'Linux/Unix Systems', level: 80, category: 'Systems' },
    { name: 'Docker & Containerization', level: 75, category: 'DevOps' },
    { name: 'Penetration Testing', level: 65, category: 'Offensive Security' },
    { name: 'Cryptography', level: 70, category: 'Security' },
    { name: 'Git & GitHub', level: 85, category: 'Development' }
  ];

  certifications: Certification[] = [
    { name: 'Master SI', issuer: 'ESGI', year: '2024-2025', icon: '🎓' },
    { name: 'Cybersecurity Basics', issuer: 'Online Course', year: '2024', icon: '🔐' },
    { name: 'Python Programming', issuer: 'Certification', year: '2023', icon: '🐍' },
    { name: 'Docker Fundamentals', issuer: 'Docker Inc', year: '2024', icon: '🐳' }
  ];

  projects: Project[] = [
    {
      title: 'Petrix - Plateforme d\'audit cybersécurité',
      description: 'Projet annuel ESGI 4SI4 (binôme). Plateforme SaaS self-hosted pour auditeurs : audit de durcissement Linux/macOS/Windows (80+ contrôles ANSSI/CIS), scoring de conformité, veille CERT-FR, gestion des vulnérabilités, RBAC 4 niveaux et rapports générés par IA.',
      technologies: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Celery', 'Redis', 'Docker'],
      category: 'grc-audit',
      githubUrl: 'https://github.com/Noella00Ikirezi/Petrix',
      demoUrl: 'https://petrix.noellahome.org',
      icon: '🛡️'
    },
    {
      title: 'GRC Platform',
      description: 'Plateforme de Gouvernance, Risque et Conformité unifiée : gestion des risques, suivi de conformité et administration centralisée via une API REST documentée.',
      technologies: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Docker'],
      category: 'grc-audit',
      githubUrl: 'https://github.com/Noella00Ikirezi/grc-platform',
      icon: '📋'
    },
    {
      title: 'Certix - ISO 27001 Audit Console',
      description: 'Application desktop (PySide6) d\'audit de conformité ISO 27001 Annexe A pour systèmes Windows et Linux : 14 contrôles clés, tableau de bord temps réel, export des résultats en JSON.',
      technologies: ['Python', 'PySide6', 'ISO 27001'],
      category: 'grc-audit',
      githubUrl: 'https://github.com/Noella00Ikirezi/Certix',
      icon: '✅'
    },
    {
      title: 'CertixScan - Port Scanner',
      description: 'Scanner de ports réseau multi-threadé avec détection automatique de services. Développé en Python avec support Docker complet, tests unitaires et documentation professionnelle. Projet réalisé dans le cadre de mes études à l\'ESGI.',
      technologies: ['Python', 'Docker', 'Multi-threading', 'Socket', 'Pytest'],
      category: 'security-tools',
      githubUrl: 'https://github.com/Noella00Ikirezi/certixscan-port-scanner',
      icon: '🔍'
    }
  ];

  selectedCategory: string = 'all';

  getFilteredProjects() {
    if (this.selectedCategory === 'all') {
      return this.projects;
    }
    return this.projects.filter(p => p.category === this.selectedCategory);
  }

  filterProjects(category: string) {
    this.selectedCategory = category;
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
