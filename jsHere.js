/*
https://github.com/usfuprog/itstep2020/
https://github.com/usfuprog/itstep2020/tree/20210303_task_006
*/


$(document).ready
(
  function()
  {
      document.cookie = "username=John Doe; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/";
      eShop();
      checkedAll();
//      menu();
  }
);

/*
 * Inicializue property eShop, zavola renderKosik, ctrl cookie.
 * Nastavi funkci na click, funkce bud zapise novou polozku v obsah_kosiku, 
 * nebo prepise v pripade, ze existuje. 
 * 
 * @returns {undefined}
 */
function eShop()
{
	eShop.ctrlCookie();
        console.log(eShop.obsah_kosiku);
        eShop.obsah_kosiku = eShop.obsah_kosiku || [];
        console.log(eShop.obsah_kosiku);
        eShop.renderKosik();
        
	$('.do-kosiku').click(function()
        {
                    let cena = $(this).attr('cena');
                    let id_vyrobku = $(this).attr('id-vyrobku');
                    let nazev = $(this).parent('td').siblings('.nazev').text();
                    console.log(cena, id_vyrobku, nazev);
                    let pocet = $(this).parent('td').siblings('td').children('input[type="number"]').val();
                    
                    let duplicita = eShop.get_pos_by_inner_val(id_vyrobku);
                    if (duplicita >= 0)
                    {
                        //cena = obsah_kosiku[duplicita][1] + (cena*1);
                        pocet = eShop.obsah_kosiku[duplicita][2] + (pocet*1);
                        eShop.obsah_kosiku[duplicita] = [id_vyrobku, (cena*1), (pocet*1), nazev];
                        console.log(duplicita);
                    }else
                    {
                        let jedno_zbozi = [id_vyrobku, (cena*1), (pocet*1), nazev];
                        eShop.obsah_kosiku.push(jedno_zbozi);
                    }
                    
                    console.log(eShop.obsah_kosiku);
                    eShop.renderKosik();
        });
        
};

/*
 * Zobrazi obsah_kosiku v html, zapise cookie. 
 * Vychazi z 4 hodnot v datovem modelu.
 * 
 * @returns {undefined}
 */
eShop.renderKosik = function()
{//[0] - id, [1] - cena, [2] - mnozstvi, [3] - nazev
    let obsah_kosiku_html = '', cookie_polozka = '[';
    let celkova_cena = 0, i = 0;
    
    for (; i < eShop.obsah_kosiku.length; i ++)
    {
        obsah_kosiku_html += '<p id-produktu='+eShop.obsah_kosiku[i][0]+'>ID: '+eShop.obsah_kosiku[i][0]+
        ', cena: '+eShop.obsah_kosiku[i][1]*eShop.obsah_kosiku[i][2]+ ', Nazev: '+
        eShop.obsah_kosiku[i][3]+', Mnozstvi:'+eShop.obsah_kosiku[i][2]+'<span class="odebrat"> X </span>'+'</p>';
        celkova_cena += eShop.obsah_kosiku[i][1]*eShop.obsah_kosiku[i][2];
//        cookie_polozka += "|" + eShop.obsah_kosiku[i][0]+"/"+eShop.obsah_kosiku[i][2];
        cookie_polozka += '{"id":' + eShop.obsah_kosiku[i][0] + ', "ks":' + eShop.obsah_kosiku[i][2]+"}";
        if (i < eShop.obsah_kosiku.length - 1)cookie_polozka += ', ';
    }
    cookie_polozka += ']';
    
    $('#kosik').html(obsah_kosiku_html + '<p>Cena celkem: '+
    celkova_cena+'</p>');
    
    document.cookie = 'kosik=' + cookie_polozka;
    console.log(cookie_polozka);
    eShop.odebrat();
};


/*
 * Nastavi posluchac na click ktery odstani prvek z DOM. 
 * Pote zavola renderKosik, ktery upravi html i cookie podle aktualniho stavu.
 * 
 * @returns {undefined}
 */
eShop.odebrat = function()
{
    $('.odebrat').click(function(){
        //alert('X');
        let hodnota = $(this).parent('p').attr('id-produktu')*1;
        if (hodnota*1 !== hodnota)return;
        
        let index = eShop.get_pos_by_inner_val(hodnota);
        //index = -1;
        if (index >= 0)
        {
            eShop.obsah_kosiku.splice(index, 1);
            $(this).parent("tr").remove();
            eShop.renderKosik();
        }
        //eShop.renderKosik();
    });
};


/*
 * Hleda ve vnitrnich [], hodnotu "val" na pozici "pos".
 * Vychazi z toho, ze obsah_kosiku je [], v kterem jsou dalsi [].
 * [0 = [1, 2, 3 ...], 1 = [1, 2, 3, ...], 2 = [1, 2, 3, ...], ...]
 * 
 * @param {string} val
 * @param {integer} pos
 * @param {boolean} first    if "true", vrati idx prvni shody, jinak posledni.
 * Pri volani bez parametru "pos" i "first", hleda "val" na prvnim prvku 
 * vnitrniho pole i vrati prvni schodu. 
 * 
 * @returns {integer} pozici, kde v obsah_kosiku je [], ktere ma na 
 * pozici "pos" value "val", nebo -1. 
 */
