(function()
{
  var NowMoment = moment("<%= articles.createdAt %>").format('LLL');

  var eDisplayMoment = document.getElementById('displayMoment');
  eDisplayMoment.innerHTML = NowMoment;  
})();