

const getData = async () => {
  try {
    const res = await fetch('https://erpapi.manit.ac.in/api/login', {
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'content-type': 'application/json',
        'sec-ch-ua':
          '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        Referer: 'https://students.manit.ac.in/',
      },
      body: '{"username":"24204031211","password":"Deepu2002$"}',
      method: 'POST',
    });
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};


getData();