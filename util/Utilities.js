export const sizeCampoFutebol = 7140;
export const revalidateTime = 60;

export const numberWithDots = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const numberToMetroQuadrado = (x) => {
    return numberWithDots(x) + " m²"
}

export const numberWithPercentual = (x) => {
    return numberWithVirgula(parseFloat(x)) + " %"
}

export const numberToMoney = (x) => {
    return "R$ " + numberWithVirgula(x)
}

export const IntegerNumberBrazilian = (x) => {
    return parseInt(x).toLocaleString("pt-BR")
}

export const IntegerAreaBrazilian = (x) => {
    return parseInt(x).toLocaleString("pt-BR") + " m²"
}

export const decimalNumberBrazilian = (x) => {
    return parseFloat(parseFloat(x).toFixed(2)).toFixed(2).toLocaleString('pt-BR')
}

export const percentNumberBrazilian = (x, decimal=2) => {
    return parseFloat(parseFloat(x).toFixed(decimal)).toLocaleString('pt-BR') + "%"
}

export const numberBrazilianMoney = (x) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(x)
}

export const numberWithVirgula = (x) => {
    return parseFloat(x).toFixed(2).toString().replace('.',',')
}

export const revertData = (data) => {
    return data.substr(8,2)+'/'+data.substr(5,2)+'/'+data.substr(0,4)
}

export const revertCompleteData = (data) => {
    return revertData(data) + " " + data.split('T')[1].substr(0,5)
}

export const getLinkMapFromEndereco = (endereco) => {
    return ('https://www.google.com.br/maps/search/'+endereco+" Brasil")
        .replace(' ','+')
        .replace('Nº','')
        .replace('nº','')
        .replace('”','')
        .replace('“','')
}

export const equivalenciaCamposFutebol = (tamanho) => {
    const size = (tamanho/sizeCampoFutebol).toFixed(2);
    const plural = size >= 2 ? 'campos' : 'campo';
    return `Equivalente a ${numberWithVirgula(size)} ${plural} de futebol.`
}

export const valueToRes = (value) => {
    if(value > 1e12)
        return numberWithVirgula(value/1e12) + " Tri";
    else if(value > 1e9)
        return numberWithVirgula(value/1e9) + " Bi";
    else if(value > 1e6)
    return numberWithVirgula(value/1e6) + " Mi";
    else if(value > 1e3)
    return numberWithVirgula(value/1e3) + " mil";
    else
        return numberWithVirgula(value)
}

export const saudacaoHorario = () => {
 	const stamp = new Date();
     const hours = stamp.getHours();
     if (hours>=0 && hours<6) {
        return "Boa Madrugada";
    }
    
    if (hours>=6 && hours<12) {
        return "Bom Dia";
    }

    if (hours>=12 && hours<18) {
        return "Boa Tarde";
    }

 	if (hours>=18 && hours<24) {
 		return "Boa Noite";
 	}     
 	
	return 'Bom Dia'
}

export const IconHorario = () => {
 	const stamp = new Date();
     const hours = stamp.getHours();
     if (hours>=0 && hours<6) {
        return "moon";
    }
    
    if (hours>=6 && hours<12) {
        return "mug-hot";
    }

    if (hours>=12 && hours<18) {
        return "sun";
    }

 	if (hours>=18 && hours<24) {
 		return "moon";
 	}     
	return 'sun'
}

export const removerAcentos = ( myString ) => {
    let string = myString;
    const mapaAcentosHex 	= {
        a : /[\xE0-\xE6]/g,
        A : /[\xC0-\xC6]/g,
        e : /[\xE8-\xEB]/g,
        E : /[\xC8-\xCB]/g,
        i : /[\xEC-\xEF]/g,
        I : /[\xCC-\xCF]/g,
        o : /[\xF2-\xF6]/g,
        O : /[\xD2-\xD6]/g,
        u : /[\xF9-\xFC]/g,
        U : /[\xD9-\xDC]/g,
        c : /\xE7/g,
        C : /\xC7/g,
        n : /\xF1/g,
        N : /\xD1/g
    };

    for ( let letra in mapaAcentosHex ) {
        let expressaoRegular = mapaAcentosHex[letra];
        string = string.replace( expressaoRegular, letra );
    }

    return string;
}

