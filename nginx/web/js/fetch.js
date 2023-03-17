class Fetch {
  baseUrl='';

  constructor(apiUrl=''){
    this.baseUrl = apiUrl;
  }

  async get (uri, headers){
    const url = `${this.baseUrl}${uri}`
    const options = {
      method: 'GET',
      headers: {...headers},
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      redirect: 'follow'
    }
    try{
      const response = await fetch(url, options)
      return this.handleResponse(response)
    }catch (e){
      // console.log(e.message)
      throw new Error(e.message)
    }
  }

  async post(uri, headers, data = {}){
    const url = `${this.baseUrl}${uri}`
    const defaultHeaders = {'Content-Type': 'application/json'}
    const resultHeaders = Object.assign({}, defaultHeaders, headers)
    const options = {
      method: 'POST',
      headers: {...resultHeaders},
      body: data,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      redirect: 'follow'
    }
    if(resultHeaders['Content-Type'].indexOf('application/json') !== -1){
      options.body = JSON.stringify(data)
    }
    if (headers['Content-Type'] === undefined) {
      delete options.headers['Content-Type']
      options.body = data
    }
    try{
      const response = await fetch(url, options)
      return this.handleResponse(response)
    }catch (e){
      // console.log(e.message)
      throw new Error(e.message)
    }
  }

  async put(uri, headers, data = {}){
    const url = `${baseUrl}${uri}`
    const defaultHeaders = {'Content-Type': 'application/json'}
    const resultHeaders = Object.assign({}, defaultHeaders, headers)
    const options = {
      method: 'PUT',
      headers: {...resultHeaders},
      body: data,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      redirect: 'follow'
    }
    if(resultHeaders['Content-Type'].indexOf('application/json') !== -1){
      options.body = JSON.stringify(data)
    }
    if (headers['Content-Type'] === undefined) {
      delete options.headers['Content-Type']
      options.body = data
    }
    try{
      const response = await fetch(url, options)
      return this.handleResponse(response)
    }catch (e){
      // console.log(e.message)
      throw new Error(e.message)
    }
  }

  async handleResponse(response){
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1){
      const json = await response.json()
      if (!response.ok){
        throw new Error(JSON.stringify(json))
      }
      return json
    } else if (contentType && contentType.indexOf('text/plain') !== -1){
      const text = await response.text()
      if (!response.ok){
        throw new Error(text)
      }
      return text
    } else {
      return await response.blob()
    }
  }
}
