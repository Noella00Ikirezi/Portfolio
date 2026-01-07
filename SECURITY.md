# Documentation de Sécurité - Portfolio Website

## Vue d'ensemble
Ce document récapitule toutes les mesures de sécurité implémentées dans l'application portfolio pour protéger contre les vulnérabilités courantes et garantir la conformité avec les réglementations en vigueur.

---

## 1. Protection contre les injections SQL

### Mesures implémentées
- **ORM avec requêtes paramétrées** : Utilisation exclusive de requêtes paramétrées pour toutes les interactions avec la base de données
- **Validation des entrées** : Toutes les données utilisateur sont validées et sanitizées avant traitement
- **Principe du moindre privilège** : Les comptes de base de données ont des permissions minimales requises
- **Échappement automatique** : L'ORM échappe automatiquement tous les caractères spéciaux

### Exemple de protection
```typescript
// Utilisation de requêtes paramétrées (sécurisé)
const user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);

// JAMAIS de concaténation directe (vulnérable)
// const user = await db.query(`SELECT * FROM users WHERE id = ${userId}`);
```

---

## 2. Protection contre les attaques XSS (Cross-Site Scripting)

### Mesures implémentées
- **Sanitization automatique Angular** : Angular échappe automatiquement les données dans les templates
- **Content Security Policy (CSP)** : En-têtes CSP stricts configurés
- **Validation côté serveur** : Double validation des entrées utilisateur
- **DomSanitizer** : Utilisation du service Angular pour les contenus dynamiques

