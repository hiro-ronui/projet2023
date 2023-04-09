var gestionPages = {
url : null,
extension : null,
requete : null,
reponse : null,
queryString : null,

initialisation : function(url, extension, requete, reponse, queryString){
    this.url = url;
    this.extension = extension;
    this.requete = requete;
    this.reponse = reponse;
    this.queryString = queryString;
    },

    envoyerDonneeUtilisateur : function(){
        this.reponse.writeHead(200,{'Content-Type' : "text/html"});
        this.reponse.write("<h1>Test<h1>");
        this.reponse.end();
    }

    }
module.exports = gestionPages;