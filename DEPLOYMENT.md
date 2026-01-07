# Guide de Déploiement Automatique

Ce guide explique comment déployer automatiquement votre portfolio sur LWS.

## Configuration initiale (à faire une seule fois)

### 1. Installer lftp

**macOS:**
```bash
brew install lftp
```

**Linux:**
```bash
sudo apt-get install lftp
```

### 2. Configurer vos identifiants FTP

1. Copiez le fichier d'exemple :
```bash
cp .env.deploy.example .env.deploy
```

2. Éditez `.env.deploy` avec vos vrais identifiants LWS :
```bash
FTP_HOST="ftp.portfolio-ni.site"
FTP_USER="votre-username-lws"
FTP_PASSWORD="votre-mot-de-passe-lws"
FTP_REMOTE_PATH="/home"
```

**⚠️ Important:** Le fichier `.env.deploy` est dans `.gitignore` et ne sera jamais committé (sécurité).

### 3. Récupérer vos identifiants FTP sur LWS

1. Connectez-vous à votre **Panel LWS**
2. Allez dans **Gestionnaire de fichiers** ou **FTP/SFTP**
3. Notez :
   - **Hôte FTP** : généralement `ftp.votredomaine.com` ou une IP
   - **Utilisateur** : votre username FTP
   - **Mot de passe** : votre mot de passe FTP

---

## Utilisation

### Déploiement rapide (build + upload)

```bash
npm run deploy
```

Ou simplement :
```bash
./deploy.sh
```

### Ce que fait le script :

1. ✅ Build du projet Angular (mode production)
2. ✅ Vérifie que le build a réussi
3. ✅ Upload automatique vers LWS via FTP
4. ✅ Synchronise uniquement les fichiers modifiés
5. ✅ Supprime les anciens fichiers sur le serveur

---

## Workflow de développement

### 1. Développement local

```bash
npm start
```
Ouvrez http://localhost:4200

### 2. Modification du code

Faites vos modifications dans `src/`

### 3. Test local

Vérifiez que tout fonctionne en local

### 4. Déploiement

```bash
npm run deploy
```

### 5. Vérification

Ouvrez https://portfolio-ni.site après quelques secondes

---

## Commandes disponibles

| Commande | Description |
|----------|-------------|
| `npm start` | Lance le serveur de développement local |
| `npm run build` | Build de production (sans déployer) |
| `npm run deploy` | Build + Upload vers LWS |
| `./deploy.sh` | Script de déploiement direct |

---

## Dépannage

### Erreur "lftp: command not found"

Installez lftp :
```bash
brew install lftp  # macOS
```

### Erreur "Login incorrect"

Vérifiez vos identifiants dans `.env.deploy`

### Le site ne se met pas à jour

1. Videz le cache de votre navigateur (Cmd+Shift+R)
2. Attendez 1-2 minutes pour la propagation
3. Vérifiez les fichiers sur le Panel LWS

### Permission denied

```bash
chmod +x deploy.sh
```

---

## Sécurité

- ✅ `.env.deploy` est ignoré par Git
- ✅ Ne commitez JAMAIS vos identifiants FTP
- ✅ Utilisez des mots de passe forts
- ✅ Le fichier `.env.deploy.example` sert de template

---

## Améliorations futures

### GitHub Actions (CI/CD automatique)

Pour un déploiement automatique à chaque push sur GitHub :

1. Push sur GitHub → Build automatique → Déploiement
2. Aucune action manuelle requise
3. Historique des déploiements

Voulez-vous que je configure GitHub Actions ?

---

## Support

Pour toute question ou problème :
- Email : contact@certix.com
- Vérifiez [README.md](README.md) pour plus d'infos

---

**Dernière mise à jour :** 2025-12-09
