var fs = require("fs");

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
        var donnee = this.genereDonneeAEnvoyer();
        this.reponse.writeHead(200,{'Content-Type' : donnee.contentType});
        this.reponse.write(donnee.content);
        this.reponse.end();
    },

    genereDonneeAEnvoyer : function(){
        var donnee = {};
        var dossier = "";
        
        if(this.extension === ".html" || this.url.pathname==="/"){
           if(this.url.pathname=== "/"){
              this.url.pathname = "/index.html";
            }
            dossier = "html";
            donnee.contentType = "text/html";
            donnee.content = this.generePageHtml(dossier);
        }
        return donnee;
    },
    generePageHtml : function(dossier){
        var pageHTML = "";
        var headerHTML = fs.readFileSync(dossier+"/header.html", "UTF-8");
        var footerHTML = fs.readFileSync(dossier+"/footer.html", "UTF-8");
        var page = ffs.readFileSync(dossier+this.url.pathname, "UTF-8");
        pageHTML = headerHTML + page + footerHTML;
        return pageHTML;
    }

    }
module.exports = gestionPages;