let title = "";
let formatted_title = "";
exports.route_formatting = function (the_title){
    title = the_title;
    //formatando a entrada
    title = title.toLowerCase();
    title = title.split(" ");
    title.forEach( (word)=>{
      formatted_title += word + "-";
    });
    return formatted_title.slice(0,title.length-1);
};