export const validSimpleInput = (data) =>{
    if (data) return undefined
   return `Field is required`;
} 

export const maxSimbol = (max) => (data) =>{
   if(data.length > max){
       return  `Max simbol is ${max}`
   }

    return undefined;
} 

export const minSimbol = (min) => (data) =>{
    if(data.length < min){
        return  `Min simbol is ${min}`
    }
 
     return undefined;
 } 

export const mailValid = (data) =>{
 
     return undefined;
 } 