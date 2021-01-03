const inputElement = document.querySelector("#searchTerm");
const ResultDisplay = document.querySelector("#searchResult")
inputElement.select();

function stripHTML(e){
let div = document.createElement('div')
div.textContent= e
return div.textContent
}

function highlight(str, searchTerm, className="highlight"){
  const hl = `<span class="${className}">${searchTerm}</span>`;
  return str.replace(new RegExp(searchTerm, 'gi'), hl);
}
const generateResult= (results, searchTerm) => {
  return results
  .map(result => {
    const title = highlight(stripHTML(result.title), searchTerm)
    const snippet =   highlight(stripHTML(result.snippet), searchTerm)
   
    return `<article>
    <a href="https://en.wikipedia.org/?curid=${result.pageid}">
    <h2>${title}</h2>
</a>
<div class="summary">${snippet}...</div>
    </article>`
  }
  )
  .join('')
}




function search(searchTerm) {
  ResultDisplay.innerHTML= ""
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info|extracts&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${searchTerm}`;
 
    fetch(url)
    .then(response => response.json())
    .then(response => {
      
     const e = generateResult(response.query.search, searchTerm)
  ResultDisplay.innerHTML= e
    }
    )
    .catch( err => console.log(err))
  }
  // else{
  //   ResultDisplay.style.display = "none"
  // }

  
  const debounce = (fn, delay=50) => {
    let timeoutId;
  
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args);
        }, delay);
    };
  };
  const getsearch = debounce(search)



inputElement.addEventListener('input', function (e){
  getsearch(e.target.value)
})
