$(document).ready
(
  function()
  {
        formular();
  }
);


function formular()
{
    formular.errClassName = "chyba";
    formular.mailElem = $("#email");
    
    $('#formular').submit(formular.sender);
    
    $('#pohlavi, input[name="souhlas').change(formular.sender.errManagerAuto);
    $('#email').change(function(){formular.mailChecker();});
    $('#email').on("focus", function(){formular.mailElem.removeClass(formular.errClassName)});
}


formular.sender = function()
{
    let chyby = new Array();
    let chyby_text = '';
        
    let fail = formular.mailChecker();
    if (fail)
    {
        chyby.push("fail mail code: " + fail);
        formular.mailElem.addClass(formular.errClassName);
        formular.sender.displayInfo(formular.mailElem.closest(".formElem").children(".napoveda").text());
    }
    
    let pohlavi = parseInt($('#pohlavi').val());
    if (!fail && pohlavi === 0)
    {
        fail = true;
        chyby.push("fail not selected pohlavi: " + pohlavi);
        $('#pohlavi').addClass(formular.errClassName);
        formular.sender.displayInfo($('#pohlavi').closest(".formElem").children(".napoveda").text());
    }
    
    let ano_ne = parseInt($('input[name="souhlas"]:checked').val());
    if (!fail && ano_ne != true)
    {
        fail = true;
        chyby.push("fail not selected souhlas: " + ano_ne);
        $('#souhlas').addClass(formular.errClassName);
        formular.sender.displayInfo($('#souhlas').closest(".formElem").children(".napoveda").text());
    }
    
    if (chyby.length > 0)
    {
        for (let i = 0; i < chyby.length; i ++)
            chyby_text += chyby[i];
        console.log(chyby_text);
        //$("#chyby").html(chyby_text);
        formular.sender.ajaxDbStatistic(chyby_text);
    }
    
    if (fail)
        return false;
};

formular.sender.ajaxDbStatistic = function(chyby)
{
//    alert(chyby);
};

formular.sender.errManagerAuto = function()
{
    console.log("[elem name:  " + this + "]  [class on/off:  " + formular.errClassName + "]  " + $(this).val());
    console.log($(this).closest("[id]").first());
    let elem = $(this).closest("[id]").first();
    if (!formular.errClassName)
    {
        console.log("err");
        return;
    }
    if (parseInt($(this).val()) != 0)
    {
        console.log($(this).val());
        $(elem).removeClass(formular.errClassName);
    }
    else
    {
        console.log($(this).val());
        $(elem).addClass(formular.errClassName);
    }
};


formular.mailChecker = function()
{
    let regularExp = /^.+@[^.]+\..{2,4}$/i;
    let textInput = formular.mailElem.val();
    if (textInput.length < 4)
    {
        console.log("err");
        formular.mailElem.addClass(formular.errClassName);
        return 1;
    }
    
    console.log(formular.mailElem);
    if (regularExp.test(textInput) && textInput.length > 4)
    {
        console.log("fine");
        formular.mailElem.removeClass(formular.errClassName);
    }
    else
    {
//        alert("Chyba: ne validni e-mail");
        console.log("err");
        formular.mailElem.addClass(formular.errClassName);
        return 2;
    }
    
    
    return 0;
}

formular.sender.displayInfo = function(info)
{//alert, nebo jinej spusob zobrazit
    alert(info);
}


