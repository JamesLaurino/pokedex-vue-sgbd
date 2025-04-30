function CheckTypesHelper(pokemon,type) {
    console.log(pokemon.types.includes(type))
    return pokemon.types.includes(type);
}

export default CheckTypesHelper;