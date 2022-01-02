$('.list-group-item').on('click', function() {
    const $this = $(this);
    $('.active').removeClass('active');
    $this.toggleClass('active');
});

window.addEventListener("keyup", function(event) {
    if (event.defaultPrevented) {
        return;
    }

    const keyMapDict = {
        'a': "edit-add",
        'A': "edit-add",
        'd': "edit-delete",
        'D': "edit-delete",
        'm': "edit-move",
        'M': "edit-move",
        'n': "edit-none",
        'N': "edit-none",
    }

    if (event.key in keyMapDict) {
        const id = '#' + keyMapDict[event.key];
        $(id).click();
    }
}, true);