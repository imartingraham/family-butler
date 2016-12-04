require('dotenv').config();
var Alexa = require('alexa-sdk');
var WunderlistSDK = require('wunderlist');

var WunderlistApi = new WunderlistSDK({
  'accessToken': process.env.WUNDERLIST_ACCESS_TOKEN,
  'clientID': process.env.WUNDERLIST_CLIENT_ID
});

function getTitlesFromItems(items){
  return items.map(function(item){
    return item.title.toLowerCase();
  });
}

function getShoppingListItems(){
  return WunderlistApi.http.tasks.forList(process.env.WUNDERLIST_LIST_ID, false);
}

var handlers = {
  'CheckShoppingListIntent': function(){
    var item = this.event.request.intent.slots.item.value.toLowerCase();
    var that = this;
    getShoppingListItems().done(function(items){
      var titles = getTitlesFromItems(items);
      var text = '';
      if(titles.indexOf(item) > -1){
        text = item + ' is in your shopping list';
      }else{
        text = item + ' is not in your shopping list';
      }
      that.emit(':tell', text);
    });
  },
  'ListShoppingListIntent': function(){
    var that = this;
    getShoppingListItems().done(function(items){
      var titles = getTitlesFromItems(items);
      var count = titles.length;
      var is = count == 0 || count > 1 ? 'are' : 'is';
      var s = count == 0 || count > 1 ? 's' : '';
      var shoppingItemList = titles;
      var shoppingListStr = '';
      var responseStr = 'There ' + is + ' ' + count + ' item' + s + ' in your shopping list. ';

      if(count > 1){
        var lastItem = shoppingItemList.pop();
        responseStr += shoppingItemList.join(', ') + ' and ' + lastItem;
      }else if(count == 1){
        responseStr += titles.join(', ');
      }
      that.emit(':tell', responseStr);
    });
  },
  'WhatAreThoseIntent': function(){
    this.emit(':tell', 'Deez Nuts! Gotty');
  }
};

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};
