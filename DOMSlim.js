(function(){

  HTMLElement.prototype.into = function (elem) {
    const element = typeof elem === 'string' ? document.querySelector(elem) : elem 
    element.appendChild(this)
  }

  const DOMSlim = {
    createEl (elem, attributes) {

      const creator = (_elem, _attributes) => {
        const el = document.createElement(_elem)

        if(_attributes !== undefined && typeof _attributes === "object") {
          for(k in _attributes) {
            const key = k
            if(key === "text"){
              el.appendChild(document.createTextNode(_attributes[key]))
            }else if(key === "child"){
              if(_attributes[key] instanceof Array === true) {
                _attributes[key].forEach(e => {
                  el.appendChild(e)
                })
              }else{
                el.appendChild(_attributes[key])
              }
            }else if(key === "data"){
              for(data_key in _attributes.data){
                el.dataset[data_key] = _attributes.data[data_key]
              }
            }else if(key === "style"){
              for(style in _attributes[key]){
                el.style[style] = _attributes[key][style]
              }
            }else if(key === "class"){
              el.className = _attributes[key]
            }else{
              el[key] = _attributes[key]
            }
          }
        }

        return el
      }

      if (elem instanceof Array === true && elem.length) {
        let elements = elem.map(e => creator(e.name, e.attributes))
        return elements
      } else {
        return creator(elem, attributes)
      }
    }
  }

  if(typeof exports === 'object' && typeof module === 'object') {
    module.exports = DOMSlim
  } else if(typeof define === 'function' && define.amd) {
    define(function () { return DOMSlim })
  } else if (typeof window !== 'undefined') {
    window.DOMSlim = DOMSlim
  }

}())