eShop.get_pos_by_inner_val = function(val, pos, first)
{
    console.log("~~~~~~~~~~~~~~~~~~~~~", val);
    if (val*1 != val || Array.isArray(val))
        return;
    if (!pos || pos < 0)
        pos = 0;
    
    if (first === undefined || first === null)
        first = true;
    //    console.log(pos, first);
    
    let i = 0, res = -1;
    for (; i < eShop.obsah_kosiku.length; i ++)
    {
        if (eShop.obsah_kosiku[i][pos] == val)
        {
//            console.log(i);
            res = i;
            if (first)break;
        }
    }
    
    return res;
};

/*
 * @param {string} cookName
 * @param {string} innerSepar
 * 
 * @returns {boolean} true pokud existuje cookie se jmenem cookName, 
 * a ma value jinou nez "", jinak false. 
 */
eShop.ctrlCookie = function(cookName, innerSepar)
{
    eShop.ctrlCookie.cookName = cookName || 'kosik';
    eShop.ctrlCookie.innerSepar = innerSepar || '|';
    console.log(eShop.ctrlCookie.cookName, "   ", eShop.ctrlCookie.innerSepar);
    
    let res = document.cookie;
    console.log(!!res, "  ", res, "  ", Array.isArray(res));
    
    //filter1
    res = res && (function(){
        /* 
         * Rozdeli string v cookie na [0], [1], ... 
         * rozdelovac je '; '.
         * Return pole. 
         */
        return res.split('; ');
    })();
    console.log(!!res);
    
    //filter2
    res = res && (function(strSearch){
        /*
         * Return [0] = "jmeno cookie", [1] = "value". Rozdeli po "=". 
         * Pokud ne najde cookie se uvedenym jmenem, return null. 
         */
        let one_cookie = null;
        let find = null;
        
        let i = 0;
        for (; i < res.length; i ++)
        {
            one_cookie = res[i].split('=');
            console.log(one_cookie[0], "   ", one_cookie[0].trim());
            if (one_cookie[0].trim() === strSearch)find = one_cookie;
        }
        return find;
    })(eShop.ctrlCookie.cookName);
    console.log(!!res, "  ", res, "  ", Array.isArray(res));
    
    //filter3
    res = res && (function(cookieText, strSearch){
        /*
         * Prvni param je value nalezeneho cookie, druhej je rozdelovac.
         * Pokud text cookie je "", return null, jinak pole s hodnotama mezi rozdelovacem.
         */
        console.log(cookieText);
        
        if (!cookieText)return null;
        return cookieText.split(strSearch);
    })(res[1].trim(), eShop.ctrlCookie.innerSepar);
    console.log(!!res, "  ", res, "  ", Array.isArray(res));
    
    //filter4
    res = res && (function(){
        /*
         * Rozdeli po znaku '/'. Return values v poli
         * ve formatu
         * input array:  [3/4, 5/2/4, '', 3/3]
         * output array: [0 = [3, 4], 1 = [5, 2, 4], 2 = [3, 3]]
         */
        console.log(res);
        let find = [];
        let iter = null;
        
        let i = 0;
        for (; i < res.length; i ++)
        {
            if (!res[i])continue;
            iter = res[i].split('/');
            find.push(iter);
        }
        return find;
    })();
    console.log(!!res, "  ", res, "  ", Array.isArray(res));
    console.log(JSON.parse(res));
    
    res = res && eShop.ctrlCookie.setKosikByCookie(JSON.parse(res));
    console.log(!!res, "  ", res, "  ", Array.isArray(res));
    
    return !!res;
};

/*
 * Pole, ktere obsahuje data z cookie, doplni o polozky z DOM, a priradi k eShop.obsah_kosiku. 
 * @returns {boolean} true pokud hodnoty z cookie byli pouzity k naplneni obsah_kosiku, jinak false. 
 */
eShop.ctrlCookie.setKosikByCookie = function(arr)
{
    let iter = null, addTo = [];
    for (let i in arr)
    {
        let iter = arr[i];
        if (iter.id && iter.ks)
        {
//            console.log(iter);
            $("button.do-kosiku").each(function(idx, val, thisJq){
                thisJq = $(this);
//                console.log(iter.id);
//                console.log(idx, val, addTo, thisJq);
                if (thisJq.attr("id-vyrobku") == iter.id)
                {
                    console.log("[=]");
                    addTo.push([iter.id, thisJq.attr('cena')*1, iter.ks, thisJq.parent('td').siblings('.nazev').text()]);
                }
            });
            
            console.log(iter);
        }
        
        console.log(addTo);
        eShop.obsah_kosiku = addTo;
    }
    
    return addTo && addTo.length ? true : false;
};


/*
 * ne patri k eShop
 */
function menu()
{
    console.log("menu");
    $("menu > ul > li").hover(function(){
        console.log("click");
        $(this).find("ul").css("display", "block");
    });
    
}

/*
 * ne patri k eShop
 */
function checkedAll()
{
    $("#checker").change(function(){
        console.log($(this).parents("#policka").children("[type='checkbox']").length, $(this).prop("checked"));
        
        $(this).parents("#policka").children("[type='checkbox']").prop("checked", $(this).prop("checked"));
    });
}
