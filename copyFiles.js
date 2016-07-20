var fse = require('fs-extra');
var recursive = require('recursive-readdir-synchronous');

var filepath1; //set filepath to check and copy from here
var filepath2; //set filepath to paste files to here
var files = recursive(filepath1, ['*.db']);
var j = 0;

for (var i = 0; i < files.length; i++) {
	var str = files[i].toString();
	var stats = fse.statSync(str);
	var modifiedTime = stats["mtime"];
	var file = str.split('\\')
	file = file[4].toString();

	if (modifiedTime > new Date(2016, 5, 7)) {

		fse.copy(str, filepath2 + file, function(err){
			if (err) return console.error(err);
		});

		j++;
	}

}
console.log(j + ' records were copied to ' + filepath2);