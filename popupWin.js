/*         popupWin
        
        <link rel="stylesheet" type="text/css" href="popupWin.css">
        
        <div id="popup_win">
            <div></div>
            <button class="zavrit">Zavrit</button>
        </div>
        <div id="cerne_pozadi" class="zavrit"></div>
 */


(function(addTo)
{
    if (addTo === undefined)return;
    $(document).ready(function(){addTo.popupWin();});
    
    
    addTo.popupWin = function(buttonStart, buttonClose, prefix, darkBack, elem)
    {
        addTo.popupWin.buttonStart = buttonStart || "#pokladna";
        addTo.popupWin.buttonClose = buttonClose || ".zavrit";
        addTo.popupWin.prefix = prefix || "Vase objednavka: <br><br><br>";
        addTo.popupWin.darkBack = darkBack || "#cerne_pozadi";
        addTo.popupWin.elem = elem || "#popup_win";
        
        $(addTo.popupWin.buttonClose).click(addTo.popupWin.close);
        $(window).resize(addTo.popupWin.sender.displayInfo.winPosChange);
        
        $(addTo.popupWin.buttonStart).on("click", addTo.popupWin.starter);
        
    };
    
    addTo.popupWin.starter = function()
    {
        setTimeout(function(){$(addTo.popupWin.buttonClose).focus();}, 200);
        addTo.popupWin.sender.displayInfo(addTo.popupWin.prefix, addTo.showInfo == false ? "" : addTo.showInfo);//outer
    };
    
    addTo.popupWin.close = function()
    {
        $(addTo.popupWin.darkBack).removeAttr("style");
        $(addTo.popupWin.elem).removeAttr("style");
        
        return false;
    };
    
    addTo.popupWin.sender = function()
    {
        
    };
    
    addTo.popupWin.sender.displayInfo = function(prefix, info)
    {//alert, nebo jinej spusob zobrazit
    //    alert(info);
        if (!info)return;
        let elem_win = $(addTo.popupWin.elem);
        elem_win.css("visibility", "hidden");
        elem_win.css("display", "block");
        $(addTo.popupWin.elem + ' > div').html(prefix + info);
        $(addTo.popupWin.darkBack).css('display', 'block');
//        addTo.popupWin.sender.displayInfo.winPosChange();
        setTimeout(addTo.popupWin.sender.displayInfo.winPosChange, 99);
        setTimeout(function(){elem_win.css("visibility", "visible");}, 101);
        
        //okamzitej start funkce spusobuje problemy s width, ktery nestihne vzniknut po "display: none"
    };
    
    addTo.popupWin.sender.displayInfo.winPosChange = function()
    {
        let elem_win = $(addTo.popupWin.elem);
        console.log(elem_win.css("display"), elem_win.css("width"));
//        if (elem_win.css("display") == "none")return;
        let sirka_okna = window.innerWidth;
        let sirka_elem = elem_win.css("width");
        sirka_elem = ""+(sirka_elem ? sirka_elem : "300").replace("px", "")*1;
        console.log(sirka_elem, window.innerWidth, sirka_elem * 1 == sirka_elem);
        
        let posun_levo = (sirka_okna - sirka_elem)/2;
        elem_win.css({'left': posun_levo, 'top': 100});
        console.log(posun_levo);
    };
}
)(window.eShop);

