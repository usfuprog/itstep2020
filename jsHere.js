
$(document).ready
(
  function()
  {
	  eShop();
  }
);

/*
 * 
 * @returns {undefined}
 */
function eShop()
{
	eShop.obsah_kosiku = [];
        
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
 * 
 */
eShop.renderKosik = function()
{
    let obsah_kosiku_html = '';
    let celkova_cena = 0;
    let i = 0;
    for (; i < eShop.obsah_kosiku.length; i ++)
    {
        obsah_kosiku_html += '<p id-produktu='+eShop.obsah_kosiku[i][0]+'>ID: '+eShop.obsah_kosiku[i][0]+
        ', cena: '+eShop.obsah_kosiku[i][1]*eShop.obsah_kosiku[i][2]+ ', Nazev: '+
        eShop.obsah_kosiku[i][3]+', Mnozstvi:'+eShop.obsah_kosiku[i][2]+'<span class="odebrat"> X </span>'+'</p>';
        celkova_cena += eShop.obsah_kosiku[i][1]*eShop.obsah_kosiku[i][2];
    }
    $('#kosik').html(obsah_kosiku_html + '<p>Cena celkem: '+
    celkova_cena+'</p>');
    
    eShop.renderKosik.odebrat();
};

/*
 * 
 */
eShop.renderKosik.odebrat = function()
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
 * 
 */
eShop.get_pos_by_inner_val = function(val, pos, first)
{
    console.log("~~~~~~~~~~~~~~~~~~~~~", val);
    
    //Pri pouziti !=  nebude return, pokud val = [] bez prvku, a 
    //pri pouziti !==   bude return i v pripade val = "321", cisla jako string, 
    //pri pouzivani js funkci pro cisla, muze byt nekompatabilni s MAC.
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
        //ctrl [i][pos] is string
        if (eShop.obsah_kosiku[i][pos].indexOf(val) !== -1)
        {
//            console.log(i);
            res = i;
            if (first)break;
        }
    }
    
    return res;
};
