import axios from 'axios';

const API_URL = 'http://localhost/dolibarr-21.0.0/htdocs/api/index.php/invoices';
const API_KEY = 'SE60lpxlIvsXZT2nx34O95R3mfZp4GD3';

export async function getFacture() {
  try {
    // 1. Construction plus sûre de l'URL
    // const filters = encodeURIComponent(`(t.note_public:like:%${ref})`);
    // const url = `${API_URL}?sqlfilters=${filters}`;

    // 2. Requête avec timeout et gestion d'erreur améliorée
    const response = await axios.get(API_URL, {
      headers: {
        'DOLAPIKEY': API_KEY,
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 secondes max
    });

    // 3. Validation de la réponse
    if (!response.data) {
      throw new Error('Réponse vide de l\'API');
    }

    return response.data;

  } catch (error) {
    console.error('[InvoiceController] Erreur:', {
      ref: ref,
      status: error.response?.status,
      error: error.response?.data || error.message
    });
    
    throw new Error(`Échec récupération facture: ${error.response?.data?.error || error.message}`);
  }
}