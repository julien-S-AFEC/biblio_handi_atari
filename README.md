# biblio_handi_atari

# Documentation API pour Développeur Frontend

---

## 1. Base URL API

```url
https://biblio-handi-atari-jq4j.onrender.com

```
---

## 2. Endpoints disponibles

| Méthode | URL                    | Description                         | Auth requis |
|---------|------------------------|-----------------------------------|-------------|
| POST    | /user/register         | Inscription utilisateur            | Non         |
| POST    | /user/login            | Connexion utilisateur              | Non         |
| POST    | /user/changeRole       | Changer le role utilisateur        | Oui (admin) |
| GET     | /documents             | Liste toutes les documents         | Non         |
| POST    | /documents             | Création documents                 | Oui (JWT)   |

---
#  Guide des Endpoints API – Pour Développeur Frontend

Base URL :
En local : http://localhost:5000/api
En production (Render) :https://biblio-handi-atari-jq4j.onrender.com

---

##  Authentification

###  Inscription
- **Méthode :** `POST`
- **URL :** `/api/user/register`
- **Champs formulaire requis :**
  - `name` (texte)
  - `email` (texte)
  - `password` (texte)
  - `confirmPassword` (texte)
- **Body requis**
{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "password": "MotDePasse123",
  "confirmPassword": "MotDePasse123"
}



---

###  Connexion
- **Méthode :** `POST`
- **URL :** `/api/user/login`
- **Champs formulaire requis :**
  - `email` (texte)
  - `password` (texte)
- **Réponse :** Renvoie un `token` (à stocker et utiliser)

{
  "email": "jean@gmail.com",
  "password": "MotDePasse123"
}

### Changer le role de l'utilsateur
-**Méthode post:** `POST`
- **URL :** `/api/user/changeRole`
- **Champs formulaire requis :**
  - `email` (texte)
  - `newRole` (texte)
- **Auth :**  Oui (admin)
- **Body requis**
{
  "email": "utilisateur@gmail.com",
  "newRole": "admin"
}



---

##  Documents

###  Lister les documents
- **Méthode :** `GET`
- **URL :** `/api/documents`
- **Auth :**  Non

---

###  Créer une document
- **Méthode :** `POST`
- **URL :** `/api/documents`
- **Champs formulaire requis :**
  - `title` (texte)
  - `description` (texte)
  - `theme` (texte)
  - `cloudinary_url` (texte)
- **Auth :**  Oui (JWT)

---

## Remarques importantes

- Le **token JWT** est requis pour les routes protégées (comme `POST /documents`).  
  Il doit être envoyé dans le header :  
  `Authorization: Bearer <token>`

- Si tu envoies un fichier (ex : image ou PDF), utilise un formulaire `form-data`  
  avec le champ nommé `cloudinary_url`.

- Toutes les réponses de l’API sont au format **JSON**.


## Questions pratiques 

Comment vais-je accéder à mon API ? Est-ce que je peux tester quelque chose facilement ?

http://localhost:5000/api
https://biblio-handi-atari-jq4j.onrender.com/api
Tu peux tester facilement :
- L’inscription (POST /user/register)
- La connexion (POST /user/login)
- L’affichage de documents (GET /documents)
- L’ajout de documents (authentifié, POST /documents)


Est-ce que mes utilisateurs devront créer un compte pour utiliser la bibliothèque ?
Pas obligatoirement pour consulter la bibliothèque.
Mais pour :
Ajouter, Modifier, Supprimer un document, seul l'administrateur peut le faire.
Les utilisateurs doivent être connectés (authentifiés par JWT).


Est-ce que votre système empêche des personnes non autorisées d’ajouter ou supprimer des livres ?
Oui, la sécurité est assurée par :
JWT (JSON Web Token) : seuls les utilisateurs connectés peuvent effectuer certaines actions.
Middleware d’authentification pour protéger les routes sensibles.
Vérification du rôle : seuls les admins peuvent modifier ou supprimer.

Que se passe-t-il si un utilisateur malvoyant ou en situation de handicap veut naviguer dans la bibliothèque ?



En cas de problème ou d’évolution, est-ce que je pourrai modifier facilement les informations (livres, catégories) ?
Oui, le backend est conçu pour être modulaire et évolutif
