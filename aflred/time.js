
// Date.prototype.format = function (format) {
//     //eg:format="yyyy-MM-dd hh:mm:ss";

//     if (!format) {
//         format = "yyyy-MM-dd hh:mm:ss";
//     }

//     var o = {
//         "M+": this.getMonth() + 1,  // month
//         "d+": this.getDate(),       // day
//         "H+": this.getHours(),      // hour
//         "h+": this.getHours(),      // hour
//         "m+": this.getMinutes(),    // minute
//         "s+": this.getSeconds(),    // second
//         "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
//         "S": this.getMilliseconds()
//     };

//     if (/(y+)/.test(format)) {
//         format = format.replace(RegExp.$1, (this.getFullYear() + "")
//             .substr(4 - RegExp.$1.length));
//     }

//     for (var k in o) {
//         if (new RegExp("(" + k + ")").test(format)) {
//             format = format.replace(RegExp.$1, RegExp.$1.length == 1
//                 ? o[k]
//                 : ("00" + o[k]).substr(("" + o[k]).length));
//         }
//     }

//     return format;
// }

// import alfy from 'alfy'
// const string = alfy.input ?? ""

// let timeString = ''
// if (string === 'now') {
// 	timeString = new Date().format("yyyy-MM-dd_HH_mmss")
// } else {
// 	timeString = new Date(string).format("yyyy-MM-dd_HH_mmss")
// }

// let items = [''].map(() => {
// 	return {
// 		title: string,
// 		subtitle: timeString,
// 		text: {
// 		    copy: timeString,
// 		    largetype: timeString
// 		},
// 		arg: timeString
// 	}
// })

// alfy.output(items)
