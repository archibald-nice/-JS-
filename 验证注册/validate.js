const USERNAME_MIN = 3;
const USERNAME_MAX = 20;
const PASSWORD_MIN = 6;
const PASSWORD_MAX = 15;


const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const pwd = document.getElementById('pwd');
const pwd2 = document.getElementById('pwd2');


/* 展示错误信息 Error message */
function showError(input, message) {
	const formControl = input.parentElement;
	formControl.className = 'form-control error';
	const small = formControl.querySelector('small');
	small.innerText = message;
}
/* 展示成功大纲 */
function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

/* 确认邮箱格式正确 */
function checkEmail(input) {
	const re = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; // 邮箱正则
	// if (input.value.trim().search(re) != -1) { // 常用验证邮箱方式1
	if (input.value.trim() !== '') {
		if (!re.test(input.value.trim())) { // 常用验证邮箱方式2
			showError(input, '邮箱格式错误');
		} else {
			showSuccess(input);
		}
	} else {
		showError(input, getFieldName(input) + '不可为空');
	}
}

// 检查内容长度
function checkNameAndPwd(input, min, max) {
	if (input.value.trim() !== '') {
		if (input.value.length < min) {
			showError(
				input,
				getFieldName(input) + '最少 ' + min + '个字符'
			);
		} else if (input.value.length > max) {
			showError(
				input,
				getFieldName(input) + '最多 ' + max + '个字符'
			);
		} else {
			showSuccess(input);
		}
	} else {
		showError(input, getFieldName(input) + '不可为空');
	}

}

// 检查两次密码均正确
function checkPasswordsMatch(input) {
	if (input.value.trim() !== '') {
		if (pwd.value !== input.value) {
			showError(input, '密码不匹配');
		}
	} else {
		showError(input, getFieldName(input) + '不可为空');
	}

}

// 获取区域名称
function getFieldName(input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkSubmit(inputArray) {
	// 跳出forEach循环需要使用 try-catch 抛异常
	// return不能终止forEach，但可以终止jQuery中的each循环
	try {
		inputArray.forEach(function(input) {
			if (input.parentElement.className.split(" ").indexOf('error')) { // 有信息错误
				alert("请重新确认信息!");
				throw new Error("ERROR"); 
				// return false;   
			} else {
				alert("注册成功!");
				// return true;
			}
		});
	} catch(e) {
		if (e.message == 'ERROR') throw e;
	}
}
