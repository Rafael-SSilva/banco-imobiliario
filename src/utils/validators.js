export function maxNumValue(value){
    let typedValue = value;
    let maxLength = 5;
    let valid = ((typedValue && typedValue.toString().length <= maxLength) || typedValue.toString() === '') 
                && typedValue >= 0;
    return valid
}