export const barCharColors = [
    'rgba(114, 147, 203, 0.7)',
    'rgba(225, 151, 76, 0.7)',
    'rgba(132, 186, 91, 0.7)',
    'rgba(211, 94, 96, 0.7)',
    'rgba(128, 133, 133, 0.7)',
    'rgba(144, 103, 167, 0.7)',
    'rgba(171, 104, 87, 0.7)',
    'rgba(204, 194, 16, 0.7)',
    'rgba(33, 33, 33, 0.7)',
    'rgba(194, 24, 91, 0.7)',
    'rgba(24, 255, 255, 0.7)',
    'rgba(118, 255, 3, 0.7)',
    'rgba(192, 202, 51, 0.7)',
    'rgba(249, 168, 37, 0.7)',
    'rgba(255, 215, 64, 0.7)',
    'rgba(216, 67, 21, 0.7)',
    'rgba(78, 52, 46, 0.7)',
    'rgba(97, 97, 97, 0.7)',

]
export const barCharColorsHover = [
    'rgba(114, 147, 203, 1)',
    'rgba(225, 151, 76, 1)',
    'rgba(132, 186, 91, 1)',
    'rgba(211, 94, 96, 1)',
    'rgba(128, 133, 133, 1)',
    'rgba(144, 103, 167, 1)',
    'rgba(171, 104, 87, 1)',
    'rgba(204, 194, 16, 1)',
    'rgba(33, 33, 33, 1)',
    'rgba(194, 24, 91, 1)',
    'rgba(24, 255, 255, 1)',
    'rgba(118, 255, 3, 1)',
    'rgba(192, 202, 51, 1)',
    'rgba(249, 168, 37, 1)',
    'rgba(255, 215, 64, 1)',
    'rgba(216, 67, 21, 1)',
    'rgba(78, 52, 46, 1)',
    'rgba(97, 97, 97, 1)',
]
export const lineCharColors = [
    'rgba(57, 106, 177, 0.7)',
    'rgba(218, 124, 48, 0.7)',
    'rgba(62, 150, 81, 0.7)',
    'rgba(204, 37, 41, 0.7)',
    'rgba(83, 81, 84, 0.7)',
    'rgba(107, 76, 154, 0.7)',
    'rgba(146, 36, 40, 0.7)',
    'rgba(148, 139, 61, 0.7)',
    'rgba(33, 33, 33, 0.7)',
    'rgba(194, 24, 91, 0.7)',
    'rgba(24, 255, 255, 0.7)',
    'rgba(118, 255, 3, 0.7)',
    'rgba(192, 202, 51, 0.7)',
    'rgba(249, 168, 37, 0.7)',
    'rgba(255, 215, 64, 0.7)',
    'rgba(216, 67, 21, 0.7)',
    'rgba(78, 52, 46, 0.7)',
    'rgba(97, 97, 97, 0.7)',
]
export const lineCharHover = [
    'rgba(57, 106, 177, 1)',
    'rgba(218, 124, 48, 1)',
    'rgba(62, 150, 81, 1)',
    'rgba(204, 37, 41, 1)',
    'rgba(83, 81, 84, 1)',
    'rgba(107, 76, 154, 1)',
    'rgba(146, 36, 40, 1)',
    'rgba(148, 139, 61, 1)',
    'rgba(33, 33, 33, 1)',
    'rgba(194, 24, 91, 1)',
    'rgba(24, 255, 255, 1)',
    'rgba(118, 255, 3, 1)',
    'rgba(192, 202, 51, 1)',
    'rgba(249, 168, 37, 1)',
    'rgba(255, 215, 64, 1)',
    'rgba(216, 67, 21, 1)',
    'rgba(78, 52, 46, 1)',
    'rgba(97, 97, 97, 1)',
]