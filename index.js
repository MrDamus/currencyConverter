function webServiceTask(url, onSuccess, onError) {
  fetch(url)
  .then( response => {
      if (response.status !== 200) {
        console.log('Status Code: ' + response.status);
        return;
      }
      response.json().then(data => {
        onSuccess(data)
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
    onError()
  });
} 



function setOptions(selectors) {
  webServiceTask('https://api.fixer.io/latest',
  data => {
    Array.of(selectors).forEach(selector =>
      {
        Object.keys(data.rates).forEach(rate => {
          selector.append(`<option value=${rate} >${rate}</option>`)
        })
      }
      )
  })
}

window.onload = () => {
  let selectors = $('select');
  setOptions(selectors)
  let inputs = $('input');
  inputs[0].onchange = () => {
    let inputCurrencyType = selectors[0].value;
    let outputCurrencyType = selectors[1].value;
    webServiceTask(`https://api.fixer.io/latest?base=${inputCurrencyType}&symbols=${outputCurrencyType}`,
    data => {
      inputs[1].value = inputs[0].value * data.rates[`${outputCurrencyType}`]; 
    })
  }
}

