import alfy from 'alfy'

const string = alfy.input ?? ""
if (!string) {
	alfy.error('请输入接口信息');
}

let projects = ['/mpc', '/davis', '/tower']
let items = projects.map((project) => {
	return {
		title: project,
		subtitle: project,
		text: {
		    copy: getAPICode(project),
		    largetype: project
		},
		arg: getAPICode(project)
	}
})

alfy.output(items)

function getAPICode(projectPath = '/mpc') {
	let queryArray = string.split('\n')
	let [type, url, desc] = queryArray
	let urlName =  [...url.split('/')].slice(-1)[0]

	let postType = `
	// ${type} ${url} ${desc}
	${urlName}: (data) => {
		return request({
			url: \`${projectPath}${url}?data=\${data}\`,
			method: 'post',
			data: data
		})
	},
	`
	let getType = `
	// ${type} ${url} ${desc}
	${urlName}: (data) => {
		return request({
			url: \`${projectPath}${url}?data=\${data}\`,
			method: 'get'
		})
	},
	`

	let delType = `
	// ${type} ${url} ${desc}
	${urlName}: (data) => {
		return request({
			url: \`${projectPath}${url}?data=\${data}\`,
			method: 'delete'
		})
	},
	`

	let res = type.toLocaleUpperCase() == 'POST' ? postType :
	type.toLocaleUpperCase() == 'GET' ? getType :
	type.toLocaleUpperCase() == 'DELETE' ? delType : ''
	return res
}
