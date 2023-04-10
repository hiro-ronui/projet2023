var fs = require('fs');

var gestionPages = {
  url: null,
  extension: null,
  requete: null,
  reponse: null,
  queryString: null,
  objetErrore: null,

  initialisation: function (url, extension, requete, reponse, queryString) {
    this.url = url;
    this.extension = extension;
    this.requete = requete;
    this.reponse = reponse;
    this.queryString = queryString;
    this.objetErrore = {};
  },

//..............................................................................
  envoyerDonneeUtilisateur: function () {
    var donnee = this.genereDonneeAEnvoyer();
    this.reponse.writeHead(200, { 'Content-Type': donnee.contentType });
    this.reponse.write(donnee.content);
    this.reponse.end();
  },

// .............................................................................
  genereDonneeAEnvoyer : function(){
        var donnee = {};
        var dossier = "";
        //................ Partie HTML/ CSS / JAVASCRIPT ................................
        if(this.extension === ".html" || this.url.pathname==="/"){
           if(this.url.pathname=== "/"){
              this.url.pathname = "/index.html";
            }
            //................ Partie HTML ................................
            dossier = "html";
            donnee.contentType = "text/html";
            donnee.content = this.generePageHtml(dossier);
            //................ Partie CSS ................................
        } else if(this.extension === ".css"){
          dossier = "css";
            donnee.contentType = "text/css";
            donnee.content = fs.readFileSync("../" + dossier+this.url.pathname);
            //................ Partie JAVASCRIPT ................................
        } else if(this.extension === ".js"){
          dossier = "js";
            donnee.contentType = "application/javasript";
            donnee.content = fs.readFileSync("../" + dossier+this.url.pathname);
            //................ Partie RESSOURCE PNG ................................
      }   else if(this.extension === ".png"){
          dossier = "ressources/images";
            donnee.contentType = "image/png";
            donnee.content = fs.readFileSync("../" + dossier+this.url.pathname);
             //................ Partie RESSOURCE JPG ................................
    }      else if(this.extension === ".jpeg"){
      dossier = "ressources/images";
        donnee.contentType = "image/jpg";
        donnee.content = fs.readFileSync("../" + dossier+this.url.pathname);
    }
        return donnee;
    },
    
//............................................................................
    generePageHtml : function(dossier){
        var pageHTML = "";
        var headerHTML = fs.readFileSync("../" + dossier+"/header.html", "UTF-8");
        var footerHTML = fs.readFileSync("../" +dossier+"/footer.html", "UTF-8");
        var page = fs.readFileSync("../" + dossier+this.url.pathname, "UTF-8");
        pageHTML = headerHTML + page + footerHTML;

        try{
          //this.objetErrore.pseudo ="toto et un idiot";
          pageHTML = pageHTML.supplant(this.objetErrore);
        }catch(e){

        }
        return pageHTML;
    }
  }
module.exports = gestionPages;
