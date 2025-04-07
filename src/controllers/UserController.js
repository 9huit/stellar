import axios from 'axios'
import { useRouter } from 'vue-router'
const API_URL = 'http://localhost/dolibarr-21.0.0/htdocs/api/index.php/thirdparties'
const API_KEY = 'SE60lpxlIvsXZT2nx34O95R3mfZp4GD3'

export function logoutUser() {
    const router = useRouter()

    // Supprimer les données utilisateur
    sessionStorage.removeItem('user')
    window.location.href = '/'
    localStorage.removeItem('panier')
    // Rediriger vers la page de connexion (ou autre)
    router.push('/') // remplace '/login' si tu veux aller ailleurs
  }

export async function LoginAPI(username, email) {
  try {
    const sqlfilters = encodeURIComponent(
      `(t.nom:like:'${username}') and (t.email:like:'${email}')`
    )

    const api = `${API_URL}?sortfield=t.rowid&sortorder=ASC&limit=1&sqlfilters=${sqlfilters}`

    const response = await axios.get(api, {
      headers: {
        'DOLAPIKEY': API_KEY
      }
    })

    return response.data
  } catch (error) {
    console.error('[ProductController] Erreur API Dolibarr :', error)
    // alert(error)
    throw error
  }
}

export function loginUser(nom, email, emit) {
    return LoginAPI(nom, email)
      .then((user) => {
        if (user && user.length > 0) {
          sessionStorage.setItem('user', JSON.stringify(user[0]))
          emit('close')
          window.location.reload()
          return { success: true, user: user[0], msg: 'Connexion réussie' }
        } else {
        //   alert('Utilisateur non trouvé')
          return { success: false, msg: 'Utilisateur non trouvé' }
        }
      })
      .catch((e) => {
        console.error("Erreur de connexion :", e)
        // alert("Erreur de connexion. Veuillez réessayer.")
        return { success: false, error: e, msg: 'Utilisateur introuvable' }
      })
  }

  export function generateClientCode() {
    const now = new Date()
    const yearMonth = now.getFullYear().toString().slice(-2) + String(now.getMonth() + 1).padStart(2, '0') // 2504
    const randomNumber = Math.floor(10000 + Math.random() * 90000) // entre 10000 et 99999
    return `CU${yearMonth}-${randomNumber}`
  }
  
  export async function SignupAPI( nom, alias, email, phone ) {
    try {
      const code_client = generateClientCode()
  
      const response = await axios.post(API_URL, {
        name: nom,
        name_alias: alias,
        email: email,
        client: 1,
        status: 1,
        code_client: code_client,
        phone: phone
      }, {
        headers: {
          'DOLAPIKEY': API_KEY,
          'Content-Type': 'application/json'
        }
      })
      return response.data
    } catch (error) {
      console.error('[SignupController] Erreur lors de l\'inscription :', error)
      throw error

    }
  }
  


  

  
