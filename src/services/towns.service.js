import LocalSource from "@/datasource/controller";
import {Ville} from './data.service'

async function getAllTownsFromLocalSource() {
    // récupération auprès de la source locale
    return LocalSource.getAllTowns()
}

/*
async function getAllTownsFromAPI() {
  // a écrire quand l'API est fonctionnelle
  return {}
}
*/

async function getAllTowns() {
    let response = null;
    try {
        // changer la méthode appelée quand cette fonctionnalité l'API est prête
        response = await getAllTownsFromLocalSource()
        // test si la requÃªte a réussi et si oui, conversion du format des données.
        // NB : pour la liste des villes, il ne devrait jamais y avoir d'erreur. Au pire,
        // on obtient un tableau vide.
        if (response.error === 0) {
            // les données de la réponse sont un tableau contenant les villes
            let villes = []
            response.data.forEach(t => villes.push(Ville.fromAPI(t)))
            response.data = villes
        }
        // s'il y avait une erreur, le champ response.error > 0 et response.data contient le message d'erreur.
        // on renvoie donc directement response.
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur réseau
    catch(err) {
        response = {error: 1, data: 'erreur réseau, impossible de récupérer la liste des villes'  }
    }
    return response
}

export default {
    getAllTowns
}