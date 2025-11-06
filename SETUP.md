# Configuration et Démarrage

## Prérequis
1. **Backend Spring Boot** doit être démarré sur `http://localhost:8080`
2. Node.js installé

## Étapes de démarrage

### 1. Démarrer le backend
Assurez-vous que votre API Spring Boot est en cours d'exécution sur le port 8080 avec l'endpoint `/banque/comptes`

### 2. Installer les dépendances (si ce n'est pas déjà fait)
```bash
npm install
```

### 3. Démarrer l'application
```bash
npm start
```

L'application devrait s'ouvrir automatiquement dans votre navigateur à l'adresse `http://localhost:3000`

## Résolution des problèmes

### Erreur: "Erreur lors de l'ajout du compte"
- Vérifiez que le backend Spring Boot est bien démarré
- Vérifiez que l'URL dans `src/config.js` correspond à votre backend (`http://localhost:8080/banque`)
- Vérifiez les logs du backend pour voir s'il y a des erreurs CORS ou de validation

### Le backend refuse les connexions
Assurez-vous que votre backend Spring Boot a la configuration CORS appropriée:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }
}
```

## Fonctionnalités
- ✅ Ajouter des comptes (Courant ou Épargne)
- ✅ Afficher la liste des comptes
- ✅ Calcul automatique du solde total
- ✅ Design moderne et responsive

