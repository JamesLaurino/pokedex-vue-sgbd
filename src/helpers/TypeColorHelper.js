const TypeColorHelper = (typeInput) => {
    let typeOutput = '';
    switch(typeInput) {
        case "Feu":
            typeOutput = '#f32f08';
            break;
        case 'Eau':
            typeOutput = '#229dc5';
            break;
        case 'Plante':
            typeOutput = '#3a8355';
            break;
        case 'Poison':
            typeOutput = '#7622c5';
            break;
            break;
        case 'Insecte':
            typeOutput = '#22c533';
            break;
        case 'Normal':
            typeOutput = '#7b847c';
            break;
        case 'Vol':
            typeOutput = '#8583b5';
            break;
        case 'Electrik':
            typeOutput = '#f1ef06';
            break;
        case 'Fée':
            typeOutput = '#c033ad';
            break;
        default:
            break;
    }

    return typeOutput;

}

export default TypeColorHelper;