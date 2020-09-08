jQuery(document).ready(function() {


/*Fonte: https://stackoverflow.com/questions/51226587/how-to-limit-datalist-options-without-losing-options-value-functionality */

//Itens
   	var search = document.querySelector("#txtItens");
	var results = document.querySelector("#dtlItens");
	var templateContent = document.querySelector("#templateItens").content;
	
	if(search){
		search.addEventListener('keyup', function handler(event) {
		    while (results.children.length) results.removeChild(results.firstChild);
		    var inputVal = new RegExp(search.value.trim(), 'i');
		    var clonedOptions = templateContent.cloneNode(true);
		    var set = Array.prototype.reduce.call(clonedOptions.children, function searchFilter(frag, el) {
		        if ((inputVal.test(el.textContent) || inputVal.test(el.value)) && (search.value != el.value) && frag.children.length < 5) frag.append(el);
		        return frag;
		    }, document.createDocumentFragment());
		    results.append(set);
		});
	}




});