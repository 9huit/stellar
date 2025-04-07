import axios from 'axios'
import {GetProductById} from "./ProductController.js"
const API_URL = 'http://localhost/dolibarr-21.0.0/htdocs/api/index.php/orders'
const API_KEY = 'SE60lpxlIvsXZT2nx34O95R3mfZp4GD3'


export async function GetOrdersById(id) {
    try {
      const api = API_URL+'?thirdparty_ids=' + id
      console.log(api)
      const response = await axios.get(api, {
        headers: {
          'DOLAPIKEY': API_KEY
        }
      })
      return response.data
    } catch (error) {
      console.error('[ProductController] Erreur API Dolibarr :', error)
      throw error
    }
}

export async function GetValidatedOrdersById(id) {
    try {
      const api = API_URL+'?thirdparty_ids=' + id
      console.log(api)
      const response = await axios.get(api, {
        headers: {
          'DOLAPIKEY': API_KEY
        }
      })
      return response.data
    } catch (error) {
      console.error('[ProductController] Erreur API Dolibarr :', error)
      throw error
    }
}

// Fonction pour ajouter une ligne (à garder séparée)
export async function creerCommandeAvecLignes(produits) {
  const user = JSON.parse(sessionStorage.getItem('user'));
  if (!user) throw new Error("Utilisateur non authentifié");

  // Format strictement conforme à l'API Dolibarr
  const commandeData = {
    socid: parseInt(user.id), // Doit être un entier
    date: Math.floor(Date.now() / 1000),
    type: 0, // 0 = Commande client
    status: 1, // Toujours créer en brouillon d'abord
    lines: produits.map(produit => ({
      fk_product: produit.id, // Obligatoire - entier
      qty: produit.quantite || '1',
      subprice: produit.price || '0', // Prix unitaire HT
      // Champs optionnels mais recommandés :
      desc: String(produit.description || '').substring(0, 255),
      tva_tx: produit.tva ||'0', // Taux TVA numérique
      product_type: '0' // 0=produit, 1=service
    }))
  };

  // try {
    // 1. Création de la commande
    const response = await axios.post(API_URL, commandeData, {
      headers: {
        'DOLAPIKEY': API_KEY,
        // 'Content-Type': 'application/json',
        // 'Accept': 'application/json'
      },
      transformResponse: [data => data] // Important pour Dolibarr
    });

    // 2. Validation (optionnelle)
    // await new Promise(resolve => setTimeout(resolve, 1000)); // Pause courte
    // localStorage.removeItem('panier');
    // return commandeId;

  // } catch (error) {
  //   // Extraction du message d'erreur Dolibarr
  //   let errorMessage = "Erreur inconnue";
  //   if (error.response?.data?.error) {
  //     errorMessage = error.response.data.error.message || 
  //                  JSON.stringify(error.response.data.error);
  //   } else {
  //     errorMessage = error.message;
  //   }

  //   console.error('Erreur API Dolibarr:', {
  //     status: error.response?.status,
  //     error: errorMessage,
  //     sentData: commandeData
  //   });

  //   throw new Error(`Échec création commande: ${errorMessage}`);
  // }

}// Configuration de base (à mettre dans un fichier config.js)


const API_CONFIG = {
  BASE_URL: 'http://localhost/dolibarr-21.0.0/htdocs/api/index.php',
  API_KEY: 'SE60lpxlIvsXZT2nx34O95R3mfZp4GD3'
};

// Client HTTP Axios (version standalone)
const httpClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'DOLAPIKEY': API_CONFIG.API_KEY,
    'Content-Type': 'application/json'
  }
});

// Helper pour calculer le taux de TVA
function calculateVatRate(priceHt, priceTtc) {
  if (!priceHt || priceHt <= 0) return 20.0; // Valeur par défaut
  return ((priceTtc - priceHt) / priceHt) * 100;
}

// Helper pour parser les erreurs Dolibarr
function parseDolibarrError(error) {
  if (error.response?.data?.error) {
    return error.response.data.error.message || 'Erreur API Dolibarr';
  }
  return error.message || 'Erreur inconnue';
}

/**
 * Crée une commande à partir du panier localStorage
 * @param {Array} cart - Tableau des produits du panier
 * @returns {Promise<Object>} - Résultat de la commande
 */
export async function createOrderFromLocalStorage(cart) {
  try {
    const products = await Promise.all(
      cart.map(async item => {
        const product = await GetProductById(item.id);
        if (!product) throw new Error(`Produit introuvable : ${item.id}`);
        return {
          id: item.id,  // ID du produit
          label: product.label, // Libellé du produit
          description: product.description, // Description du produit
          price: product.price, // Prix TTC du produit
          tva_tx: product.tva_tx, // Taux de TVA du produit
          quantite: item.quantite
        };
      })
    );
    // 1. Récupération des infos client
    const clientInfo = JSON.parse(sessionStorage.getItem('user'));
    if (!clientInfo?.id) {
      throw new Error('Client non connecté ou informations manquantes');
    }

    // 2. Validation du panier
    if (!cart || cart.length === 0) {
      throw new Error('Le panier est vide');
    }

    // 3. Préparation des lignes de commande
    const orderLines = products.map(item => ({
      fk_product: item.id, // Obligatoire - entier
      qty: item.quantite || '1',
      subprice: item.price || '0', // Prix unitaire HT
      // Champs optionnels mais recommandés :
      desc: String(item.description || '').substring(0, 255),
      tva_tx: item.tva_tx ||'0', // Taux TVA numérique
      product_type: '0' // 0=item, 1=service
    }));

    // 4. Construction des données de commande
    const orderData = {
      socid: parseInt(clientInfo.id),
      date: Math.floor(Date.now() / 1000), // Timestamp Unix
      type: 0, // 0 = Commande client
      status: 1, // 0 = Brouillon, 1 = Validée
      lines: orderLines,
      note_public: `Commande via site web - Client: ${clientInfo.email || 'inconnu'}`
    };

    // 5. Création de la commande
    const createResponse = await httpClient.post('/orders', orderData);
    const orderId = createResponse.data;

    if (!orderId) {
      throw new Error('Échec de la création de commande');
    }

    // 6. Validation de la commande
    await httpClient.post(`/orders/${orderId}/validate`);

    // 7. Récupération des infos complètes
    const { data: orderInfo } = await httpClient.get(`/orders/${orderId}`);

    // 8. Retour des résultats
    return {
      success: true,
      orderId: orderId,
      orderRef: orderInfo.ref || orderId.toString(),
      clientInfo: clientInfo,
      cart: cart
    };

  } catch (error) {
    console.error('Erreur création commande:', {
      error: error.response?.data || error.message,
      stack: error.stack
    });

    return {
      success: false,
      message: parseDolibarrError(error),
      error: error.response?.data || error.message
    };
  }
}