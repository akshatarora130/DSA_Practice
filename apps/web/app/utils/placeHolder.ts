export const placeHolder = (type: string) => {
    if(type == 'Integer'){
        return "Integer          1"
    }
    if(type == 'Integer Array'){
        return "Integer Array             [1, 2, 3, 4, 5]      With brackets seprated by commas"
    }
    return ""
}

