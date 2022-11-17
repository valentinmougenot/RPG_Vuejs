import LocalSource from "@/datasource/controller";
import {Perso} from './data.service';

async function getAllCharacsFromLocalSource() {
    return LocalSource.getAllCharacs();
}

async function getAllCharacs() {
    let response = null;
    try {
        response = await getAllCharacsFromLocalSource()
        if (response.error === 0) {
            let persos = []
            response.data.forEach(t => persos.push(Perso.fromAPI(t)))
            response.data = persos
        }
    }
    catch(err) {
        response = {error: 1, data: 'erreur réseau, impossible de récupérer la liste des personnages'  }
    }
    return response;
}

export default {
    getAllCharacs
}