// src/controllers/ProductController.js
import axios from 'axios'

const API_URL = 'http://localhost/dolibarr-21.0.0/htdocs/api/index.php/products'
const API_KEY = 'SE60lpxlIvsXZT2nx34O95R3mfZp4GD3'

export async function GetProducts() {
  try {
    const response = await axios.get(API_URL, {
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
