/*         popupWin
        
        <link rel="stylesheet" type="text/css" href="popupWin.css">
        
        <div id="popup_win">
            <div class="">
                <div></div>
                <button type="button" class="zavrit">Zavrit</button>
                <input type="submit" id="sendOrder" />
            </div>
        </div>
 */


(function(addTo)
{
    if (addTo === undefined)return;
    $(document).ready(function(){addTo.popupWin();});
    console.log(addTo);
    let cnt_go;
    
    addTo.popupWin = function(buttonStart, buttonClose, prefix, darkBack, elem, winWidth)
    {
//        addTo = (addTo === undefined) ? this : addTo;
//        addTo.popupWin.close();
        console.log(buttonStart, winWidth, addTo);
//        cnt_go = addTo.popupWin.buttonStart || addTo.popupWin.buttonClose || 
//                addTo.popupWin.prefix || addTo.popupWin.darkBack || 
//                addTo.popupWin.elem || addTo.popupWin.winWidth;
        console.log(cnt_go);
        if (cnt_go !== undefined)
        {
            if (typeof elem === 'string')
            {
                console.log(elem);
//                $(addTo.popupWin.elem).css(elem);
                
                elem === ' ' ? 
                $(addTo.popupWin.elem).prop('class', '') : $(addTo.popupWin.elem).addClass(elem);
                
                console.log(elem);
            }
            
            if (typeof prefix === 'string')
            {
                prefix === ' ' ? 
                addTo.popupWin.prefix = "Vase objednavka: <br><br><br>" : addTo.popupWin.prefix = prefix;
            }
            
        }
        
        if (cnt_go === undefined)cnt_go = 1; else 
        {
            cnt_go ++;
            return;
        }
        
        addTo.popupWin.buttonStart = buttonStart || "#pokladna";
        addTo.popupWin.buttonClose = buttonClose || ".zavrit";
        addTo.popupWin.prefix = prefix || "Vase objednavka: <br><br><br>";
        addTo.popupWin.darkBack = darkBack || "#cerne_pozadi";
        addTo.popupWin.elem = elem || "#popup_win>div";
        addTo.popupWin.winWidth = winWidth;
        console.log(addTo.popupWin.winWidth, addTo);
        $(addTo.popupWin.buttonClose).click(addTo.popupWin.close);
        $(window).resize(addTo.popupWin.sender.displayInfo.winPosChange);
        
        
        $(addTo.popupWin.buttonStart).on("click", addTo.popupWin.starter);
//        console.log($(addTo.popupWin.buttonStart).css());
//        return this;
    };
    
    addTo.popupWin.starter = function()
    {
        setTimeout(function(){$(addTo.popupWin.buttonClose).focus();}, 200);
        
        if (addTo.showInfo == "")
        {
            addTo.popupWin.state(1);
        }
        else
            addTo.popupWin.state(0);
        
        addTo.popupWin.sender.displayInfo(addTo.popupWin.prefix, addTo.showInfo);//outer
        
//        addTo.popupWin();
//        setTimeout(function(){addTo.popupWin();}, 1000);
    };
    
    addTo.popupWin.state = function(val)
    {
        console.log(val);
        switch (val)
        {
            case 0:
                addTo.popupWin(null, null, " ", null, " ", null);
                break;
            case 1:
                addTo.popupWin(null, null, 'Kosik je prazdnej', null, "alt_style1", null);
                console.log(typeof addTo.popupWin, addTo.prototype);
                break;
        };
    };
    
    addTo.popupWin.close = function()
    {
        $(addTo.popupWin.darkBack).removeAttr("style");
        $(addTo.popupWin.elem).removeAttr("style");
        console.log('close', addTo.popupWin.elem);
//        alert();
        return false;
    };
    
    addTo.popupWin.sender = function()
    {
        
    };
    
    addTo.popupWin.sender.displayInfo = function(prefix, info)
    {//alert, nebo jinej spusob zobrazit
    //    alert(info);
//        if (!info)return 1;
        let elem_win = $(addTo.popupWin.elem);
        elem_win.css("visibility", "hidden");
        elem_win.css("display", "block");
        $(addTo.popupWin.elem + ' > div').html(prefix + info);
        $(addTo.popupWin.darkBack).css('display', 'block');
        if (addTo.popupWin.winWidth)
        {
            addTo.popupWin.winWidth += '';
            addTo.popupWin.winWidth += addTo.popupWin.winWidth.indexOf('px') < 0 ? 'px' : '';
            
            console.log(addTo.popupWin.winWidth);
            $(addTo.popupWin.elem).width(addTo.popupWin.winWidth);
        }
//        addTo.popupWin.sender.displayInfo.winPosChange();
        setTimeout(addTo.popupWin.sender.displayInfo.winPosChange, 99);
        setTimeout(function(){elem_win.css("visibility", "visible");}, 101);
        
        return 0;
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


/*

jquery-3.4.0.js:5481 Uncaught TypeError: saved.shift is not a function
    at HTMLButtonElement.handler (jquery-3.4.0.js:5481)
    at HTMLButtonElement.dispatch (jquery-3.4.0.js:5233)
    at HTMLButtonElement.elemData.handle (jquery-3.4.0.js:5040)

 */
