const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const fetchPro = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "42274e3460msh065b8cbee1b9981p105911jsnae6d113ce9e3",
        "X-RapidAPI-Host": "aerisweather1.p.rapidapi.com",
      },
    });
    const res = await Promise.race([fetchPro, timeout(20)]);
    const data = await res.json();

    if (!res.ok) throw new Error("API problem");

    return data;
  } catch (err) {
    throw err;
  }
};
