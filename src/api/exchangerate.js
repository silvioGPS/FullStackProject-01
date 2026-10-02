import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.exchangerate.host',
    timeout: 10000,
})

export async function fetchExchangeRates(base = 'USD', currencies = '') {
    try {
        const { data } = await api.get('/live', {
            params: {
                access_key: import.meta.env.VITE_API_KEY_EXCHANGERATES,
                source: base,
                currencies,
            },
        })

        if (data?.success !== true) {
            const msg = data?.error?.info || 'Resposta inválida da API Exchangerate.host'
throw new Error(msg)
        }
        return data
    } catch (error){
        if(error.response) {
            const status = error.response.status
            if(status === 401) throw new Error('Chave de API invalida ou não autorizada.')
            if(status === 429) throw new Error('Limite de requisições excedido (429).')
            throw new Error(`Erro ${status} ao consultar cotações.`)
        }
        if (error.request) {
            throw new Error('Não foi possível conectar á API Exchangerate.host')
        }
        throw error
    }
    
}

