"use strict";

var app = app || {};

app.calendar = {
    
    //Constants
    CALENDAR_CONST: Object.freeze({
        WIDTH: 100,
        HEIGHT: 60
    }),
    
    //Days/hours - currently unused
    /*DAYS: Object.freeze({
        MON: 0,
        TUES: 1,
        WED: 2,
        THURS: 3,
        FRI: 4
    }),*/
    ICONS: {
        WORK: undefined,
        LIFE: undefined,
        MISC: undefined
    },
    
    //calendar
    //calendar container (not sure whether to handle this here or in calendar.js)
    //true - this spot in the calendar is occupied
    //false - this spot in the calendar is vacent
    CalendarObj: function(){
        this.array =
        [[false,false,false,false,false],
         [false,false,false,false,false],
         [false,false,false,false,false],
         [false,false,false,false,false],
         [false,false,false,false,false],
         [false,false,false,false,false]];
        this.appointments = [];
        this.selectedItem = -1;
        this.itemsScheduled = 0;
    },
    
    
    ///Stores data on a calendar item in the game
    ///Parameters:
    ///   name - the name displayed for the item
    ///   x - the x-position of the top left corner of the item
    ///   y - the y-position of the top left corner of the item
    ///   length - the lengh of the item in hours
    ///   color - the color used to draw the item
    ///   success - an object that details information on the effect on a successful scheduleing at the end of the round. This object should have the following form:
    ///      {
    ///         action: a function that changes some values
    ///         string: a description of this function's effect
    ///      }
    ///   failure - an object that details information on the effect when the event is not placed in the schedule at the end of the round. (See the layout of the success parameter.)
    
    CalendarItem: function(name,x,y,length,icon,success,failure){
        this.name= name;
        this.location = {
            x: x,
            y: y
        };
        this.length = length;
        this.color = "Blue";
        this.icon = icon;
        this.success = success;
        this.failure = failure;
        this.beingDragged = false;
        this.scheduled = false;
        //--OR--//
        //this.timeslot = undefined;
        
        ///Draws this calendar item.
        this.draw = function(ctx){
            ctx.save();
            
            //draw rect
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = this.color;
            
            ctx.fillRect(this.location.x,this.location.y,app.calendar.CALENDAR_CONST.WIDTH,this.length*app.calendar.CALENDAR_CONST.HEIGHT); 
            
            ctx.globalAlpha = 1.0;
            ctx.drawImage(this.icon,this.location.x+app.game.GUI.PADDING,this.location.y+app.game.GUI.PADDING,32,32);
            
            //draw text
            ctx.font = app.game.GUI.FONT.CALENDAR;
            ctx.fillStyle = app.game.GUI.FONT_COLOR;
            ctx.fillText(name,this.location.x+app.game.GUI.PADDING,this.location.y+app.game.GUI.PADDING+app.game.GUI.BASE_FONT_SIZE*3.4);
            if(this.success){
                ctx.fillText("S: " + this.success.string,this.location.x+app.game.GUI.PADDING,this.location.y+app.game.GUI.PADDING+app.game.GUI.BASE_FONT_SIZE*4.5);
            }
            if(this.failure){
                ctx.fillText("F: " + this.failure.string,this.location.x+app.game.GUI.PADDING,this.location.y+app.game.GUI.PADDING+app.game.GUI.BASE_FONT_SIZE*5.6);
            }
            
            //draw stroke
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.strokeRect(this.location.x,this.location.y,app.calendar.CALENDAR_CONST.WIDTH,this.length*app.calendar.CALENDAR_CONST.HEIGHT);
            
            ctx.restore();
        }
        
        this.getRectangle = function(){
            return {
                x: this.location.x,
                y: this.location.y,
                width: app.calendar.CALENDAR_CONST.WIDTH,
                height: (app.calendar.CALENDAR_CONST.HEIGHT * this.length)
            };
        }
    },
    
    setup: function(){
        this.ICONS.WORK = document.querySelector("#workIcon");
        this.ICONS.LIFE = document.querySelector("#lifeIcon");
        this.ICONS.MISC = document.querySelector("#miscIcon");
        
        Object.freeze(this.ICONS);
    }
};