var componentPanel = (function () {

    function createPanel(index, name, content) { //htmlContent
    //function createPanel(data) {
        var data = {index: index, name: name, content: content}

        var templateData = document.getElementById("componentPanelTemplate").innerHTML;

        var template = Handlebars.compile(templateData);

        var templateRender = template( data );


        //console.log(templateRender);
        //document.getElementById("productPanel").innerHTML= templateRender; before
        //this.innerHTML= templateRender;

        //console.log($(index));
        $(index).before(templateRender);
        //this.insertBefore(templateRender, this);
    }

    function deletePanel(index) {
        var child = index.parentNode.parentNode;
        child.parentNode.removeChild(child);
    }
    function minimize() {
        //console.log(this.nextSibling);
        this.nextElementSibling.classList.toggle('hide');
    }

//function() {this.nextSibling.classList.toggle('hide')}.bind(this)

    return {
        createPanel : createPanel,
        deletePanel : deletePanel,
        minimize    : minimize
    }

})();