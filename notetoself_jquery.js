//使用json格式記錄顏色內容


$(function(){
    $("#add_button").click(createSticky);
    $("#clear_button").click(clearStickyNotes);
    for (var key in localStorage) { //類似for each key
        if (key != "stickiesArray") {
            var stickyObj = JSON.parse(localStorage[key]);
            addStickyToDOM(key, stickyObj);
        }
    }
})

function getStickiesArray() {
    if (localStorage.getItem("stickiesArray") != null) {
        var stickiesArray = JSON.parse(localStorage.getItem("stickiesArray"));
    } else {
        var stickiesArray = new Array;
    }
    return stickiesArray;
}

function createSticky() {
    var value = $("#note_text").val();
    var color = $("#note_color option:selected").val()
    var currentDate = new Date();
    var key = "sticky_" + currentDate.getTime();
    var sticky = { //物件：json格式
        "value": value,
        "color": color
    };
    localStorage.setItem(key, JSON.stringify(sticky)) //sticky是物件，以JSON轉成字串
    var stickiesArray = getStickiesArray();
    stickiesArray.push(key); //stickyarray 放入
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    addStickyToDOM(key, sticky);
}

function deleteSticky(e) {
    var nowDelete = event.target.id;
    removeStickyFromDOM(nowDelete);
    localStorage.removeItem(nowDelete);
    var stickiesArray = JSON.parse(localStorage.getItem("stickiesArray"));
    stickiesArray.splice(stickiesArray.indexOf(nowDelete), 1);
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
}

function addStickyToDOM(key, stickyObj) {
    $("#stickies").prepend($("<li></li>").attr("id",key).css("backgroundColor",stickyObj.color).click(deleteSticky));
    $("#"+key).prepend("<span></span>").addClass("note").html(stickyObj.value);
}

function removeStickyFromDOM(key) {
    $("#"+key).remove();
}

function clearStickyNotes() {
    var stickiesArray = JSON.parse(localStorage.getItem("stickiesArray"));
    for (var key in stickiesArray) {
        localStorage.removeItem(stickiesArray[key]);
        removeStickyFromDOM(stickiesArray[key]);
    }
    localStorage.removeItem("stickiesArray");
}
