var fileList = new Array;
var i = 0;
var generateRandomStringValue = randomString(10);
// Dropzone.autoDiscover = false;
$(function() {
    Dropzone.options.imageUpload = {
        acceptedFiles: ".jpeg,.jpg,.png,.gif,.pdf",
        addRemoveLinks: 'Yes',
        parallelUploads: 5,
        dictDefaultMessage: "ลากแลพวางไฟล์ที่นี้ (ไฟล์ไม่เกิน 10MB เฉพาะไฟล์ JPG PNG PDF XLSX).",
        init: function() {
            this.on("sending", function(file, xhr, data) {
                // if file is actually a folder
                data.append("genName", generateRandomStringValue);
                data.append("type", type);
                // console.log(data);
                // if(file.fullPath){
                //     data.append("fullPath", file.fullPath);
                // }
            });
            this.on('success', function(file, serverFileName) {
                // generateRandomStringValue = uniqueNumber();
                // console.log(formData.append('id',generateRandomStringValue));
                // fileList[i] = { "serverFileName": serverFileName, "fileName": file.name, "fileId": i };
                console.log(serverFileName);
                $('input[name="imageId"]').remove();
                var imageId = $('<input type="hidden" name="imageId" value=' + generateRandomStringValue + '>');
                imageId.appendTo('form');
                // console.log(fileList,generateRandomStringValue);
                // i++;
                // this.on('removedFile', function(file) {
                //     var rmvFile = "";
                //     for (f = 0; f < fileList.length; f++) {
                //         if (fileList[f].fileName == file.name) {
                //             rmvFile = fileList[f].serverFileName;
                //         }
                //     }
                // });
            });
        }
    };
});

function uniqueNumber() {
    var date = Date.now();

    // If created at same millisecond as previous
    if (date <= uniqueNumber.previous) {
        date = ++uniqueNumber.previous;
    } else {
        uniqueNumber.previous = date;
    }

    return date;
}

function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (!length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}
uniqueNumber.previous = 0;