'use strict';
/* global $ utilsModule */

var daysModule = (function(){

  var days = [],
      currentDay;

  // jQuery selections

  var $dayButtons, $dayTitle, $addButton, $removeButton;
  
  $(function(){
    $dayButtons = $('.day-buttons');
    $dayTitle = $('#day-title > span');
    $addButton = $('#day-add');
    $removeButton = $('#day-title > button.remove');
  });

  // Day class and setup

  function Day (data) {
    console.log("adding day",data)
    // this.hotel = (data.hotel || null);
    this.hotel = createDayAttraction(data.hotel, 'hotel'); //(data.hotel || null);
    this.restaurants = (data.restaurants || []);
    this.activities = (data.activities || []);
    this.number = days.push(this); //? 
    this.buildButton().drawButton();
    console.log("testing if THIS is populated",this)
  }

  function createDayAttraction(data,type) {
    var anAttraction = attractionsModule.create(data);
    anAttraction.type = type;
    return anAttraction;
  }

  Day.prototype.buildButton = function() {
    console.log("building button");
    this.$button = $('<button class="btn btn-circle day-btn"></button>')
      .text(this.number);
    var self = this;
    this.$button.on('click', function(){
      this.blur(); // removes focus box from buttons
      self.switchTo();
    });
    return this;
  };

  Day.prototype.drawButton = function() {
    console.log('drawing button')
    this.$button.appendTo($dayButtons);
    return this;
  };

  Day.prototype.hideButton = function() {
    this.$button.detach();
    return this;
  };

  // day switching

  Day.prototype.switchTo = function () {
    console.log("current day in switchto is",currentDay)
    currentDay.hide();
    currentDay = this;
    currentDay.draw();
  };

  Day.prototype.draw = function () {
    // day UI
    this.$button.addClass('current-day');
    $dayTitle.text('Day ' + this.number);
    // attractions UI
    function draw (attraction) { attraction.draw(); }
    if (this.hotel) draw(this.hotel);
    this.restaurants.forEach(draw);
    this.activities.forEach(draw);
  };

  Day.prototype.hide = function () {
    // day UI
    this.$button.removeClass('current-day');
    $dayTitle.text('Day not Loaded');
    // attractions UI
    function hide (attraction) { attraction.hide(); }
    if (this.hotel) hide(this.hotel);
    this.restaurants.forEach(hide);
    this.activities.forEach(hide);
  };

  // jQuery event binding

  $(function(){
    $addButton.on('click', addDay);
    $removeButton.on('click', deleteCurrentDay);
  });

  function addDay (data) {
    if (this && this.blur) this.blur(); // removes focus box from buttons

    // for(var i = 0; i < data.length; i++) {
      // var newDay = new Day(data[i]);
    // }

    var newDay = new Day(data);

    if (days.length === 1)  {
      console.log("setting current day");
      console.log("new day is ", newDay);
      currentDay = newDay;
    }
    newDay.switchTo();
  }

  function deleteCurrentDay () {
    if (days.length < 2 || !currentDay) return;
    var index = days.indexOf(currentDay),
      previousDay = days.splice(index, 1)[0],
      newCurrent = days[index] || days[index - 1];
    days.forEach(function (day, idx) {
      day.number = idx + 1;
      day.$button.text(day.number);
    });
    newCurrent.switchTo();
    previousDay.hideButton();
  }

  // globally accessible module methods

  var methods = {

    load: function(){
      // $(addDay);

      $.ajax({
          method: 'GET',
          url: '/api/days',
          success: function (responseData) {

              console.log("AJAX success", responseData)

              // addDay(responseData)

              if (responseData.length > 0) {
                console.log("****** responsedata length is",responseData.length);
                for (var i= 0; i < responseData.length; i++){
                console.log("********* ADDING A DAY",i)
                  addDay(responseData[i]);
                }
              } else {
                addDay({});
              }
          },
          error: function (errorObj) {
              console.error(errorObj)
          }
      });
    },

    addAttraction: function(attraction){
      // adding to the day object
      switch (attraction.type) {
        case 'hotel':
          if (currentDay.hotel) currentDay.hotel.delete(); // check attraction prototype for corret method
          currentDay.hotel = attraction; break;
        case 'restaurant':
          utilsModule.pushUnique(currentDay.restaurants, attraction); break;
        case 'activity':
          utilsModule.pushUnique(currentDay.activities, attraction); break;
        default: console.error('bad type:', attraction);
      }
      // activating UI
      attraction.draw();
    },

    removeAttraction: function (attraction) {
      // removing from the day object
      switch (attraction.type) {
        case 'hotel':
          currentDay.hotel = null; break;
        case 'restaurant':
          utilsModule.remove(currentDay.restaurants, attraction); break;
        case 'activity':
          utilsModule.remove(currentDay.activities, attraction); break;
        default: console.error('bad type:', attraction);
      }
      // deactivating UI
      attraction.hide();
    }

  };

  return methods;

}());
