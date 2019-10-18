/*
 * @Author: Siwen
 * @Date: 2019-10-17 11: 06: 37
 * @LastEditors: Siwen
 * @LastEditTime: 2019-10-17 11:09:31
 * @Description: 世界国家区号代码
 */
const areanoList = {
  'China': '86',
  'Albania': '355',
  'Algeria': '213',
  'Afghanistan': '93',
  'Argentina': '54',
  'United Arab Emirates, Arabia': '971',
  'Aruba': '297',
  'Oman': '968',
  'Azerbaijan': '994',
  'Ascension': '247',
  'Egypt': '20',
  'Ethiopia': '251',
  'Ireland': '353',
  'Estonia': '372',
  'Andorra': '376',
  'Angola': '1264',
  'Anguilla': '244',
  'The island of Antigua and barbuda': '1268',
  'Australia': '61',
  'Austria': '43',
  'The Oran islands': '',
  'Barbados': '1246',
  'Papua New Guinea': '675',
  'Bahamas': '1809',
  'Pakistan': '92',
  'Paraguay': '595',
  'Palestine': '930',
  'Bahrain': '973',
  'Panama': '507',
  'Brazil': '55',
  'Belarus': '375',
  'Bermuda': '1441',
  'Bulgaria': '359',
  'The Northern Mariana islands': '1670',
  'Benin': '229',
  'Belgium': '32',
  'Iceland': '354',
  'Puerto Rico': '1787',
  'Poland': '48',
  'Bolivia': '591',
  'Bosnia and herzegovina': '387',
  'Botswana': '267',
  'Belize': '501',
  'Bhutan': '975',
  'Burkina Faso': '226',
  'Burundi': '257',
  'Bouvet island': '',
  'North Korea': '850',
  'Denmark': '45',
  'Germany': '49',
  'East Timor': '670',
  'Togo': '228',
  'Dominica': '1890',
  'The Republic of Dominica': '1809',
  'Russia': '7',
  'Ecuador': '593',
  'Eritrea': '291',
  'France': '33',
  'Faroe Islands': '298',
  'French polynesia': '689',
  'French guiana': '240',
  'The French Southern territories': '33',
  'The Vatican': '379',
  'Philippines': '63',
  'Fiji': '679',
  'Finland': '358',
  'Cape Verde': '238',
  'The Frank islands': '49',
  'Gambia': '220',
  'Congo': '242',
  'The Democratic Republic of Congo': '242',
  'Columbia': '001',
  'Costa Rica': '506',
  'Guernsey': '502',
  'Grenada': '1809',
  'Greenland': '45',
  'Cuba': '53',
  'Guadeloupe': '53',
  'Guam': '1671',
  'Guyana': '592',
  'Kazakhstan': '007',
  'Haiti': '509',
  'Korea': '82',
  'Holland': '31',
  'The Netherlands antilles': '599',
  'Hird and the Macdonald islands': '',
  'Honduras': '504',
  'Kiribati': '686',
  'Djibouti': '253',
  'Kyrgyzstan': '331',
  'Guinea': '224',
  'Guinea Bissau': '245',
  'Canada': '001',
  'Garner': '',
  'Gabon': '241',
  'Kampuchea': '855',
  'Czech Republic': '420',
  'Zimbabwe': '263',
  'Cameroon': '237',
  'Qatar': '974',
  'The Cayman Islands': '1345',
  'The Cocos islands': '61',
  'Comoros': '269',
  'Cote d'Ivoire': '225',
  'Kuwait': '965',
  'Croatia': '385',
  'Kenya': '254',
  'The Cook islands': '682',
  'Latvia': '371',
  'Lesotho': '266',
  'Laos': '856',
  'Lebanon': '961',
  'Liberia': '231',
  'Libya': '218',
  'Lithuania': '370',
  'Liechtenstein': '423',
  'Reunion': '262',
  'Luxemburg': '352',
  'Rwanda': '250',
  'Romania': '40',
  'Madagascar': '261',
  'Maldives': '960',
  'Malta': '356',
  'Malawi': '265',
  'Malaysia': '60',
  'Mali': '223',
  'Macedonian': '',
  'The Marshall islands': '692',
  'Martinique': '596',
  'Mayotte': '262',
  'Man island': '',
  'Mauritius': '230',
  'Mauritania': '222',
  'The United States': '001',
  'American Samoa': '685',
  'The islands': '',
  'Mongolia': '976',
  'Montserrat': '1664',
  'Bangladesh': '880',
  'Micronesia': '691',
  'Peru': '51',
  'Burma': '95',
  'Moldova': '373',
  'Morocco': '212',
  'Monaco': '377',
  'Mozambique': '258',
  'Mexico': '52',
  'Namibia': '264',
  'South Africa': '27',
  'Antarctica': '672',
  'South Georgia and the South Sandwich Islands': '',
  'Nauru': '674',
  'Nepal': '977',
  'Nicaragua': '505',
  'Niger': '227',
  'Nigeria': '234',
  'Niue': '683',
  'Norway': '47',
  'Norfolk': '6723',
  'Palau islands': '680',
  'Pitt Kaine': '',
  'Portuguese': '80',
  'Georgia': '995',
  'Japan': '81',
  'Sweden': '46',
  'Switzerland': '41',
  'Salvatore': '',
  'Samoa': '684',
  'Serbia, Montenegro': '381',
  'Sierra Leone': '232',
  'Senegal': '221',
  'Cyprus': '357',
  'Seychelles': '248',
  'Saudi Arabia': '966',
  'Christmas Island': '618',
  'Sao Tome and principe': '239',
  'St. helena': '290',
  'Saint Kitts and nevis': '1784',
  'Lucia': '1758',
  'San marino': '378',
  'San Pierre and the micone islands': '',
  'Saint Vincent and the grenadines': '1784',
  'Sri Lanka': '94',
  'Slovakia': '421',
  'Slovenia': '386',
  'J Val Ba and Martin': '',
  'Swaziland': '268',
  'Sultan': '',
  'Suriname': '597',
  'The Solomon islands': '677',
  'Somalia': '252',
  'Tajikistan': '992',
  'Thailand': '66',
  'Tanzania': '255',
  'Tonga': '676',
  'The Turks and Kaiketesi islands': '1649',
  'Tristan Da khuon ha': '992',
  'Trinidad and Tobago': '1868',
  'Tunisia': '216',
  'Tuvalu': '688',
  'Turkey': '90',
  'Turkmenistan': '992',
  'Tokelau': '690',
  'Wallis and futuna': '681',
  'Vanuatu': '678',
  'Guatemala': '502',
  'The Virgin Islands, American': '1340',
  'The Virgin Islands, the British': '1284',
  'Venezuela': '58',
  'Brunei': '673',
  'Uganda': '256',
  'Ukraine': '380',
  'Uruguay': '598',
  'Uzbekistan': '233',
  'Spain': '34',
  'Greece': '30',
  'Singapore': '65',
  'New Caledonia': '687',
  'New Zealand': '64',
  'Hungary': '36',
  'Syria': '963',
  'Jamaica': '1876',
  'Armenia': '374',
  'Yemen': '967',
  'Iraq': '964',
  'Iran': '98',
  'Israel': '972',
  'Italy': '39',
  'India': '91',
  'Indonesia': '62',
  'Britain': '44',
  'The British territory of the India ocean': '',
  'Jordan': '962',
  'Vietnam': '84',
  'Zambia': '260',
  'Jersey': '',
  'Chad': '235',
  'Gibraltar': '350',
  'Chile': '56',
  'The Central African Republic': '236'
}
