# Configuration DNS et Domaine LWS

## Problème Actuel

Le domaine `portfolio-ni.site` ne résout pas (NXDOMAIN), ce qui signifie qu'il n'est pas encore configuré dans le DNS.

## Vérifications à faire sur votre Panel LWS

### 1. Vérifier le nom de domaine actif

Dans votre Panel LWS :
1. Allez dans **"Domaines"** ou **"Mes Services"**
2. Cherchez quel domaine est associé à votre hébergement
3. Le domaine pourrait être :
   - `portfolio-ni.site`
   - `portoflio-ni.site` (avec faute de frappe)
   - Un sous-domaine temporaire LWS (ex: `porto2713146.lws-hosting.com`)
   - Pas encore configuré

### 2. Configuration DNS requise

Si vous avez acheté `portfolio-ni.site`, vous devez configurer :

**Enregistrement A** :
```
Type: A
Nom: @ (ou vide pour le domaine principal)
Valeur: 83.229.19.88
TTL: 3600 (ou par défaut)
```

**Enregistrement A pour www** :
```
Type: A
Nom: www
Valeur: 83.229.19.88
TTL: 3600
```

OU

**Enregistrement CNAME pour www** :
```
Type: CNAME
Nom: www
Valeur: portfolio-ni.site
TTL: 3600
```

### 3. Si le domaine n'est pas encore acheté

LWS devrait vous fournir un **domaine temporaire** du type :
- `porto2713146.lws-hosting.com`
- `porto2713146.cluster999.hosting.ovh.net`

Utilisez ce domaine temporaire en attendant d'acheter votre domaine définitif.

## Test Temporaire via IP

En attendant la configuration DNS, vous pouvez tester votre site via l'IP :

**HTTP** : http://83.229.19.88

⚠️ **Note** : Le site via IP peut afficher une page par défaut LWS si plusieurs sites sont hébergés sur le même serveur.

## Propagation DNS

Une fois le DNS configuré :
- Temps de propagation : **24 à 48 heures** maximum
- Souvent actif en : **1 à 4 heures**

Pour vérifier la propagation :
```bash
nslookup portfolio-ni.site
# Devrait retourner : 83.229.19.88
```

Ou en ligne : https://dnschecker.org

## Actions à prendre

1. **Connectez-vous à votre Panel LWS**
2. **Vérifiez dans "Mes Domaines" ou "Gestion DNS"**
3. **Notez le nom de domaine réel** (ou domaine temporaire)
4. **Configurez les enregistrements DNS** si ce n'est pas fait
5. **Communiquez-moi le vrai nom de domaine** pour que je mette à jour le script

## Informations importantes de votre compte

- **Serveur Web IPv4** : `83.229.19.88`
- **Serveur Web IPv6** : `2a00:7ee0:8:0:3:122:0:2ec`
- **Serveur Mail** : `213.255.195.56`
- **Utilisateur FTP** : `porto2713146`
- **Serveur FTP** : `83.229.19.88` (ou `ftp.votredomaine.com`)

## Une fois le domaine configuré

Mettez à jour le fichier `.env.deploy` avec le bon domaine :
```bash
FTP_HOST="ftp.votredomaine.com"  # Ou utilisez l'IP: 83.229.19.88
```

Et je mettrai à jour le script `deploy.sh` avec le bon domaine.