### Configuration CSP
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://api.certix.com;
```

---

## 3. Protection DDoS (Distributed Denial of Service)

### Mesures implémentées
- **Rate Limiting** : Limitation du nombre de requêtes par IP
  - 100 requêtes par 15 minutes pour les endpoints publics
  - 1000 requêtes par heure pour les utilisateurs authentifiés
- **Throttling** : Ralentissement progressif pour les clients abusifs
- **IP Whitelisting/Blacklisting** : Gestion dynamique des IPs suspectes
- **Cache CDN** : Utilisation d'un CDN pour distribuer la charge
- **Monitoring** : Surveillance en temps réel des patterns de trafic anormaux

### Configuration Rate Limiting
```typescript
@Injectable()
export class RateLimitInterceptor implements NestInterceptor {
  private readonly limit = 100;
  private readonly windowMs = 15 * 60 * 1000; // 15 minutes
}
```

---

## 4. Gestion des Cookies

### Configuration des cookies sécurisés
- **HttpOnly** : Les cookies ne sont pas accessibles via JavaScript
- **Secure** : Transmission uniquement via HTTPS
- **SameSite** : Protection contre les attaques CSRF
- **Expiration** : Durée de vie limitée des sessions

### Exemple de configuration
```typescript
res.cookie('sessionId', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 3600000, // 1 heure
  path: '/',
  domain: '.certix.com'
});
```

### Types de cookies utilisés
1. **Session Cookie** : Authentification utilisateur (1h)
2. **Remember Me** : Connexion persistante (30 jours, optionnel)
3. **CSRF Token** : Protection anti-CSRF
4. **Analytics** : Cookies de mesure d'audience (anonymisés)

---

## 5. Protection CSRF (Cross-Site Request Forgery)

### Mesures implémentées
- **Token CSRF** : Génération et validation de tokens uniques par session
- **SameSite Cookies** : Protection au niveau des cookies
- **Double Submit Pattern** : Validation côté client et serveur
- **Vérification de l'origine** : Contrôle des en-têtes Origin et Referer

---

## 6. Authentification et Autorisation

### JWT (JSON Web Tokens)
- **Algorithme** : HS256 avec clé secrète forte
- **Expiration** : Access token (15 min), Refresh token (7 jours)
- **Stockage** : HttpOnly cookies pour les tokens
- **Rotation** : Renouvellement automatique avant expiration

### Politique de mots de passe
- Longueur minimale : 12 caractères
- Complexité : majuscules, minuscules, chiffres, caractères spéciaux
- Hashing : bcrypt avec salt (cost factor 12)
- Historique : Interdiction de réutiliser les 5 derniers mots de passe

---

## 7. HTTPS et chiffrement

### Configuration SSL/TLS
- **Protocole** : TLS 1.3 minimum
- **Certificat** : Let's Encrypt avec renouvellement automatique
- **HSTS** : Strict-Transport-Security activé
- **Redirection automatique** : HTTP → HTTPS

### En-têtes de sécurité
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

---

## 8. Conformité légale

### RGPD (Règlement Général sur la Protection des Données)

#### Principes appliqués
- **Minimisation des données** : Collecte uniquement des données nécessaires
- **Droit à l'oubli** : Suppression complète des données sur demande
- **Portabilité** : Export des données personnelles en JSON
- **Consentement** : Opt-in explicite pour les cookies non essentiels
- **Transparence** : Politique de confidentialité claire et accessible

#### Données collectées
- Nom, prénom, email (compte utilisateur)
- Adresse IP (logs de sécurité, conservés 90 jours)
- Cookies techniques (session, CSRF)
- Analytics (anonymisés, sans IP complète)

#### Conservation des données
- Comptes actifs : Durée indéterminée (tant que le compte existe)
- Comptes inactifs : Suppression après 3 ans sans connexion
- Logs de sécurité : 90 jours
- Logs d'accès : 30 jours

### CGU (Conditions Générales d'Utilisation)

- Version : 1.0 (dernière mise à jour : 2024)
- Accessible à : [/legal/cgu](https://certix.com/legal/cgu)
- Acceptation requise lors de l'inscription
- Notification des modifications par email

### CGA (Conditions Générales d'Achat)

- Non applicable (site portfolio sans e-commerce)

### DPA (Data Processing Agreement)

#### Traitement des données
- **Responsable de traitement** : Certix / Nicolas Rezinko
- **Finalité** : Gestion des comptes utilisateurs, sécurité du site
- **Base légale** : Consentement et intérêt légitime
- **Sous-traitants** : Hébergement (OVH, conforme RGPD)

#### Transferts internationaux
- **Localisation des serveurs** : Union Européenne uniquement
- **Garanties** : Clauses contractuelles types pour tout transfert hors UE

#### Sécurité des données
- Chiffrement en transit (TLS 1.3) et au repos (AES-256)
- Accès restreint aux données personnelles
- Journalisation des accès administrateur
- Sauvegarde quotidienne chiffrée (rétention 30 jours)

---

## 9. Gestion des vulnérabilités

### Mises à jour
- **Dépendances** : Vérification hebdomadaire via npm audit
- **Framework Angular** : Mise à jour dans les 30 jours après release
- **Serveur** : Patches de sécurité automatiques

### Scanning de sécurité
- **SAST** : Analyse statique du code (SonarQube)
- **DAST** : Tests de pénétration trimestriels
- **Dependency scanning** : Snyk intégré en CI/CD

### Processus de divulgation
- Email de sécurité : security@certix.com
- Délai de réponse : 48h maximum
- Correction critique : 7 jours maximum

---

## 10. Monitoring et alertes

### Surveillance
- **Logs centralisés** : ELK Stack (Elasticsearch, Logstash, Kibana)
- **Métriques** : Prometheus + Grafana
- **Alertes** : Notification automatique des incidents de sécurité

### Événements surveillés
- Tentatives de connexion échouées (>5 en 10 min)
- Requêtes suspectes (payloads malveillants détectés)
- Pics de trafic anormaux
- Erreurs 500 répétées
- Accès à des ressources interdites

---

## 11. Backup et disaster recovery

### Stratégie de sauvegarde
- **Fréquence** : Quotidienne (automatique à 3h00 UTC)
- **Rétention** : 30 jours (daily), 12 mois (monthly)
- **Chiffrement** : AES-256
- **Stockage** : Multi-zones géographiques
- **Tests de restauration** : Mensuels

### Plan de reprise d'activité (PRA)
- **RTO** (Recovery Time Objective) : 4 heures
- **RPO** (Recovery Point Objective) : 24 heures
- **Serveur de secours** : Bascule automatique en cas de panne

---

## 12. Checklist de sécurité

- [x] Protection SQL Injection
- [x] Protection XSS
- [x] Protection CSRF
- [x] Protection DDoS / Rate Limiting
- [x] HTTPS obligatoire (TLS 1.3)
- [x] Cookies sécurisés (HttpOnly, Secure, SameSite)
- [x] En-têtes de sécurité (CSP, HSTS, X-Frame-Options, etc.)
- [x] Authentification JWT sécurisée
- [x] Hashage des mots de passe (bcrypt)
- [x] Conformité RGPD
- [x] CGU / Politique de confidentialité
- [x] DPA (Data Processing Agreement)
- [x] Logs de sécurité
- [x] Monitoring et alertes
- [x] Sauvegardes automatiques chiffrées
- [x] Scanning de vulnérabilités (npm audit, Snyk)
- [x] Plan de reprise d'activité

---

## Contact sécurité

Pour toute question ou signalement de vulnérabilité :
- Email : security@certix.com
- Bug Bounty : Non (projet personnel)
- Divulgation responsable : Oui, coordonnée

---

**Dernière mise à jour** : Décembre 2025
**Version** : 1.0
**Responsable sécurité** : Noëlla Ikirezi