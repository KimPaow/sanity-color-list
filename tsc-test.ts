export const makeAnOffer = (amount: number, name: string):string =>{
    if (amount <= 40){
        return `Is this a joke ${name}!`
    } else if (amount < 100){
        return `That is not quite what I want ${name}!`
    } else if (amount === 100){
        return `That was exactly what I was looking for ${name}!`
    }else{
        return `I will take it ${name}!`
    }
  }
