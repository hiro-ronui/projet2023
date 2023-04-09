var http = require("http"); // et deja ajoute par defaut
var url = require("url"); // pareille pour url
var fs = require("fs"); // pour utilise la gestion des fichiers
require("remedial"); // sert a remplie no template
var querystring = require("querystring");
var gestionPages = require("./gerePageJavascriptServeur\gestionPages.js") 


// la fonction parametreServeur prend 2 elements en parametre 
var parametreServeur = function(requete,reponse){
    
    var monUrl = url.parse(requete.url);
    var urlQueryString = querystring.parse(monUrl.query);
    var extension = monUrl.pathname.substring(monUrl.pathname.indexOf("."),monUrl.pathname.length);
    gestionPages.initialisation(monUrl, extension, requete, reponse, urlQueryString);    
    
    if(gestionPages.url.pathname !== "/favicon.ico"){
        gestionPages.envoyerDonneeUtilisateur();
    }
    
}

//creation du serveur sur le port 8282 avec une fonction d'une demande par un utilisateur
var serveur = http.createServer(parametreServeur);
serveur.listen(8282);