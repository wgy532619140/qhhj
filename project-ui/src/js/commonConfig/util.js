define([], function(require, factory) {
  var init = {
    //
    formate:function(url) {
      console.log(url, 'url')
      return JSON.parse('{"' + url.replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    },

  }
  return init;
});