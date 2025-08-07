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
