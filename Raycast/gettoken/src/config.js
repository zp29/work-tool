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
    '10': 'MTg4NjIwODU5OTk=', // 蒋煊
    '11': 'MTU4Nzg3MDE0NzE=', // 施白云
    '12': 'MTc3MjEyMDg4MjI=', // 高帅奇
    '13': 'MTM5MDE4OTQ1Njc=', // 张孜谦
    '20': 'MTgwNTkwNTk4ODI=', // 陈银花
    '21': 'MTk5NDYyMDQ5ODY=', // 𡈼超凯
    '22': 'MTU5NjAwMDcwOTE=', // 梁瑷
    '23': 'MTU4MjE5OTg4OTg=', // 徐磊
    '1': 'MTMxNjIwNTU3Mjk=', // Grant
    '2': 'MTUwMDAxNTY1MzU=', // t
    '3': 'MTc3MTc4OTgyOTg=', // K W
    '0': 'MTg5OTU3MzE2OTc=' // m
  };
  const encryptedBbrName = 'YmJyYXVu' //
  
  const encryptedAuthorization = 'ZDJWaU9uZGxZZz09'; // d2ViOndlYg==
  const encryptedConfigVerifyUrl = 'YXV0aC9tb2JpbGUvdG9rZW4vc21zP21vYmlsZT1TTVNAe3t9fSZncmFudF90eXBlPW1vYmlsZQ=='; // auth/mobile/token/sms?mobile=SMS@{{}}&grant_type=mobile
  
  export { environments, encryptedPass, encryptedFetchRUL, encryptedTels, encryptedAuthorization, encryptedBbrName, encryptedConfigVerifyUrl };
  