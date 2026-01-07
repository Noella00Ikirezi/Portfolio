#!/bin/bash

# Script de déploiement automatique vers LWS
# Usage: ./deploy.sh

set -e

echo "🚀 Début du déploiement..."

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Build du projet
echo -e "${BLUE}📦 Build du projet Angular...${NC}"
npm run build

# Vérifier que le build existe
if [ ! -d "dist/web" ]; then
    echo -e "${RED}❌ Erreur: Le dossier dist/web n'existe pas${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Build terminé avec succès${NC}"

# 2. Chargement des credentials FTP
if [ ! -f ".env.deploy" ]; then
    echo -e "${RED}❌ Fichier .env.deploy introuvable${NC}"
    echo -e "${BLUE}Création du fichier .env.deploy...${NC}"
    cat > .env.deploy << 'EOL'
# Configuration FTP pour LWS
FTP_HOST="ftp.portfolio-ni.site"
FTP_USER="votre-username-ftp"
FTP_PASSWORD="votre-mot-de-passe"
FTP_REMOTE_PATH="/home"
EOL
    echo -e "${BLUE}⚠️  Veuillez éditer .env.deploy avec vos identifiants FTP${NC}"
    exit 1
fi

source .env.deploy

# 3. Upload via FTP
echo -e "${BLUE}📤 Upload vers LWS via FTP...${NC}"

# Vérifier si lftp est installé
if ! command -v lftp &> /dev/null; then
    echo -e "${RED}❌ lftp n'est pas installé${NC}"
    echo -e "${BLUE}Installation: brew install lftp (macOS) ou apt-get install lftp (Linux)${NC}"
    exit 1
fi

# Upload avec lftp
# Créer un fichier de config temporaire (les variables sont déjà chargées via source)
cat > .lftp_deploy << 'EOFCONFIG'
set ftp:ssl-allow no
set ssl:verify-certificate no
open -u porto2713146,xxsEGH!bM4_A$Ce 83.229.19.88
lcd dist/web
cd /
rm -f default_index.html
mirror --reverse --delete --verbose --exclude-glob .DS_Store --exclude-glob default_index.html . .
bye
EOFCONFIG

# Exécuter le déploiement
lftp -f .lftp_deploy

# Nettoyer le fichier temporaire
rm .lftp_deploy

echo -e "${GREEN}✅ Déploiement terminé avec succès!${NC}"
echo -e "${BLUE}🌐 Votre site sera disponible sur https://portfolio-ni.site${NC}"
