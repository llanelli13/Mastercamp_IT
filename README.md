# Banquise 

## Initialisation du projet

Ouvrir un terminal à la racine du projet, entrer ces commandes : 


### Frontend

```
cd Frontend
npm i 
npm install filepond vue-filepond
```

### Backend
```
cd Backend
npm i
```
---

## Lancer les outils

### Frontend
```
npm run serve
```

### Backend
```
npm start
```
Si vous encontrez une erreur sur le lancement du Backend, supprimez le dossier ```node_modules``` du dossier backend et relancer la commande ```npm i```.

---

# Scénarios pour tester les fonctionnalités du site : 

## Côté particulier (client) : 
- Faire une simulation de prêt 
- S'inscrire via le bouton **_Inscription_**
- Se connecter avec les identifiants de connexion
- Faire une **demande de prêt** via le bouton dans la barre de navigation

**Demande de prêt :**
- Remplir les informations de la page d'application
- Importer les documents demandés (format pdf)
- Retourner sur son profil

**Gérer son prêt :**

- Visionner sa demande de prêt
- Accéder via l'icône de messagerie à la messagerie liant le **client** et son **courtier** sur le prêt sélectionné
- Accéder de nouveau à l'espace de dépôts de documents
- Prévisonner l'avancement de la validation de ses documents grâce au points de couleurs, ( vert : validé, orange : en cours, rouge : refusé)


## Côté courtier : 

- S'inscrire via le bouton **_Inscription_**, à l'aide de la clé d'activation obtenue grâce à sa banque (clé pour test : 6874-1851-1210-5383)
- Se connecter avec les identifiants de connexion
-  Faire une **demande de prêt** via le bouton dans la barre de navigation (filtrée ici pour qu'elle soit adressée à d'autres courtiers)

**Gérer les dossiers de prêt lui étant attribués :**

- Accéder à l'espace d'administration dans la barre de navigation
- Visionner les demandes de prêt étant attribuées au courtier
- Accéder à l'espace de validation des documents pour chaque dossier
- Valider ou non la demande prêt une fois que tous les documents ont été traités
  



  
