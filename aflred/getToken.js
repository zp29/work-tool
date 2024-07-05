import alfy from 'alfy'
import Fuse from 'fuse.js'

const string = alfy.input ?? ""
let queryArray = string.split(' ') ?? []
const number =

	queryArray[0] == '10' ? "18862085999" : // 蒋煊	 Sell
	queryArray[0] == '11' ? "15878701471" : // 施白云	 Sell
	queryArray[0] == '12' ? "17721208822" : // 高帅奇	 Reg
	queryArray[0] == '13' ? "13901894567" : // 张孜谦 Bud

	queryArray[0] == '20' ? "18059059882" : // 陈银花	 Sell
	queryArray[0] == '21' ? "19946204986" : // 𡈼超凯	 Sell
	queryArray[0] == '22' ? "15960007091" : // 梁瑷	 Reg
	queryArray[0] == '23' ? "15821998898" : // 徐磊 Bud

	queryArray[0] == '1' ? "13162055729" : // Grant 
	queryArray[0] == '2' ? "15000156535" : // T
	queryArray[0] == '3' ? "17717898298" : // K W

	queryArray[0] == '0' ? "18995731697" : queryArray[0]

var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
if (!myreg.test(number)) {
	alfy.error('手机号码格式不正确，请重新输入');
} else {
	const ENVArr = ['itg', 'uat', 'pro']
	let results = await Promise.all(ENVArr.map(async (ENV) => {
	    const ENVLinks = await GetToken(ENV);
	    return Object.keys(ENVLinks).map((LinkName) => {
	    	return {
	    		ENV: LinkName + ' ' + ENV,
	    		EnvValue: ENVLinks[LinkName]
	    	}
	    })
	}));

	const items = results.flat().map(({ENV, EnvValue}) => {
	    return {
		    title: ENV,
		    subtitle: EnvValue,
		    number: number,
		    text: {
		        copy: EnvValue,
		        largetype: number
		    },
		    arg: EnvValue
		}
	});

	const sthQeruy = queryArray.slice(1).join('and')
	if (!sthQeruy) {
		alfy.output(items)
	} else {
		ListSearch(sthQeruy, items)
	}
}

async function ListSearch(sthQeruy, items) {
	let options = {
	    // threshold: 0.6,
	    // location: 0,
	    // distance: 100,
	    // maxPatternLength: 30,
	    // minMatchCharLength: 1,
	    shouldSort: true,
     	includeScore: true,
		useExtendedSearch: true,
	    keys: [
	        {
	            name: 'title'
	        }
	    ]
	};

	let fuse = new Fuse(items, options);
	const ListSearchRes = fuse.search(sthQeruy).map(i => i.item)

	alfy.output(ListSearchRes)
	return ListSearchRes
}
async function GetToken(ENV) {
	const has = alfy.cache.get(ENV+number)
	if (has) {
		return has
	}

	let pass = {
		// 'dev': `999999`,
		'itg': `180617`,
		'uat': `180617`,
		'pro': `968361`
	}[ENV]
	const fetchRUL = {
		'dev': "https://bbraun.movitech.cn:10100/",
		'uat': "https://tower-qas.bbraunchina.cn/",
		'itg': "https://tower-itg.bbraunchina.cn/",
		'pro': "https://www.bbrauntower.com/"
	}[ENV]
	let verifyUrl = `auth/mobile/token/sms?mobile=SMS@${number}&code=${pass}&grant_type=mobile`
	let referrerURL = `${fetchRUL}/bbraun-tower/index.html`

	const body = `code=${pass}&mobile=${number}&vipUser=`
	const TokenUrl = fetchRUL + verifyUrl
	
	const CACHE_MAX_AGE = 1000 * 5;
	try {
		const res = await alfy.fetch(TokenUrl, {
			method: 'POST',
			headers: {
			    "Accept": "application/json, text/plain, */*",
				'Content-Type': 'application/json',
    			"Authorization": "Basic d2ViOndlYg=="
			},
			body: ""
		})

		const access_token = res.data.access_token

		const MPCUrl = fetchRUL + "bbraun-mpc/index.html#/AuditList?token=" + access_token + '&' +number
		const TowerUrl = fetchRUL + "bbraun-tower/index.html#/home/index?token=" + access_token + '&' +number
		const DavisUrl = fetchRUL + "bbraun-davis/index.html#/teamList?token=" + access_token + '&' +number
		const DealerUrl = fetchRUL + "bbraun-dealer/index.html#/home/index?token=" + access_token + '&' +number

		if (access_token) {
			const reList = {
				"MPC": MPCUrl,
				"Tower": TowerUrl,
				"Davis": DavisUrl,
				"Dealer": DealerUrl
			}
			alfy.cache.set(ENV+number, reList, {maxAge: 1000 * 10});
			return reList
		} else {
			return {}
		}
	}catch (error) {
		if (error) {
			// console.log('GetToken console error', TokenUrl, error)
			alfy.log('GetToken error', error)
		}
		return {}
	}
}