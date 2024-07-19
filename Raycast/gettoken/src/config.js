// config.js
const environments = [
    // 'dev',
    'itg',
    'uat',
    'pro'
  ];
  
  const encryptedPass = {
    'dev': 'OTk5OTk5OQ==',
    'itg': 'MTgwNjE3',
    'uat': 'MTgwNjE3',
    'pro': 'OTY4MzYx'
  };
  
  const encryptedFetchRUL = {
    'dev': 'aHR0cHM6Ly9iYnJhdW4ubW92aXRlY2guY246MTAxMDAv',
    'uat': 'aHR0cHM6Ly90b3dlci1xYXMuYmJyYXVuY2hpbmEuY24v',
    'itg': 'aHR0cHM6Ly90b3dlci1pdGcuYmJyYXVuY2hpbmEuY24v',
    'pro': 'aHR0cHM6Ly93d3cuYmJyYXVudG93ZXIuY29tLw=='
  };
  
  const encryptedTels = {
    '10': 'MTg4NjIwODU5OTk=', 
    '11': 'MTU4Nzg3MDE0NzE=', 
    '12': 'MTc3MjEyMDg4MjI=', 
    '13': 'MTM5MDE4OTQ1Njc=', 
    '14': 'TVRnMU1ESXdNREE1TWpNPQ', // 
    '20': 'MTgwNTkwNTk4ODI=', 
    '21': 'MTk5NDYyMDQ5ODY=', 
    '22': 'MTU5NjAwMDcwOTE=', 
    '23': 'MTU4MjE5OTg4OTg=', 
    '1': 'MTMxNjIwNTU3Mjk=', 
    '2': 'MTUwMDAxNTY1MzU=', 
    '3': 'MTc3MTc4OTgyOTg=', // 
    '0': 'MTg5OTU3MzE2OTc=' 
  };
  const encryptedBbrName = 'YmJyYXVu' //
  
  const encryptedAuthorization = 'ZDJWaU9uZGxZZz09'; //
  const encryptedConfigVerifyUrl = 'YXV0aC9tb2JpbGUvdG9rZW4vc21zP21vYmlsZT1TTVNAe3t9fSZncmFudF90eXBlPW1vYmlsZQ=='; // 
  
  export { environments, encryptedPass, encryptedFetchRUL, encryptedTels, encryptedAuthorization, encryptedBbrName, encryptedConfigVerifyUrl };
  